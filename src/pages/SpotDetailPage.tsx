import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Circle, Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { useSpot } from '@/hooks/useSpots'
import { useNearbyAmenities } from '@/hooks/useNearbyAmenities'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { CongestionBadge } from '@/components/CongestionBadge'
import { CongestionLegend } from '@/components/CongestionLegend'
import { NearbyPlaceMarker } from '@/components/NearbyPlaceMarker'
import { ArrowLeftIcon, HeartIcon, StarIcon } from '@/components/icons'
import { SPOT_TYPE_LABEL } from '@/constants/spotTypes'
import { KAKAO_MAP_KEY } from '@/constants/kakao'
import {
  AMENITY_CATEGORIES,
  AMENITY_CATEGORY_META,
  RADIUS_OPTIONS,
} from '@/constants/nearbyAmenities'
import type { AmenityCategory } from '@/constants/nearbyAmenities'
import type { Coordinates } from '@/types/spot'
import {
  CONGESTION_HEX,
  CONGESTION_META,
  estimateCongestion,
} from '@/utils/congestion'
import { kakaoMapDirectionsUrl } from '@/utils/kakaoMapLink'
import { naverSearchUrl } from '@/utils/naverSearchLink'

const PLACES_PER_CATEGORY_ON_MAP = 5

const RADIUS_ZOOM_LEVEL: Record<number, number> = {
  1000: 4,
  2000: 5,
  5000: 7,
  10000: 8,
}

export function SpotDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: spot, isLoading } = useSpot(id)
  const isFavorite = useFavoriteStore((state) => state.isFavorite(id))
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)
  const [mapLoading] = useKakaoLoader({
    appkey: KAKAO_MAP_KEY || 'missing-key',
    libraries: ['services'],
  })
  const [visibleCategories, setVisibleCategories] =
    useState<AmenityCategory[]>(AMENITY_CATEGORIES)
  const [showCongestionZone, setShowCongestionZone] = useState(true)
  const [panCenter, setPanCenter] = useState<Coordinates | null>(null)
  const [searchRadius, setSearchRadius] = useState(RADIUS_OPTIONS[0].meters)

  const searchCenter = panCenter ?? spot?.coordinates ?? { lat: 0, lng: 0 }
  const amenitiesEnabled =
    Boolean(spot) && Boolean(KAKAO_MAP_KEY) && !mapLoading
  const {
    data: amenities,
    isLoading: amenitiesLoading,
    isError: amenitiesError,
  } = useNearbyAmenities(searchCenter, searchRadius, amenitiesEnabled)

  const toggleCategory = (category: AmenityCategory) => {
    setVisibleCategories((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    )
  }

  const handleMapIdle = (map: kakao.maps.Map) => {
    const center = map.getCenter()
    setPanCenter({ lat: center.getLat(), lng: center.getLng() })
  }

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="text-sm text-slate-400">불러오는 중이에요…</p>
      </div>
    )
  }

  if (!spot) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-slate-500">존재하지 않는 여행지예요.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-sky-500"
        >
          돌아가기
        </button>
      </div>
    )
  }

  const congestionLevel = estimateCongestion(spot)
  const currentRadiusLabel =
    RADIUS_OPTIONS.find((option) => option.meters === searchRadius)?.label ??
    `${searchRadius}m`

  return (
    <div className="min-h-dvh pb-8">
      <div className="relative">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="h-56 w-full object-cover"
        />
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="absolute top-[calc(env(safe-area-inset-top)+0.75rem)] left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(spot.id)}
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          className="absolute top-[calc(env(safe-area-inset-top)+0.75rem)] right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm"
        >
          <HeartIcon
            className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>
      </div>

      <div className="space-y-5 px-4 pt-5">
        <header className="space-y-1">
          <p className="text-xs font-medium text-sky-500">
            {SPOT_TYPE_LABEL[spot.type]}
          </p>
          <h1 className="text-xl font-bold text-slate-900">{spot.name}</h1>
          <p className="text-sm text-slate-500">{spot.address}</p>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          <CongestionBadge level={congestionLevel} />
          <span className="flex items-center gap-1 text-sm text-slate-600">
            <StarIcon className="h-3.5 w-3.5 text-amber-400" />
            {spot.rating.toFixed(1)}
            <span className="text-slate-400">
              ({spot.reviewCount.toLocaleString()})
            </span>
          </span>
          <span className="text-sm text-slate-600">
            현재 기온 {spot.temperature}°C
          </span>
        </div>
        <p className="text-xs text-slate-400">
          예상 혼잡도는 평소 인기도와 현재 시간대를 기반으로 추정한 값이에요.
          실시간 재실 인원 데이터는 아니에요.
        </p>

        <p className="text-sm leading-relaxed text-slate-700">
          {spot.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {spot.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">편의시설</h2>
          <div className="flex flex-wrap gap-1.5">
            {spot.amenities.map((amenity) => (
              <span
                key={amenity}
                className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs text-sky-600"
              >
                {amenity}
              </span>
            ))}
          </div>
        </section>

        <a
          href={kakaoMapDirectionsUrl(spot.name, spot.coordinates)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-sm font-medium text-slate-600"
        >
          카카오맵에서 정확한 길찾기 →
        </a>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={naverSearchUrl(spot.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#03C75A]/10 py-2.5 text-sm font-medium text-[#03C75A]"
          >
            네이버에서 보기
          </a>
          <a
            href={naverSearchUrl(`${spot.name} 맛집`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-50 py-2.5 text-sm font-medium text-orange-600"
          >
            🍴 {spot.name} 맛집
          </a>
        </div>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              주변 편의시설
            </h2>
            <span className="text-xs text-slate-400">
              지도를 움직이면 그 위치 기준으로 다시 검색돼요
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {RADIUS_OPTIONS.map((option) => (
              <button
                key={option.meters}
                type="button"
                onClick={() => setSearchRadius(option.meters)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  searchRadius === option.meters
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setShowCongestionZone((v) => !v)}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                showCongestionZone
                  ? CONGESTION_META[congestionLevel].badgeClass
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${CONGESTION_META[congestionLevel].dotClass}`}
              />
              예상 혼잡구역
            </button>
            {AMENITY_CATEGORIES.map((category) => {
              const meta = AMENITY_CATEGORY_META[category]
              const active = visibleCategories.includes(category)
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? `${meta.markerClass} text-white`
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span>{meta.icon}</span>
                  {meta.label}
                </button>
              )
            })}
          </div>

          <div className="h-56 w-full overflow-hidden rounded-2xl bg-slate-100">
            {KAKAO_MAP_KEY && !mapLoading && (
              <Map
                center={spot.coordinates}
                level={RADIUS_ZOOM_LEVEL[searchRadius]}
                className="h-full w-full"
                onIdle={handleMapIdle}
              >
                {showCongestionZone ? (
                  <Circle
                    center={searchCenter}
                    radius={searchRadius}
                    strokeWeight={1}
                    strokeColor={CONGESTION_HEX[congestionLevel]}
                    strokeOpacity={0.7}
                    fillColor={CONGESTION_HEX[congestionLevel]}
                    fillOpacity={0.18}
                  />
                ) : (
                  <Circle
                    center={searchCenter}
                    radius={searchRadius}
                    strokeWeight={1}
                    strokeColor="#64748b"
                    strokeOpacity={0.5}
                    strokeStyle="shortdash"
                    fillOpacity={0}
                  />
                )}
                <MapMarker position={spot.coordinates} />
                {visibleCategories.flatMap((category) =>
                  (amenities?.[category] ?? [])
                    .slice(0, PLACES_PER_CATEGORY_ON_MAP)
                    .map((place) => (
                      <NearbyPlaceMarker
                        key={place.id}
                        place={place}
                        category={category}
                      />
                    )),
                )}
              </Map>
            )}
          </div>

          {showCongestionZone && (
            <div className="space-y-1">
              <CongestionLegend />
              <p className="text-xs text-slate-400">
                색이 진할수록 예상 혼잡도가 높다는 뜻이에요. 실제 인원 센서
                데이터가 아니라 평소 인기도와 현재 시간대 기반 추정치예요.
              </p>
            </div>
          )}

          {amenitiesLoading ? (
            <p className="text-xs text-slate-400">주변 시설을 찾는 중이에요…</p>
          ) : amenitiesError ? (
            <p className="text-xs text-slate-400">
              주변 시설 정보를 불러오지 못했어요.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {AMENITY_CATEGORIES.map((category) => {
                const nearest = amenities?.[category]?.[0]
                const meta = AMENITY_CATEGORY_META[category]
                return (
                  <li
                    key={category}
                    className="flex items-center justify-between gap-2 text-xs text-slate-600"
                  >
                    <span className="flex shrink-0 items-center gap-1">
                      <span>{meta.icon}</span>
                      {meta.label}
                    </span>
                    {nearest ? (
                      <span className="truncate text-slate-500">
                        {nearest.name} · {nearest.distanceMeters}m
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        반경 {currentRadiusLabel} 이내 없음
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
