import type { RegionCode, Spot, SpotType } from '@/types/spot'
import { MOCK_SPOTS } from '@/apis/mockSpots'
import { fetchNationwideSpots } from '@/apis/tourApi'
import { TOUR_API_KEY } from '@/constants/tourApi'

const MOCK_LATENCY_MS = 300

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(value), MOCK_LATENCY_MS),
  )
}

let cachedSpots: Spot[] | null = null

/**
 * TourAPI 키가 있으면 공공데이터로 전국 스팟을 불러와 손수 큐레이션한
 * mock 스팟과 합쳐요. 키가 없거나 호출이 실패하면 mock 데이터만 사용해요.
 */
async function getAllSpots(): Promise<Spot[]> {
  if (cachedSpots) return cachedSpots

  if (!TOUR_API_KEY) {
    cachedSpots = MOCK_SPOTS
    return cachedSpots
  }

  try {
    const nationwide = await fetchNationwideSpots()
    const curatedNames = new Set(MOCK_SPOTS.map((spot) => spot.name))
    const deduped = nationwide.filter((spot) => !curatedNames.has(spot.name))
    cachedSpots = [...MOCK_SPOTS, ...deduped]
    return cachedSpots
  } catch (error) {
    // 실패는 캐싱하지 않아요. 다음 호출(할당량 리셋 등) 때 다시 시도할 수 있도록 해요.
    console.warn('TourAPI 연동에 실패해 mock 데이터로 대체해요.', error)
    return MOCK_SPOTS
  }
}

export async function getPopularSpots(): Promise<Spot[]> {
  const spots = await getAllSpots()
  const sorted = [...spots].sort(
    (a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating,
  )
  return delay(sorted)
}

export interface SpotFilter {
  regionCode?: RegionCode | 'all'
  type?: SpotType | 'all'
}

export async function getSpots(filter: SpotFilter = {}): Promise<Spot[]> {
  const { regionCode = 'all', type = 'all' } = filter
  const spots = await getAllSpots()
  const filtered = spots.filter(
    (spot) =>
      (regionCode === 'all' || spot.regionCode === regionCode) &&
      (type === 'all' || spot.type === type),
  )
  return delay(filtered)
}

export async function searchSpots(keyword: string): Promise<Spot[]> {
  const trimmed = keyword.trim()
  if (!trimmed) return delay([])
  const spots = await getAllSpots()
  return delay(
    spots.filter(
      (spot) =>
        spot.name.includes(trimmed) ||
        spot.regionLabel.includes(trimmed) ||
        spot.tags.some((tag) => tag.includes(trimmed)),
    ),
  )
}

export async function getSpotsByIds(ids: string[]): Promise<Spot[]> {
  const idSet = new Set(ids)
  const spots = await getAllSpots()
  return delay(spots.filter((spot) => idSet.has(spot.id)))
}

export async function getSpotById(id: string): Promise<Spot | null> {
  const spots = await getAllSpots()
  return delay(spots.find((spot) => spot.id === id) ?? null)
}
