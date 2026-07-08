import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSpots } from '@/hooks/useSpots'
import { CongestionBadge } from '@/components/CongestionBadge'
import { SPOT_TYPE_LABEL } from '@/constants/spotTypes'
import { spotDetailPath } from '@/constants/routes'
import { getCongestionScore, levelFromScore } from '@/utils/congestion'

interface CongestionRankingListProps {
  limit?: number
  variant?: 'list' | 'grid'
}

export function CongestionRankingList({
  limit,
  variant = 'list',
}: CongestionRankingListProps) {
  const { data: spots, isLoading, isError } = useSpots({})

  const ranked = useMemo(() => {
    if (!spots) return []
    const now = new Date()
    return [...spots]
      .map((spot) => {
        const score = getCongestionScore(spot, now)
        return { spot, score, level: levelFromScore(score) }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [spots, limit])

  if (isLoading) {
    const skeletonClass =
      variant === 'grid' ? 'h-32 rounded-2xl' : 'h-16 rounded-xl'
    return (
      <div
        className={variant === 'grid' ? 'grid grid-cols-3 gap-2' : 'space-y-2'}
      >
        {Array.from({ length: limit ?? 5 }).map((_, index) => (
          <div
            key={index}
            className={`animate-pulse bg-slate-100 ${skeletonClass}`}
          />
        ))}
      </div>
    )
  }

  if (isError || ranked.length === 0) {
    return (
      <p className="py-4 text-sm text-slate-400">
        혼잡도 순위를 불러오지 못했어요.
      </p>
    )
  }

  if (variant === 'grid') {
    return (
      <ol className="grid grid-cols-3 gap-2">
        {ranked.map(({ spot, level }, index) => (
          <li key={spot.id}>
            <Link
              to={spotDetailPath(spot.id)}
              className="block overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
            >
              <div className="relative">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="h-20 w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/80 text-[11px] font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <div className="space-y-1 p-2">
                <p className="truncate text-xs font-semibold text-slate-900">
                  {spot.name}
                </p>
                <p className="truncate text-[11px] text-slate-400">
                  {spot.regionLabel}
                </p>
                <CongestionBadge level={level} />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ol className="space-y-2">
      {ranked.map(({ spot, level }, index) => (
        <li key={spot.id}>
          <Link
            to={spotDetailPath(spot.id)}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm"
          >
            <span className="w-5 shrink-0 text-center text-sm font-bold text-slate-400">
              {index + 1}
            </span>
            <img
              src={spot.imageUrl}
              alt={spot.name}
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {spot.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                {SPOT_TYPE_LABEL[spot.type]} · {spot.regionLabel}
              </p>
            </div>
            <CongestionBadge level={level} />
          </Link>
        </li>
      ))}
    </ol>
  )
}
