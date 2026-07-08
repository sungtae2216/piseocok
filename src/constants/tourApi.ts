export const TOUR_API_KEY = import.meta.env.VITE_TOUR_API_KEY
export const TOUR_API_BASE_URL = 'https://apis.data.go.kr/B551011/KorService2'

/**
 * 자연관광지(cat1=A01, cat2=A0101) 소분류 코드 → 우리 서비스의 SpotType 매핑.
 * categoryCode2 API로 실제 호출해 검증한 코드예요 (2026-07-09 확인).
 * 산 343곳 · 계곡 197곳 · 해수욕장 240곳 · 강 135곳.
 */
export const CAT3_TO_SPOT_TYPE = {
  A01010400: 'mountain', // 산
  A01010900: 'valley', // 계곡
  A01011200: 'beach', // 해수욕장
  A01011800: 'river', // 강
} as const

/** TourAPI areacode → 우리 서비스의 RegionCode 매핑 */
export const AREA_CODE_TO_REGION: Record<string, string> = {
  '1': 'seoul-incheon-gyeonggi', // 서울
  '2': 'seoul-incheon-gyeonggi', // 인천
  '31': 'seoul-incheon-gyeonggi', // 경기
  '3': 'chungcheong', // 대전
  '8': 'chungcheong', // 세종
  '33': 'chungcheong', // 충북
  '34': 'chungcheong', // 충남
  '37': 'jeolla', // 전북
  '38': 'jeolla', // 전남
  '5': 'jeolla', // 광주
  '35': 'gyeongsang', // 경북
  '36': 'gyeongsang', // 경남
  '4': 'gyeongsang', // 대구
  '6': 'gyeongsang', // 부산
  '7': 'gyeongsang', // 울산
  '32': 'gangwon', // 강원
  '39': 'jeju', // 제주
}
