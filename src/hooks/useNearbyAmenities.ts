import { useQuery } from '@tanstack/react-query'
import type { Coordinates } from '@/types/spot'
import { fetchNearbyAmenities } from '@/apis/kakaoPlaces'

export function useNearbyAmenities(
  coordinates: Coordinates,
  radiusMeters: number,
  enabled: boolean,
) {
  return useQuery({
    queryKey: [
      'nearby-amenities',
      coordinates.lat,
      coordinates.lng,
      radiusMeters,
    ],
    queryFn: () => fetchNearbyAmenities(coordinates, radiusMeters),
    enabled,
    staleTime: 10 * 60 * 1000,
  })
}
