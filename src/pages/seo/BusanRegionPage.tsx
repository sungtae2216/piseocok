import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getSpotsByRegionLabel } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { busanRegionSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getSpotsByRegionLabel('부산')

  return (
    <SeoLandingLayout
      eyebrow="지역별 피서지"
      h1="부산 피서지 추천"
      intro={
        <>
          <p>
            부산은 지하철과 버스만으로도 해수욕장에 닿을 수 있는 도심
            접근성이 강점이에요. 그만큼 여름철에는 해운대·광안리 같은 대표
            해수욕장에 인파가 집중되기 쉬워요.
          </p>
          <p>
            피서콕에서는 부산 해수욕장별 예상 혼잡도를 시간대에 따라 다르게
            계산해요. 도심 야경을 즐기고 싶다면 광안리, 넓은 백사장이
            필요하다면 해운대처럼 목적에 맞게 비교해보세요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="부산 피서지 목록"
      faq={[
        {
          question: '부산 해수욕장 추천해주세요.',
          answer:
            '도심 접근성은 해운대·광안리가 좋고, 상대적으로 한산한 편을 원한다면 이 페이지의 예상 혼잡도가 낮은 순으로 살펴보는 걸 추천해요.',
        },
        {
          question: '부산에서 한산한 해수욕장은 어디인가요?',
          answer:
            '시간대와 요일에 따라 예상 혼잡도가 달라지기 때문에, 이 페이지에서 그날 기준 혼잡도를 확인하는 게 가장 정확해요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '부산 피서지', path: ROUTES.REGION_BUSAN },
      ]}
      relatedLinks={[
        { label: '강원도 피서지 보기', to: ROUTES.REGION_GANGWON },
        { label: '제주 피서지 보기', to: ROUTES.REGION_JEJU },
        { label: '한산한 해수욕장 전체 보기', to: ROUTES.QUIET_BEACHES },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const BusanRegionPage = withSeo(Content, busanRegionSeoMeta)
export default BusanRegionPage
