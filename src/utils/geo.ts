import type { Coordinates } from '@/types/spot'

const EARTH_RADIUS_KM = 6371
const ASSUMED_AVERAGE_SPEED_KMH = 40

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat)
  const dLng = toRadians(b.lng - a.lng)
  const lat1 = toRadians(a.lat)
  const lat2 = toRadians(b.lat)

  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** 직선거리 기준 대략적인 차량 이동시간 추정치예요. 실제 경로/교통 상황은 반영되지 않아요. */
export function estimateTravelMinutes(distanceKm: number): number {
  return Math.max(1, Math.round((distanceKm / ASSUMED_AVERAGE_SPEED_KMH) * 60))
}
