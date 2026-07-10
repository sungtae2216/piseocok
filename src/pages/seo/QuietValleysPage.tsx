import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getQuietValleys } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { quietValleysSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getQuietValleys()

  return (
    <SeoLandingLayout
      eyebrow="한산한 계곡"
      h1="사람 적은 한산한 계곡 찾기"
      intro={
        <>
          <p>
            계곡은 자리가 한정적이라 조금만 늦게 도착해도 발 담글 곳을 찾기
            어려운 경우가 많아요. 피서콕은 계곡별 평소 인기도와 현재
            시간대·요일을 함께 반영해 예상 혼잡도가 낮은 계곡을 모아
            보여드려요.
          </p>
          <p>
            계곡은 물살이 세거나 지형이 미끄러운 곳이 있을 수 있어요. 아이와
            함께라면 물가에서 항상 보호자가 동행하고, 안전 안내 표지판을
            확인해주세요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="예상 혼잡도가 낮은 계곡"
      faq={[
        {
          question: '서울 근교에서 한산한 계곡은 어디인가요?',
          answer:
            '가평·홍천·인제 등 수도권에서 당일치기로 다녀올 수 있는 계곡이 여러 곳 있어요. 거리순으로 정리한 서울 근교 피서지 페이지에서 계곡만 따로 찾아볼 수 있어요.',
        },
        {
          question: '계곡은 사람이 많은지 어떻게 알 수 있나요?',
          answer:
            '피서콕은 계곡별 평소 방문객 규모와 현재 시간대를 계산해 예상 혼잡도를 여유·보통·혼잡·매우혼잡 네 단계로 보여줘요. 실시간 인원 센서 값은 아니라는 점을 참고해주세요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '한산한 계곡', path: ROUTES.QUIET_VALLEYS },
      ]}
      relatedLinks={[
        { label: '한산한 해수욕장도 함께 보기', to: ROUTES.QUIET_BEACHES },
        { label: '서울 근교 피서지 보기', to: ROUTES.NEAR_SEOUL },
        { label: '피서지 혼잡도 보는 방법', to: ROUTES.GUIDE_CROWDING },
        { label: '전체 해수욕장·계곡 목록 보기', to: ROUTES.SPOTS },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const QuietValleysPage = withSeo(Content, quietValleysSeoMeta)
export default QuietValleysPage
