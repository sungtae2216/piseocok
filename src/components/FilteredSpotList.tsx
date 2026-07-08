import { useState } from 'react'
import type { SpotFilter } from '@/apis/spot'
import { useSpots } from '@/hooks/useSpots'
import { SpotCard } from '@/components/SpotCard'

interface FilteredSpotListProps {
  filter: SpotFilter
  /** 이 개수만큼만 보여주고 더 이상 확장하지 않아요 (홈 화면 미리보기용) */
  limit?: number
  /** 처음 보여줄 개수. "더보기"를 누르면 이만큼씩 더 불러와요 */
  pageSize?: number
}

export function FilteredSpotList({
  filter,
  limit,
  pageSize,
}: FilteredSpotListProps) {
  const { data: spots, isLoading, isError } = useSpots(filter)
  const [visibleCount, setVisibleCount] = useState(pageSize ?? Infinity)

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (isError || !spots) {
    return (
      <p className="py-4 text-sm text-slate-400">
        피서지 목록을 불러오지 못했어요.
      </p>
    )
  }

  if (spots.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-400">
        조건에 맞는 피서지가 아직 없어요.
      </p>
    )
  }

  const displayCount = limit ?? visibleCount
  const visibleSpots = spots.slice(0, displayCount)
  const hasMore = pageSize !== undefined && spots.length > visibleCount

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {visibleSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + pageSize!)}
          className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600"
        >
          더보기
        </button>
      )}
    </div>
  )
}
