import { useMemo, useState } from 'react'
import {
  Circle,
  CustomOverlayMap,
  Map,
  useKakaoLoader,
} from 'react-kakao-maps-sdk'
import type { Coordinates, Spot, SpotType } from '@/types/spot'
import { useSpots } from '@/hooks/useSpots'
import { useMyLocation } from '@/hooks/useMyLocation'
import { SpotMapMarker } from '@/components/SpotMapMarker'
import { SpotDetailSheet } from '@/components/SpotDetailSheet'
import { FilterChips } from '@/components/FilterChips'
import { SPOT_TYPE_OPTIONS } from '@/constants/spotTypes'
import { KAKAO_MAP_KEY } from '@/constants/kakao'
import { LocateIcon, MapIcon } from '@/components/icons'
import { Seo } from '@/components/Seo'
import { ROUTES } from '@/constants/routes'

const KOREA_CENTER: Coordinates = { lat: 36.4, lng: 127.9 }
const KOREA_OVERVIEW_LEVEL = 13
const SPOT_ZOOM_LEVEL = 4
const MY_LOCATION_ZOOM_LEVEL = 6

export function MapPage() {
  const hasKakaoKey = Boolean(KAKAO_MAP_KEY)
  const [loading, loadError] = useKakaoLoader({
    appkey: KAKAO_MAP_KEY || 'missing-key',
    libraries: ['services'],
  })

  const { data: spots } = useSpots({})

  const [selectedType, setSelectedType] = useState<SpotType | 'all'>('all')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  const [mapCenter, setMapCenter] = useState<Coordinates>(KOREA_CENTER)
  const [mapLevel, setMapLevel] = useState(KOREA_OVERVIEW_LEVEL)

  const {
    location,
    accuracy,
    isLocating,
    error: locationError,
    locate,
  } = useMyLocation((coordinates) => {
    setMapCenter(coordinates)
    setMapLevel(MY_LOCATION_ZOOM_LEVEL)
  })

  const visibleSpots = useMemo(
    () =>
      (spots ?? []).filter(
        (spot) => selectedType === 'all' || spot.type === selectedType,
      ),
    [spots, selectedType],
  )

  const handleSelectSpot = (spot: Spot) => {
    setSelectedSpot(spot)
    setMapCenter(spot.coordinates)
    setMapLevel(SPOT_ZOOM_LEVEL)
  }

  if (!hasKakaoKey) {
    return (
      <div className="flex h-[calc(100dvh-64px)] flex-col items-center justify-center gap-3 px-6 text-center">
        <MapIcon className="h-10 w-10 text-slate-300" />
        <h1 className="text-lg font-semibold text-slate-900">
          지도 API 키가 필요해요
        </h1>
        <p className="text-sm text-slate-500">
          .env 파일에 VITE_KAKAO_MAP_KEY 값을 설정하면
          <br />
          지도가 표시돼요.
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex h-[calc(100dvh-64px)] flex-col items-center justify-center gap-3 px-6 text-center">
        <MapIcon className="h-10 w-10 text-slate-300" />
        <h1 className="text-lg font-semibold text-slate-900">
          지도를 불러오지 못했어요
        </h1>
        <p className="text-sm text-slate-500">
          API 키와 등록된 도메인(카카오 개발자 콘솔 → Web 플랫폼)을
          확인해주세요.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100dvh-64px)] items-center justify-center">
        <p className="text-sm text-slate-400">지도를 불러오는 중이에요…</p>
      </div>
    )
  }

  return (
    <div className="relative h-[calc(100dvh-64px)]">
      <Seo
        title="피서지 지도 | 내 주변 해수욕장·계곡 찾기 - 피서콕"
        description="카카오맵으로 내 주변 해수욕장·계곡 위치와 예상 혼잡도를 한눈에 확인하세요."
        path={ROUTES.MAP}
      />
      <div className="absolute top-[calc(env(safe-area-inset-top)+0.75rem)] right-3 left-3 z-10">
        <FilterChips
          options={SPOT_TYPE_OPTIONS}
          selected={selectedType}
          onSelect={setSelectedType}
        />
      </div>

      <Map
        center={mapCenter}
        level={mapLevel}
        isPanto
        className="h-full w-full"
        onClick={() => setSelectedSpot(null)}
      >
        {visibleSpots.map((spot) => (
          <SpotMapMarker
            key={spot.id}
            spot={spot}
            isSelected={selectedSpot?.id === spot.id}
            onSelect={handleSelectSpot}
          />
        ))}

        {location && (
          <>
            {accuracy && (
              <Circle
                center={location}
                radius={accuracy}
                strokeWeight={1}
                strokeColor="#0ea5e9"
                strokeOpacity={0.6}
                fillColor="#0ea5e9"
                fillOpacity={0.12}
              />
            )}
            <CustomOverlayMap position={location} zIndex={5}>
              <span className="block h-3.5 w-3.5 rounded-full border-2 border-white bg-sky-500 shadow-md" />
            </CustomOverlayMap>
          </>
        )}
      </Map>

      <button
        type="button"
        onClick={locate}
        disabled={isLocating}
        className="absolute right-4 bottom-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-500 shadow-lg disabled:opacity-60"
        aria-label="내 위치로 이동"
      >
        <LocateIcon className="h-5 w-5" />
      </button>

      {location && accuracy && (
        <p className="absolute bottom-4 left-4 z-10 max-w-[220px] rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs text-white">
          위치 정확도 약 {Math.round(accuracy)}m
          {accuracy > 100 && ' · PC는 Wi-Fi 기반 위치라 오차가 클 수 있어요'}
        </p>
      )}

      {locationError && (
        <p className="absolute right-4 bottom-[72px] z-10 max-w-[200px] rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs text-white">
          {locationError}
        </p>
      )}

      {selectedSpot && (
        <SpotDetailSheet
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </div>
  )
}
