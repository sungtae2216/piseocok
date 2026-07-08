export const ROUTES = {
  HOME: '/',
  MAP: '/map',
  FAVORITES: '/favorites',
  MY_PAGE: '/my',
  SPOT_DETAIL: '/spot/:id',
  SPOTS: '/spots',
  RANKING: '/ranking',
} as const

export function spotDetailPath(id: string) {
  return `/spot/${id}`
}

export function spotsPath(params: { region?: string; type?: string } = {}) {
  const searchParams = new URLSearchParams()
  if (params.region && params.region !== 'all')
    searchParams.set('region', params.region)
  if (params.type && params.type !== 'all')
    searchParams.set('type', params.type)
  const query = searchParams.toString()
  return query ? `${ROUTES.SPOTS}?${query}` : ROUTES.SPOTS
}
