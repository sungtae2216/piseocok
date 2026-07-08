import { Link } from 'react-router-dom'
import { useKakaoLoader } from 'react-kakao-maps-sdk'
import type { RecommendedSpot } from '@/utils/recommendation'
import { getRecommendationReason } from '@/utils/recommendation'
import { estimateTravelMinutes } from '@/utils/geo'
import { kakaoMapDirectionsUrl } from '@/utils/kakaoMapLink'
import { CONGESTION_HEX, CONGESTION_META } from '@/utils/congestion'
import { useNearbyAmenities } from '@/hooks/useNearbyAmenities'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { HeartIcon, ClockIcon, PinIcon } from '@/components/icons'
import { AMENITY_CATEGORY_META } from '@/constants/nearbyAmenities'
import { KAKAO_MAP_KEY } from '@/constants/kakao'
import { spotDetailPath } from '@/constants/routes'

interface TodayRecommendationCardProps {
  recommendation: RecommendedSpot
}

function formatDistanceMeters(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)}km` : `${meters}m`
}

export function TodayRecommendationCard({
  recommendation,
}: TodayRecommendationCardProps) {
  const { spot, congestionLevel, congestionScore, distanceKm } = recommendation
  const reason = getRecommendationReason(congestionLevel, distanceKm !== null)
  const isFavorite = useFavoriteStore((state) => state.isFavorite(spot.id))
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)
  const congestionMeta = CONGESTION_META[congestionLevel]

  const [mapLoading] = useKakaoLoader({
    appkey: KAKAO_MAP_KEY || 'missing-key',
    libraries: ['services'],
  })
  const { data: amenities, isLoading: amenitiesLoading } = useNearbyAmenities(
    spot.coordinates,
    1000,
    Boolean(KAKAO_MAP_KEY) && !mapLoading,
  )
  const nearestParking = amenities?.parking?.[0]
  const nearestRestroom = amenities?.restroom?.[0]

  return (
    <div className="overflow-hidden rounded-3xl shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <Link to={spotDetailPath(spot.id)} className="relative block">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />

        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-sky-600">
          오늘의 추천
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            toggleFavorite(spot.id)
          }}
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600"
        >
          <HeartIcon
            className={`h-4.5 w-4.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>

        <div className="absolute top-1/2 right-24 left-4 -translate-y-1/2 space-y-1.5 text-white">
          <h3 className="text-2xl font-bold drop-shadow-sm">{spot.name}</h3>
          <p className="flex items-center gap-1 text-sm text-white/90">
            <PinIcon className="h-3.5 w-3.5" />
            {spot.regionLabel}
          </p>
          <p className="text-sm text-white/90">{reason}</p>
        </div>

        <div className="absolute top-1/2 right-4 w-20 -translate-y-1/2 rounded-2xl bg-white/95 px-2.5 py-2.5 text-center">
          <p className="text-[11px] text-slate-500">예상 혼잡도</p>
          <p
            className="text-sm font-bold"
            style={{ color: CONGESTION_HEX[congestionLevel] }}
          >
            {congestionMeta.label}
          </p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(congestionScore * 100)}%`,
                backgroundColor: CONGESTION_HEX[congestionLevel],
              }}
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-1 bg-white/90 px-2 py-3 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-0.5 text-center">
            <ClockIcon className="h-4 w-4 text-slate-500" />
            <p className="text-[11px] text-slate-500">예상 이동시간</p>
            <p className="text-xs font-semibold text-slate-900">
              {distanceKm !== null
                ? `${estimateTravelMinutes(distanceKm)}분`
                : '위치 확인 필요'}
            </p>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span aria-hidden className="text-sm leading-none">
              {AMENITY_CATEGORY_META.parking.icon}
            </span>
            <p className="text-[11px] text-slate-500">가까운 주차장</p>
            <p className="text-xs font-semibold text-slate-900">
              {nearestParking
                ? formatDistanceMeters(nearestParking.distanceMeters)
                : amenitiesLoading
                  ? '확인 중'
                  : '정보 없음'}
            </p>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span aria-hidden className="text-sm leading-none">
              {AMENITY_CATEGORY_META.restroom.icon}
            </span>
            <p className="text-[11px] text-slate-500">가까운 화장실</p>
            <p className="text-xs font-semibold text-slate-900">
              {nearestRestroom
                ? formatDistanceMeters(nearestRestroom.distanceMeters)
                : amenitiesLoading
                  ? '확인 중'
                  : '정보 없음'}
            </p>
          </div>
        </div>
      </Link>

      <a
        href={kakaoMapDirectionsUrl(spot.name, spot.coordinates)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 bg-slate-50 py-2.5 text-sm font-medium text-slate-600"
      >
        카카오맵에서 정확한 길찾기 →
      </a>
    </div>
  )
}
