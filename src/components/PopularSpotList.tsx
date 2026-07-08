import { usePopularSpots } from '@/hooks/useSpots'
import { SpotCard } from '@/components/SpotCard'

export function PopularSpotList() {
  const { data: spots, isLoading, isError } = usePopularSpots()

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-44 w-40 shrink-0 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (isError || !spots) {
    return (
      <p className="py-4 text-sm text-slate-400">
        인기 피서지를 불러오지 못했어요.
      </p>
    )
  }

  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
      {spots.slice(0, 8).map((spot) => (
        <SpotCard key={spot.id} spot={spot} variant="compact" />
      ))}
    </div>
  )
}
