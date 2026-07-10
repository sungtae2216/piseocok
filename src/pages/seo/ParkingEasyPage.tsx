import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getParkingEasySpots } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { parkingEasySeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const spots = getParkingEasySpots()

  return (
    <SeoLandingLayout
      eyebrow="주차 편한 피서지"
      h1="주차 편한 피서지 찾기"
      intro={
        <>
          <p>
            피서지에서 가장 스트레스받는 순간 중 하나가 주차예요. 피서콕은
            실시간 주차 여유 대수까지는 알 수 없지만, 주차장을 갖추고 있고
            예상 혼잡도가 낮은 곳일수록 주차 회전이 원활할 가능성이 높다고
            보고 목록을 정리했어요.
          </p>
          <p>
            정확한 가까운 주차장 위치와 거리는 각 장소의 상세페이지에서
            카카오맵 기반으로 확인할 수 있어요. 성수기 주말에는 이 목록의
            장소도 주차장이 가득 찰 수 있으니 여유 있게 출발하는 걸
            추천해요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="주차장을 갖추고 한산한 곳"
      faq={[
        {
          question: '해수욕장 주차는 어디가 편한가요?',
          answer:
            '주차장이 마련돼 있고 예상 혼잡도가 낮은 해수욕장일수록 주차 회전이 원활한 편이에요. 정확한 주차장 위치와 거리는 각 장소 상세페이지에서 확인할 수 있어요.',
        },
        {
          question: '주차가 편한 피서지는 어디인가요?',
          answer:
            '이 페이지에 정리된 곳들이 주차장을 갖추고 있으면서 상대적으로 한산한 곳이에요. 다만 실시간 주차 여유 정보는 제공하지 않으니, 성수기에는 이른 시간에 방문하는 걸 권장해요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '주차 편한 피서지', path: ROUTES.PARKING_EASY },
      ]}
      relatedLinks={[
        { label: '아이와 가기 좋은 곳 보기', to: ROUTES.FAMILY },
        { label: '한산한 해수욕장 보기', to: ROUTES.QUIET_BEACHES },
        { label: '한산한 계곡 보기', to: ROUTES.QUIET_VALLEYS },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const ParkingEasyPage = withSeo(Content, parkingEasySeoMeta)
export default ParkingEasyPage
