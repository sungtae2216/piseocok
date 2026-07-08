import type { SpotFilter } from '@/apis/spot'

export const QUERY_KEYS = {
  spots: {
    all: ['spots'] as const,
    popular: () => [...QUERY_KEYS.spots.all, 'popular'] as const,
    list: (filter: SpotFilter) =>
      [...QUERY_KEYS.spots.all, 'list', filter] as const,
    search: (keyword: string) =>
      [...QUERY_KEYS.spots.all, 'search', keyword] as const,
    favorites: (ids: string[]) =>
      [...QUERY_KEYS.spots.all, 'favorites', ids] as const,
    detail: (id: string) => [...QUERY_KEYS.spots.all, 'detail', id] as const,
  },
} as const
