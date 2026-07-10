import { withSeo } from '@/utils/withSeo'
import { SeoGuideLayout } from '@/components/SeoGuideLayout'
import { CONGESTION_DISCLAIMER } from '@/content/disclaimers'
import { guideBestTimeSeoMeta } from '@/content/seoRoutesMeta'
import { ROUTES } from '@/constants/routes'

export function Content() {
  return (
    <SeoGuideLayout
      eyebrow="이용 가이드"
      h1="피서지, 언제 가야 덜 붐빌까요"
      body={
        <>
          <p>
            같은 피서지라도 방문하는 시간대와 요일에 따라 체감 혼잡도는 크게
            달라져요. 피서콕이 예상 혼잡도를 계산할 때 실제로 반영하는 기준을
            그대로 정리했어요.
          </p>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              하루 중에서는 이른 아침·늦은 오후가 한산해요
            </h2>
            <p>
              오전 11시부터 오후 4시 사이, 한낮 시간대에 야외활동 인구가 가장
              많아요. 반대로 오전 9시 이전이나 오후 4시 이후는 상대적으로
              한산한 편이고, 밤 11시 이후 심야·새벽 시간대는 인기 피서지라도
              방문객이 크게 줄어들어요.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              평일이 주말보다 한산해요
            </h2>
            <p>
              토요일·일요일과 금요일 오후 5시 이후는 평일보다 혼잡도가 높게
              계산돼요. 일정을 조정할 수 있다면 평일 오전이나 늦은 오후가
              가장 여유로운 선택이에요.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              오늘 갈 만한 피서지를 고르는 방법
            </h2>
            <p>
              피서콕 홈 화면의 &lsquo;오늘의 추천 피서지&rsquo;와 혼잡도 TOP3는
              지금 이 시각을 기준으로 다시 계산돼요. 방문 직전에 한 번 더
              확인하면 시간대별 변화를 놓치지 않을 수 있어요.
            </p>
          </section>
        </>
      }
      faq={[
        {
          question: '피서지는 언제 가야 덜 붐비나요?',
          answer:
            '이른 아침(오전 9시 이전)이나 늦은 오후(오후 4시 이후), 그리고 주말보다는 평일이 상대적으로 한산해요. 한낮과 주말 오후는 가장 붐비는 시간대예요.',
        },
        {
          question: '주말에 덜 붐비는 여행지는 어디인가요?',
          answer:
            '같은 주말이라도 유명세가 덜한 곳일수록 예상 혼잡도가 낮은 편이에요. 한산한 해수욕장, 한산한 계곡 페이지에서 그날 기준 혼잡도를 확인해보세요.',
        },
        {
          question: '오늘 갈 만한 피서지는 어떻게 고르나요?',
          answer:
            '피서콕 홈 화면에서 현재 시각 기준으로 계산된 오늘의 추천 피서지와 혼잡도 TOP3를 확인할 수 있어요.',
        },
      ]}
      breadcrumb={[
        { name: '홈', path: ROUTES.HOME },
        { name: '피서지 덜 붐비는 시간', path: ROUTES.GUIDE_BEST_TIME },
      ]}
      relatedLinks={[
        { label: '피서지 혼잡도 보는 방법', to: ROUTES.GUIDE_CROWDING },
        { label: '한산한 해수욕장 보기', to: ROUTES.QUIET_BEACHES },
        { label: '한산한 계곡 보기', to: ROUTES.QUIET_VALLEYS },
      ]}
      disclaimer={CONGESTION_DISCLAIMER}
    />
  )
}

const GuideBestTimePage = withSeo(Content, guideBestTimeSeoMeta)
export default GuideBestTimePage
