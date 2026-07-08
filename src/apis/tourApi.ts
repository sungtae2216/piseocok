import type { RegionCode, Spot, SpotType } from '@/types/spot'
import {
  AREA_CODE_TO_REGION,
  CAT3_TO_SPOT_TYPE,
  TOUR_API_BASE_URL,
  TOUR_API_KEY,
} from '@/constants/tourApi'

interface TourApiRawItem {
  contentid: string
  title: string
  addr1?: string
  mapx?: string
  mapy?: string
  firstimage?: string
  areacode?: string
}

interface TourApiResponse {
  response?: {
    body?: {
      items?: {
        item?: TourApiRawItem | TourApiRawItem[]
      }
    }
  }
}

const FALLBACK_IMAGE_SEED = 'https://picsum.photos/seed'

function toSpot(item: TourApiRawItem, type: SpotType): Spot | null {
  const lat = Number(item.mapy)
  const lng = Number(item.mapx)
  if (!item.title || Number.isNaN(lat) || Number.isNaN(lng)) return null

  const regionCode =
    (AREA_CODE_TO_REGION[item.areacode ?? ''] as RegionCode | undefined) ??
    'gyeongsang'
  const addrParts = item.addr1?.split(' ') ?? []
  const regionLabel =
    (addrParts[1] ?? '').replace(/(시|군|구)$/, '') || (addrParts[0] ?? '')

  return {
    id: `tour-${item.contentid}`,
    name: item.title,
    type,
    regionCode,
    regionLabel,
    address: item.addr1 ?? '',
    description: '',
    amenities: [],
    coordinates: { lat, lng },
    basePopularity: 'medium',
    rating: 0,
    reviewCount: 0,
    temperature: 0,
    tags: [],
    imageUrl:
      item.firstimage || `${FALLBACK_IMAGE_SEED}/${item.contentid}/400/300`,
  }
}

async function fetchByCat3(cat3: string, type: SpotType): Promise<Spot[]> {
  const url = new URL(`${TOUR_API_BASE_URL}/areaBasedList2`)
  url.searchParams.set('serviceKey', TOUR_API_KEY)
  url.searchParams.set('MobileOS', 'ETC')
  url.searchParams.set('MobileApp', 'PiseoKok')
  url.searchParams.set('_type', 'json')
  url.searchParams.set('numOfRows', '400')
  url.searchParams.set('contentTypeId', '12')
  url.searchParams.set('cat1', 'A01')
  url.searchParams.set('cat3', cat3)

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`TourAPI request failed: ${response.status}`)
  }

  const json: TourApiResponse = await response.json()
  const rawItems = json.response?.body?.items?.item ?? []
  const items = Array.isArray(rawItems) ? rawItems : [rawItems]

  return items
    .map((item) => toSpot(item, type))
    .filter((spot): spot is Spot => spot !== null)
}

export async function fetchNationwideSpots(): Promise<Spot[]> {
  if (!TOUR_API_KEY) {
    throw new Error('VITE_TOUR_API_KEY가 설정되지 않았어요.')
  }

  const entries = Object.entries(CAT3_TO_SPOT_TYPE) as [string, SpotType][]
  const results = await Promise.all(
    entries.map(([cat3, type]) => fetchByCat3(cat3, type)),
  )

  return results.flat()
}
