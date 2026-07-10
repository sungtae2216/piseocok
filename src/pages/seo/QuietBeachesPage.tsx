import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getQuietBeaches } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { quietBeachesSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getQuietBeaches()

  return (
    <SeoLandingLayout
      eyebrow="한산한 해수욕장"
      h1="사람 적은 한산한 해수욕장 찾기"
      intro={
        <>
          <p>
            여름 휴가철 유명 해수욕장은 오전부터 백사장이 가득 차는 경우가
            많아요. 피서콕은 장소별 평소 인기도와 현재 시간대·요일을 함께
            계산해 예상 혼잡도가 낮은 해수욕장을 추려서 보여드려요.
          </p>
          <p>
            아래 목록은 실시간 재실 인원을 센서로 측정한 값이 아니라, 평소
            방문객 규모를 기준으로 상대적으로 한산한 편인 곳을 정리한
            거예요. 방문 당일 상황은 날씨나 휴가철 성수기 여부에 따라 달라질
            수 있어요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="예상 혼잡도가 낮은 해수욕장"
      faq={[
        {
          question: '이번 주말 덜 붐비는 해수욕장은 어디인가요?',
          answer:
            '요일과 시간대에 따라 예상 혼잡도가 계속 바뀌기 때문에, 피서콕 홈 화면이나 이 페이지에서 그날 기준 예상 혼잡도를 확인하는 게 가장 정확해요. 이 목록은 평소 인기도가 낮은 해수욕장 위주로 정리한 참고용이에요.',
        },
        {
          question: '해수욕장은 몇 시에 가야 덜 붐비나요?',
          answer:
            '일반적으로 이른 아침이나 늦은 오후 시간대가 한낮보다 상대적으로 한산해요. 시간대별 경향은 피서지 덜 붐비는 시간 가이드에서 더 자세히 설명해요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '한산한 해수욕장', path: ROUTES.QUIET_BEACHES },
      ]}
      relatedLinks={[
        { label: '한산한 계곡도 함께 보기', to: ROUTES.QUIET_VALLEYS },
        { label: '서울 근교 피서지 보기', to: ROUTES.NEAR_SEOUL },
        { label: '피서지 덜 붐비는 시간 알아보기', to: ROUTES.GUIDE_BEST_TIME },
        { label: '전체 해수욕장·계곡 목록 보기', to: ROUTES.SPOTS },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const QuietBeachesPage = withSeo(Content, quietBeachesSeoMeta)
export default QuietBeachesPage
