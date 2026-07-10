import { withSeo } from '@/utils/withSeo'
import { SeoLandingLayout } from '@/components/SeoLandingLayout'
import { getNearSeoulSpots } from '@/content/curatedSpots'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { nearSeoulSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  const nearby = getNearSeoulSpots()
  const spots = nearby.map(({ spot }) => spot)

  return (
    <SeoLandingLayout
      eyebrow="서울 근교 피서지"
      h1="서울에서 가까운 당일치기 피서지"
      intro={
        <>
          <p>
            서울 시청을 기준으로 직선거리 약 100km 이내에 있는 피서지를 가까운
            순서로 정리했어요. 대부분 당일치기로 다녀올 수 있는 거리라, 숙박
            없이 물놀이만 즐기고 싶을 때 참고하기 좋아요.
          </p>
          <p>
            여기서 말하는 거리는 실제 도로 경로가 아니라 직선거리 기준
            추정치예요. 실제 이동 시간은 도로 상황과 경로에 따라 달라질 수
            있으니, 정확한 길찾기는 장소 상세페이지의 카카오맵 길찾기를
            이용해주세요.
          </p>
        </>
      }
      spots={spots}
      spotsHeading="서울에서 가까운 순서"
      faq={[
        {
          question: '서울 근교에서 한산한 계곡은 어디인가요?',
          answer:
            '가평·홍천·인제 등 경기·강원 인근 계곡이 서울에서 비교적 가까운 편이에요. 이 목록에서 계곡 유형을 우선 살펴보시고, 그중 예상 혼잡도가 낮은 곳은 한산한 계곡 페이지에서 따로 확인할 수 있어요.',
        },
        {
          question: '당일치기로 다녀올 수 있는 피서지는 어디인가요?',
          answer:
            '이 페이지의 목록 대부분이 서울에서 직선거리 100km 이내라 당일치기로 다녀오기 좋은 편이에요. 다만 실제 이동 시간은 도로 상황에 따라 달라지니 넉넉하게 일정을 잡는 걸 추천해요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '서울 근교 피서지', path: ROUTES.NEAR_SEOUL },
      ]}
      relatedLinks={[
        { label: '한산한 계곡 보기', to: ROUTES.QUIET_VALLEYS },
        { label: '한산한 해수욕장 보기', to: ROUTES.QUIET_BEACHES },
        { label: '주차 편한 곳 보기', to: ROUTES.PARKING_EASY },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const NearSeoulPage = withSeo(Content, nearSeoulSeoMeta)
export default NearSeoulPage
