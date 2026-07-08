import { useSearchSpots } from '@/hooks/useSpots'
import { SpotCard } from '@/components/SpotCard'

interface SearchResultListProps {
  keyword: string
}

export function SearchResultList({ keyword }: SearchResultListProps) {
  const { data: spots, isLoading, isError } = useSearchSpots(keyword)

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
        검색 결과를 불러오지 못했어요.
      </p>
    )
  }

  if (spots.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-400">
        {`'${keyword}'`}에 대한 검색 결과가 없어요.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  )
}
