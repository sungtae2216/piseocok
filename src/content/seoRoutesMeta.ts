import type { SeoMeta } from '@/types/seo'
import { ROUTES } from '@/constants/routes'

export const quietBeachesSeoMeta: SeoMeta = {
  title: '한산한 해수욕장 추천 | 사람 적은 바다 찾기 - 피서콕',
  description:
    '사람 많은 유명 해수욕장 대신 예상 혼잡도가 낮은 한산한 해수욕장을 모아봤어요. 지역, 주차, 화장실 정보까지 피서콕에서 함께 확인하세요.',
  path: ROUTES.QUIET_BEACHES,
}

export const quietValleysSeoMeta: SeoMeta = {
  title: '한산한 계곡 추천 | 사람 적은 계곡 찾기 - 피서콕',
  description:
    '물놀이하기 좋은 계곡 중 예상 혼잡도가 낮은 곳을 모았어요. 주차, 화장실 여부와 함께 한산한 계곡을 피서콕에서 확인하세요.',
  path: ROUTES.QUIET_VALLEYS,
}

export const nearSeoulSeoMeta: SeoMeta = {
  title: '서울 근교 피서지 추천 | 당일치기 물놀이 - 피서콕',
  description:
    '서울에서 직선거리 기준 가까운 순으로 정리한 피서지 목록이에요. 당일치기로 다녀올 수 있는 해수욕장·계곡을 혼잡도와 함께 확인하세요.',
  path: ROUTES.NEAR_SEOUL,
}

export const familySeoMeta: SeoMeta = {
  title: '아이와 가기 좋은 피서지 | 가족 물놀이 추천 - 피서콕',
  description:
    '화장실·주차장을 갖추고 예상 혼잡도가 낮아 아이와 이동하기 부담이 적은 피서지를 모았어요. 가족 단위 물놀이 장소를 피서콕에서 확인하세요.',
  path: ROUTES.FAMILY,
}

export const parkingEasySeoMeta: SeoMeta = {
  title: '주차 편한 피서지 추천 | 해수욕장·계곡 주차 정보 - 피서콕',
  description:
    '주차장을 갖추고 있고 예상 혼잡도가 낮아 주차 스트레스가 적을 가능성이 높은 피서지를 모았어요. 장소별 가까운 주차장 거리도 상세페이지에서 확인하세요.',
  path: ROUTES.PARKING_EASY,
}

export const busanRegionSeoMeta: SeoMeta = {
  title: '부산 해수욕장 추천 | 부산 피서지 혼잡도 - 피서콕',
  description:
    '해운대·광안리 등 부산 대표 해수욕장의 예상 혼잡도, 주차, 화장실 정보를 한눈에 확인하세요.',
  path: ROUTES.REGION_BUSAN,
}

export const gangwonRegionSeoMeta: SeoMeta = {
  title: '강원도 피서지 추천 | 한산한 해수욕장·계곡 - 피서콕',
  description:
    '강릉·양양·인제 등 강원도 해수욕장과 계곡의 예상 혼잡도를 확인하세요. 서울에서 당일치기로 다녀오기 좋은 곳도 함께 소개해요.',
  path: ROUTES.REGION_GANGWON,
}

export const jejuRegionSeoMeta: SeoMeta = {
  title: '제주도 물놀이 장소 추천 | 제주 피서지 혼잡도 - 피서콕',
  description:
    '협재·함덕 등 제주 해수욕장과 도내 계곡의 예상 혼잡도를 확인하세요. 에메랄드빛 바다부터 한적한 물놀이 장소까지 모아봤어요.',
  path: ROUTES.REGION_JEJU,
}

export const guideBestTimeSeoMeta: SeoMeta = {
  title: '피서지 덜 붐비는 시간 | 여름 휴가 언제 갈까 - 피서콕',
  description:
    '해수욕장·계곡이 상대적으로 한산한 시간대와 요일을 정리했어요. 오늘 갈 만한 피서지를 고르기 전에 참고하세요.',
  path: ROUTES.GUIDE_BEST_TIME,
}

export const guideCrowdingSeoMeta: SeoMeta = {
  title: '피서지 혼잡도 보는 방법 | 예상 혼잡도 계산 기준 - 피서콕',
  description:
    '피서콕이 보여주는 예상 혼잡도는 어떻게 계산되는지, 여유·보통·혼잡·매우혼잡 단계는 무엇을 뜻하는지 정리했어요.',
  path: ROUTES.GUIDE_CROWDING,
}
