import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useFavoriteSpots } from '@/hooks/useSpots'
import { SpotCard } from '@/components/SpotCard'
import { HeartIcon } from '@/components/icons'

export function FavoritesPage() {
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds)
  const { data: spots, isLoading } = useFavoriteSpots(favoriteIds)

  return (
    <div className="space-y-4 px-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-8">
      <header>
        <h1 className="text-xl font-bold text-slate-900">즐겨찾기</h1>
        <p className="text-sm text-slate-500">
          저장한 피서지를 모아볼 수 있어요
        </p>
      </header>

      {favoriteIds.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <HeartIcon className="h-10 w-10 text-slate-200" />
          <p className="text-sm text-slate-400">
            아직 즐겨찾기한 피서지가 없어요.
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: favoriteIds.length }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {spots?.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  )
}
