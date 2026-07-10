import { useNavigate } from 'react-router-dom'
import { CongestionRankingList } from '@/components/CongestionRankingList'
import { ArrowLeftIcon } from '@/components/icons'
import { Seo } from '@/components/Seo'
import { ROUTES } from '@/constants/routes'

export function RankingPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4 px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-8">
      <Seo
        title="피서지 혼잡도 순위 | 오늘 가장 붐비는 곳은 - 피서콕"
        description="해수욕장·계곡의 예상 혼잡도를 여유부터 매우혼잡까지 순위로 확인하세요."
        path={ROUTES.RANKING}
      />
      <header className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">예상 혼잡도 순위</h1>
      </header>
      <p className="text-xs text-slate-400">
        평소 인기도와 현재 시간대를 기반으로 추정한 순위예요. 실시간 재실 인원
        데이터는 아니에요.
      </p>
      <CongestionRankingList />
    </div>
  )
}
