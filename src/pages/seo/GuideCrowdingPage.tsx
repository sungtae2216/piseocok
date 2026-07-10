import { withSeo } from '@/utils/withSeo'
import { SeoGuideLayout } from '@/components/SeoGuideLayout'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { guideCrowdingSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  return (
    <SeoGuideLayout
      eyebrow="이용 가이드"
      h1="피서콕 혼잡도, 어떻게 보나요"
      body={
        <>
          <p>
            피서콕에서 보여주는 혼잡도는 실시간 재실 인원을 세는 센서 값이
            아니에요. 장소별 평소 인기도에 현재 시간대와 요일을 곱해서
            추정한 &lsquo;예상 혼잡도&rsquo;예요.
          </p>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              계산에 반영되는 세 가지
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                평소 인기도 — 그 장소가 평소에 얼마나 많이 붐비는 곳인지
                (여유~매우혼잡 기준)
              </li>
              <li>
                현재 시간대 — 한낮에는 배율을 높이고, 심야·새벽에는 낮춰서
                실제 야외활동 패턴에 가깝게 보정해요
              </li>
              <li>
                요일 — 주말과 금요일 저녁 이후에는 평일보다 혼잡도를 더 높게
                계산해요
              </li>
            </ul>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              혼잡도 단계는 이렇게 나뉘어요
            </h2>
            <p>
              계산된 점수를 여유, 보통, 혼잡, 매우혼잡 네 단계 배지로
              보여드려요. 점수가 낮을수록 상대적으로 한산하다는 뜻이고, 점수가
              높을수록 평소 인기가 많거나 지금 시간대에 방문객이 몰릴
              가능성이 높다는 뜻이에요.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              어디에서 확인할 수 있나요
            </h2>
            <p>
              홈 화면의 오늘의 추천 피서지와 혼잡도 TOP3, 장소 상세페이지,
              지도 화면 모두에서 같은 기준으로 계산된 예상 혼잡도를 볼 수
              있어요.
            </p>
          </section>
        </>
      }
      faq={[
        {
          question: '피서콕 혼잡도는 어떻게 계산하나요?',
          answer:
            '장소별 평소 인기도에 현재 시간대와 요일 가중치를 곱해서 계산해요. 실시간 재실 인원을 세는 센서 데이터는 아니고, 어디까지나 추정치예요.',
        },
        {
          question: '계곡이나 해수욕장에 사람이 많은지 미리 알 수 있나요?',
          answer:
            '정확한 실시간 인원까지는 알 수 없지만, 평소 인기도와 지금 시간대를 반영한 예상 혼잡도로 대략적인 경향은 미리 확인할 수 있어요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '피서지 혼잡도 보는 방법', path: ROUTES.GUIDE_CROWDING },
      ]}
      relatedLinks={[
        { label: '피서지 덜 붐비는 시간 알아보기', to: ROUTES.GUIDE_BEST_TIME },
        { label: '혼잡도 낮은 해수욕장 보기', to: ROUTES.QUIET_BEACHES },
        { label: '혼잡도 낮은 계곡 보기', to: ROUTES.QUIET_VALLEYS },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const GuideCrowdingPage = withSeo(Content, guideCrowdingSeoMeta)
export default GuideCrowdingPage
