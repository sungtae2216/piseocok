import { useQuery } from '@tanstack/react-query'
import type { SpotFilter } from '@/apis/spot'
import { QUERY_KEYS } from '@/constants/queryKeys'
import {
  fetchFavoriteSpots,
  fetchPopularSpots,
  fetchSpotById,
  fetchSpots,
  searchSpotsByKeyword,
} from '@/services/spotService'

export function usePopularSpots() {
  return useQuery({
    queryKey: QUERY_KEYS.spots.popular(),
    queryFn: fetchPopularSpots,
  })
}

export function useSpots(filter: SpotFilter) {
  return useQuery({
    queryKey: QUERY_KEYS.spots.list(filter),
    queryFn: () => fetchSpots(filter),
  })
}

export function useSearchSpots(keyword: string) {
  const trimmed = keyword.trim()
  return useQuery({
    queryKey: QUERY_KEYS.spots.search(trimmed),
    queryFn: () => searchSpotsByKeyword(trimmed),
    enabled: trimmed.length > 0,
  })
}

export function useFavoriteSpots(ids: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.spots.favorites(ids),
    queryFn: () => fetchFavoriteSpots(ids),
    enabled: ids.length > 0,
  })
}

export function useSpot(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.spots.detail(id),
    queryFn: () => fetchSpotById(id),
    enabled: id.length > 0,
  })
}
