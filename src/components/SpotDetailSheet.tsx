import { Link } from 'react-router-dom'
import type { Spot } from '@/types/spot'
import { CongestionBadge } from '@/components/CongestionBadge'
import { HeartIcon, StarIcon } from '@/components/icons'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { SPOT_TYPE_LABEL } from '@/constants/spotTypes'
import { spotDetailPath } from '@/constants/routes'
import { estimateCongestion } from '@/utils/congestion'

interface SpotDetailSheetProps {
  spot: Spot
  onClose: () => void
}

export function SpotDetailSheet({ spot, onClose }: SpotDetailSheetProps) {
  const isFavorite = useFavoriteStore((state) => state.isFavorite(spot.id))
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)

  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 rounded-t-3xl bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />
      <div className="flex gap-3">
        <Link
          to={spotDetailPath(spot.id)}
          className="flex min-w-0 flex-1 gap-3"
        >
          <img
            src={spot.imageUrl}
            alt={spot.name}
            className="h-20 w-20 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {spot.name}
            </h3>
            <p className="text-xs text-slate-500">
              {SPOT_TYPE_LABEL[spot.type]} · {spot.regionLabel}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <CongestionBadge level={estimateCongestion(spot)} />
              <span className="flex items-center gap-0.5 text-xs text-slate-500">
                <StarIcon className="h-3 w-3 text-amber-400" />
                {spot.rating.toFixed(1)} ({spot.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>
        </Link>
        <button
          type="button"
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          onClick={() => toggleFavorite(spot.id)}
          className="shrink-0 text-slate-400"
        >
          <HeartIcon
            className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {spot.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
          >
            #{tag}
          </span>
        ))}
      </div>
      <Link
        to={spotDetailPath(spot.id)}
        className="mt-3 block text-center text-xs font-medium text-sky-500"
      >
        자세히 보기
      </Link>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-4 text-xs text-slate-400"
      >
        닫기
      </button>
    </div>
  )
}
