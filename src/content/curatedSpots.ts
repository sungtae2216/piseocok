import type { Spot } from '@/types/spot'
import { MOCK_SPOTS } from '@/apis/mockSpots'
import { haversineDistanceKm } from '@/utils/geo'

const QUIET_LEVELS = ['low', 'medium'] as const

const SEOUL_CITY_HALL = { lat: 37.5665, lng: 126.978 }
const NEAR_SEOUL_RADIUS_KM = 100

function isQuiet(spot: Spot): boolean {
  return (QUIET_LEVELS as readonly string[]).includes(spot.basePopularity)
}

function sortByPopularityThenRating(a: Spot, b: Spot): number {
  const order = { low: 0, medium: 1, high: 2, severe: 3 }
  if (order[a.basePopularity] !== order[b.basePopularity]) {
    return order[a.basePopularity] - order[b.basePopularity]
  }
  return b.rating - a.rating
}

export function getQuietBeaches(limit = 12): Spot[] {
  return MOCK_SPOTS.filter((spot) => spot.type === 'beach' && isQuiet(spot))
    .sort(sortByPopularityThenRating)
    .slice(0, limit)
}

export function getQuietValleys(limit = 12): Spot[] {
  return MOCK_SPOTS.filter((spot) => spot.type === 'valley' && isQuiet(spot))
    .sort(sortByPopularityThenRating)
    .slice(0, limit)
}

export interface SpotWithDistance {
  spot: Spot
  distanceKm: number
}

export function getNearSeoulSpots(limit = 12): SpotWithDistance[] {
  return MOCK_SPOTS.map((spot) => ({
    spot,
    distanceKm: haversineDistanceKm(SEOUL_CITY_HALL, spot.coordinates),
  }))
    .filter(({ distanceKm }) => distanceKm <= NEAR_SEOUL_RADIUS_KM)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit)
}

/**
 * "아이와 가기 좋은" 여부를 판정할 실사용자 검증 데이터는 없어요.
 * 화장실·주차장 등 기본 편의시설이 있고 예상 혼잡도가 낮은 곳을
 * 이동 부담이 적은 곳으로 간주하는 정도의 보수적인 기준이에요.
 */
export function getFamilyFriendlySpots(limit = 12): Spot[] {
  return MOCK_SPOTS.filter(
    (spot) =>
      (spot.type === 'beach' || spot.type === 'valley') &&
      spot.amenities.includes('화장실') &&
      spot.amenities.includes('주차장') &&
      isQuiet(spot),
  )
    .sort(sortByPopularityThenRating)
    .slice(0, limit)
}

/**
 * 실시간 주차 여유 데이터는 없어서, 주차장이 있는 곳 중
 * 예상 혼잡도가 낮아 주차 회전이 상대적으로 원활할 가능성이 높은 곳을 골랐어요.
 */
export function getParkingEasySpots(limit = 12): Spot[] {
  return MOCK_SPOTS.filter(
    (spot) => spot.amenities.includes('주차장') && isQuiet(spot),
  )
    .sort(sortByPopularityThenRating)
    .slice(0, limit)
}

export function getSpotsByRegionLabel(regionLabel: string, limit = 20): Spot[] {
  return MOCK_SPOTS.filter((spot) => spot.regionLabel === regionLabel)
    .sort(sortByPopularityThenRating)
    .slice(0, limit)
}

export function getSpotsByRegionCode(
  regionCode: Spot['regionCode'],
  limit = 20,
): Spot[] {
  return MOCK_SPOTS.filter((spot) => spot.regionCode === regionCode)
    .sort(sortByPopularityThenRating)
    .slice(0, limit)
}
