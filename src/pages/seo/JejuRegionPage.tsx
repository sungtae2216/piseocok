import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getSpotsByRegionCode } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { jejuRegionSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getSpotsByRegionCode('jeju')

  return (
    <SeoLandingLayout
      eyebrow="지역별 피서지"
      h1="제주도 물놀이 장소 추천"
      intro={
        <>
          <p>
            제주는 에메랄드빛 바다로 유명한 협재·함덕 같은 해수욕장부터
            현무암 지형의 돈내코계곡까지 물놀이 장소가 다양해요. 다만
            비행기로 접근하는 만큼 성수기에는 어디든 사람이 몰리는 편이에요.
          </p>
          <p>
            같은 제주라도 해수욕장별로 예상 혼잡도 차이가 커요. 아래 목록에서
            시간대별 예상 혼잡도를 비교해보고, 상대적으로 한산한 곳 위주로
            일정을 짜보세요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="제주 피서지 목록"
      faq={[
        {
          question: '제주도 물놀이 장소 추천해주세요.',
          answer:
            '에메랄드빛 바다를 원한다면 협재·함덕이 대표적이고, 계곡 물놀이를 원한다면 돈내코계곡을 참고하세요. 이 페이지에서 예상 혼잡도를 함께 비교할 수 있어요.',
        },
        {
          question: '제주에서 한산한 해수욕장은 어디인가요?',
          answer:
            '유명 해수욕장에서 조금 떨어진 곳일수록 예상 혼잡도가 낮은 편이에요. 이 페이지의 목록을 혼잡도 낮은 순으로 확인해보세요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '제주 피서지', path: ROUTES.REGION_JEJU },
      ]}
      relatedLinks={[
        { label: '한산한 해수욕장 전체 보기', to: ROUTES.QUIET_BEACHES },
        { label: '강원도 피서지 보기', to: ROUTES.REGION_GANGWON },
        { label: '부산 피서지 보기', to: ROUTES.REGION_BUSAN },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const JejuRegionPage = withSeo(Content, jejuRegionSeoMeta)
export default JejuRegionPage
