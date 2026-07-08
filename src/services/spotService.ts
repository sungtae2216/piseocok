import type { Spot } from '@/types/spot'
import * as spotApi from '@/apis/spot'
import type { SpotFilter } from '@/apis/spot'

export function fetchPopularSpots(): Promise<Spot[]> {
  return spotApi.getPopularSpots()
}

export function fetchSpots(filter: SpotFilter): Promise<Spot[]> {
  return spotApi.getSpots(filter)
}

export function searchSpotsByKeyword(keyword: string): Promise<Spot[]> {
  return spotApi.searchSpots(keyword)
}

export function fetchFavoriteSpots(ids: string[]): Promise<Spot[]> {
  if (ids.length === 0) return Promise.resolve([])
  return spotApi.getSpotsByIds(ids)
}

export function fetchSpotById(id: string): Promise<Spot | null> {
  return spotApi.getSpotById(id)
}
