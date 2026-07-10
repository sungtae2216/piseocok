export const ROUTES = {
  HOME: '/',
  MAP: '/map',
  FAVORITES: '/favorites',
  MY_PAGE: '/my',
  SPOT_DETAIL: '/spot/:id',
  SPOTS: '/spots',
  RANKING: '/ranking',
  QUIET_BEACHES: '/quiet-beaches',
  QUIET_VALLEYS: '/quiet-valleys',
  NEAR_SEOUL: '/near-seoul',
  FAMILY: '/family',
  PARKING_EASY: '/parking-easy',
  REGION_BUSAN: '/regions/busan',
  REGION_GANGWON: '/regions/gangwon',
  REGION_JEJU: '/regions/jeju',
  GUIDE_BEST_TIME: '/guide/best-time',
  GUIDE_CROWDING: '/guide/crowding',
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
