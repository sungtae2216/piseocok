import type { Coordinates } from '@/types/spot'

/** 카카오맵에서 실제 경로/소요시간을 확인할 수 있는 길찾기 딥링크예요. */
export function kakaoMapDirectionsUrl(
  name: string,
  coordinates: Coordinates,
): string {
  return `https://map.kakao.com/link/to/${encodeURIComponent(name)},${coordinates.lat},${coordinates.lng}`
}
