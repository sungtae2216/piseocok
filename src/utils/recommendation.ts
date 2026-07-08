import type { CongestionLevel, Coordinates, Spot } from '@/types/spot'
import { getCongestionScore, levelFromScore } from '@/utils/congestion'
import { haversineDistanceKm } from '@/utils/geo'

export interface RecommendedSpot {
  spot: Spot
  congestionLevel: CongestionLevel
  congestionScore: number
  distanceKm: number | null
}

/**
 * "지금 가도 괜찮은" 피서지 한 곳을 골라요.
 * 위치 정보가 있으면 한산한(여유·보통) 곳 중 가장 가까운 곳을,
 * 없으면 한산한 곳 중 가장 인기 있는 곳을 추천해요.
 */
export function pickRecommendedSpot(
  spots: Spot[],
  myLocation: Coordinates | null,
): RecommendedSpot | null {
  if (spots.length === 0) return null

  const now = new Date()
  const scored = spots.map((spot) => ({
    spot,
    score: getCongestionScore(spot, now),
  }))

  const relaxed = scored.filter((entry) =>
    ['low', 'medium'].includes(levelFromScore(entry.score)),
  )
  const candidates = relaxed.length > 0 ? relaxed : scored

  const chosen = myLocation
    ? candidates.reduce((best, current) =>
        haversineDistanceKm(myLocation, current.spot.coordinates) <
        haversineDistanceKm(myLocation, best.spot.coordinates)
          ? current
          : best,
      )
    : candidates.reduce((best, current) =>
        current.spot.reviewCount * current.spot.rating >
        best.spot.reviewCount * best.spot.rating
          ? current
          : best,
      )

  return {
    spot: chosen.spot,
    congestionLevel: levelFromScore(chosen.score),
    congestionScore: chosen.score,
    distanceKm: myLocation
      ? haversineDistanceKm(myLocation, chosen.spot.coordinates)
      : null,
  }
}

export function getRecommendationReason(
  level: CongestionLevel,
  hasLocation: boolean,
): string {
  if (level === 'low') {
    return hasLocation
      ? '내 주변에서 지금 가장 한산한 곳이에요'
      : '지금은 비교적 한산한 편이에요'
  }
  return hasLocation
    ? '내 주변 중 무난한 혼잡도의 가까운 곳이에요'
    : '무난한 혼잡도로 지금 방문하기 좋아요'
}
