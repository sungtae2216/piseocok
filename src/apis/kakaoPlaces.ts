import type { Coordinates } from '@/types/spot'
import type { AmenityCategory } from '@/constants/nearbyAmenities'

export interface NearbyPlace {
  id: string
  name: string
  distanceMeters: number
  coordinates: Coordinates
}

function toNearbyPlace(
  item: kakao.maps.services.PlacesSearchResultItem,
): NearbyPlace {
  return {
    id: item.id,
    name: item.place_name,
    distanceMeters: Number(item.distance) || 0,
    coordinates: { lat: Number(item.y), lng: Number(item.x) },
  }
}

function searchByCategory(
  categoryCode: 'CS2' | 'PK6',
  center: Coordinates,
  radiusMeters: number,
): Promise<NearbyPlace[]> {
  return new Promise((resolve) => {
    const places = new kakao.maps.services.Places()
    places.categorySearch(
      categoryCode,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK) {
          resolve([])
          return
        }
        resolve(result.map(toNearbyPlace))
      },
      {
        location: new kakao.maps.LatLng(center.lat, center.lng),
        radius: radiusMeters,
        sort: kakao.maps.services.SortBy.DISTANCE,
      },
    )
  })
}

function searchByKeyword(
  keyword: string,
  center: Coordinates,
  radiusMeters: number,
): Promise<NearbyPlace[]> {
  return new Promise((resolve) => {
    const places = new kakao.maps.services.Places()
    places.keywordSearch(
      keyword,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK) {
          resolve([])
          return
        }
        resolve(result.map(toNearbyPlace))
      },
      {
        location: new kakao.maps.LatLng(center.lat, center.lng),
        radius: radiusMeters,
        sort: kakao.maps.services.SortBy.DISTANCE,
      },
    )
  })
}

export async function fetchNearbyAmenities(
  center: Coordinates,
  radiusMeters: number,
): Promise<Record<AmenityCategory, NearbyPlace[]>> {
  const [convenience, parking, restroom] = await Promise.all([
    searchByCategory('CS2', center, radiusMeters),
    searchByCategory('PK6', center, radiusMeters),
    searchByKeyword('공중화장실', center, radiusMeters),
  ])

  return { convenience, parking, restroom }
}
