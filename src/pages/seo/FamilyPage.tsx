import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getFamilyFriendlySpots } from '@/content/curatedSpots'
import {
  CONGESTION_DISCLAIMER,
  NO_VERIFIED_KID_PET_DATA_DISCLAIMER,
} from '@/content/disclaimers'
import { familySeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getFamilyFriendlySpots()

  return (
    <SeoLandingLayout
      eyebrow="가족 피서지"
      h1="아이와 가기 좋은 피서지"
      intro={
        <>
          <p>
            아이와 함께라면 사람이 몰리는 곳보다 화장실과 주차장이 가까운
            곳이 훨씬 편해요. 이 목록은 화장실·주차장 시설을 갖추고 있고
            예상 혼잡도가 낮은 해수욕장·계곡 위주로 골랐어요.
          </p>
          <p>
            다만 이 목록이 아이 안전을 별도로 검증했다는 뜻은 아니에요.
            물놀이 구간의 수심이나 유속, 안전요원 배치 여부는 장소마다 다르니
            현장 안내판을 꼭 확인하고, 아이 곁에는 보호자가 항상 함께
            있어주세요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="편의시설을 갖추고 한산한 곳"
      faq={[
        {
          question: '아이와 가기 좋은 물놀이 장소는 어디인가요?',
          answer:
            '화장실과 주차장이 있고 예상 혼잡도가 낮은 곳일수록 아이와 이동하기 편해요. 이 페이지의 목록이 그 기준으로 고른 곳이고, 각 장소 상세페이지에서 편의시설과 안전 관련 안내를 함께 확인할 수 있어요.',
        },
        {
          question: '반려견과 함께 가도 되나요?',
          answer:
            NO_VERIFIED_KID_PET_DATA_DISCLAIMER +
            ' 해수욕장은 지자체별로 반려동물 동반 정책이 다른 경우가 많아 특히 사전 확인이 필요해요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '아이와 가기 좋은 피서지', path: ROUTES.FAMILY },
      ]}
      relatedLinks={[
        { label: '주차 편한 곳 보기', to: ROUTES.PARKING_EASY },
        { label: '한산한 해수욕장 보기', to: ROUTES.QUIET_BEACHES },
        { label: '한산한 계곡 보기', to: ROUTES.QUIET_VALLEYS },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const FamilyPage = withSeo(Content, familySeoMeta)
export default FamilyPage
