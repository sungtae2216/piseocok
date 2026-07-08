import { Link } from 'react-router-dom'
import type { Spot } from '@/types/spot'
import { CongestionBadge } from '@/components/CongestionBadge'
import { HeartIcon, StarIcon } from '@/components/icons'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { SPOT_TYPE_LABEL } from '@/constants/spotTypes'
import { spotDetailPath } from '@/constants/routes'
import { estimateCongestion } from '@/utils/congestion'

interface SpotCardProps {
  spot: Spot
  variant?: 'default' | 'compact'
}

export function SpotCard({ spot, variant = 'default' }: SpotCardProps) {
  const isFavorite = useFavoriteStore((state) => state.isFavorite(spot.id))
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)

  const width = variant === 'compact' ? 'w-40' : 'w-full'

  return (
    <article
      className={`${width} relative shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]`}
    >
      <Link to={spotDetailPath(spot.id)} className="block">
        <div className="relative">
          <img
            src={spot.imageUrl}
            alt={spot.name}
            className="h-28 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <CongestionBadge level={estimateCongestion(spot)} />
          </div>
        </div>
        <div className="space-y-1 p-3">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {spot.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs text-slate-500">
              {SPOT_TYPE_LABEL[spot.type]} · {spot.regionLabel}
            </p>
            <span className="flex shrink-0 items-center gap-0.5 text-xs text-slate-500">
              <StarIcon className="h-3 w-3 text-amber-400" />
              {spot.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        onClick={() => toggleFavorite(spot.id)}
        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm"
      >
        <HeartIcon
          className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
        />
      </button>
    </article>
  )
}
