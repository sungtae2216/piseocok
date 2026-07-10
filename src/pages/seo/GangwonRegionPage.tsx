import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getSpotsByRegionCode } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { gangwonRegionSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getSpotsByRegionCode('gangwon')

  return (
    <SeoLandingLayout
      eyebrow="지역별 피서지"
      h1="강원도 피서지 추천"
      intro={
        <>
          <p>
            강원도는 동해 해변과 설악산·오대산 자락의 계곡을 함께 갖춘
            흔치 않은 지역이에요. 서울에서 차로 2~3시간대에 닿을 수 있는
            곳이 많아 당일치기나 1박 2일 일정 모두에 어울려요.
          </p>
          <p>
            강릉·양양 쪽 해변은 서핑 명소로도 유명해 여름 성수기 혼잡도가
            높은 편이고, 인제·홍천 쪽 계곡은 상대적으로 한산한 곳이 많은
            편이에요. 목적에 따라 아래 목록에서 비교해보세요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="강원도 피서지 목록"
      faq={[
        {
          question: '강원도에서 한산한 해수욕장은 어디인가요?',
          answer:
            '강릉·양양 중심가에서 떨어진 소규모 해변일수록 예상 혼잡도가 낮은 편이에요. 이 페이지의 목록을 혼잡도 낮은 순으로 살펴보세요.',
        },
        {
          question: '서울에서 가까운 강원도 계곡은 어디인가요?',
          answer:
            '인제·홍천·평창 쪽 계곡이 서울에서 비교적 가까운 편이에요. 정확한 거리순 목록은 서울 근교 피서지 페이지에서 확인할 수 있어요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '강원도 피서지', path: ROUTES.REGION_GANGWON },
      ]}
      relatedLinks={[
        { label: '서울 근교 피서지 보기', to: ROUTES.NEAR_SEOUL },
        { label: '한산한 계곡 전체 보기', to: ROUTES.QUIET_VALLEYS },
        { label: '부산 피서지 보기', to: ROUTES.REGION_BUSAN },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const GangwonRegionPage = withSeo(Content, gangwonRegionSeoMeta)
export default GangwonRegionPage
