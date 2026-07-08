import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { RegionCode, SpotType } from '@/types/spot'
import { REGIONS } from '@/constants/regions'
import { SPOT_TYPE_OPTIONS } from '@/constants/spotTypes'
import { ROUTES, spotsPath } from '@/constants/routes'
import { useSpots } from '@/hooks/useSpots'
import { useMyLocation } from '@/hooks/useMyLocation'
import { pickRecommendedSpot } from '@/utils/recommendation'
import { SearchBar } from '@/components/SearchBar'
import { SearchResultList } from '@/components/SearchResultList'
import { TodayRecommendationCard } from '@/components/TodayRecommendationCard'
import { CongestionRankingList } from '@/components/CongestionRankingList'
import { PopularSpotList } from '@/components/PopularSpotList'
import { FilterChips } from '@/components/FilterChips'
import { FilteredSpotList } from '@/components/FilteredSpotList'
import { HeroOceanBackground } from '@/components/HeroOceanBackground'
import { ChevronRightIcon, LocateIcon } from '@/components/icons'

const HOME_PREVIEW_LIMIT = 6
const RANKING_PREVIEW_LIMIT = 3

export function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionCode | 'all'>(
    'all',
  )
  const [selectedType, setSelectedType] = useState<SpotType | 'all'>('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  const isSearching = searchKeyword.trim().length > 0

  const { data: spots } = useSpots({})
  const {
    location: myLocation,
    isLocating,
    error: locationError,
    locate,
  } = useMyLocation()

  const recommendation = useMemo(
    () => (spots ? pickRecommendedSpot(spots, myLocation) : null),
    [spots, myLocation],
  )

  return (
    <div className="pb-8">
      <div className="relative overflow-hidden">
        <HeroOceanBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-white" />

        <div className="relative space-y-4 px-5 pt-[calc(env(safe-area-inset-top)+1.75rem)] pb-9">
          <span className="text-xl font-bold text-sky-600">피서콕 🌊</span>

          <div className="space-y-2">
            <h1 className="text-[32px] leading-[1.25] font-bold text-slate-900">
              지금 가기 좋은
              <br />
              피서지를 <span className="text-sky-500">한눈에</span>
            </h1>
            <p className="text-sm text-slate-600">
              혼잡도·주차·화장실 정보까지 한 번에 확인하세요
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-4 space-y-8 px-5">
        <div className="space-y-2.5">
          <SearchBar onSearch={setSearchKeyword} />
          {!isSearching && (
            <>
              <button
                type="button"
                onClick={locate}
                disabled={isLocating}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-50 py-3.5 text-sm font-semibold text-sky-600 transition-colors disabled:opacity-60"
              >
                <LocateIcon className="h-4 w-4" />
                {isLocating ? '위치 확인 중…' : '내 주변 한산한 피서지 찾기'}
                <ChevronRightIcon className="h-4 w-4" />
              </button>
              {locationError && (
                <p className="text-xs text-rose-500">{locationError}</p>
              )}
            </>
          )}
        </div>

        {isSearching ? (
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              {`'${searchKeyword}'`} 검색 결과
            </h2>
            <SearchResultList keyword={searchKeyword} />
          </section>
        ) : (
          <>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                오늘의 추천 피서지
              </h2>
              {recommendation ? (
                <TodayRecommendationCard recommendation={recommendation} />
              ) : (
                <div className="h-72 animate-pulse rounded-3xl bg-slate-100" />
              )}
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">
                  혼잡도 TOP3
                </h2>
                <Link
                  to={ROUTES.RANKING}
                  className="flex items-center text-sm font-medium text-sky-500"
                >
                  더보기
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <CongestionRankingList
                limit={RANKING_PREVIEW_LIMIT}
                variant="grid"
              />
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">
                  인기 피서지
                </h2>
                <Link
                  to={ROUTES.SPOTS}
                  className="flex items-center text-sm font-medium text-sky-500"
                >
                  더보기
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <PopularSpotList />
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                지역별 보기
              </h2>
              <div className="space-y-2">
                <FilterChips
                  options={SPOT_TYPE_OPTIONS}
                  selected={selectedType}
                  onSelect={setSelectedType}
                />
                <FilterChips
                  options={REGIONS}
                  selected={selectedRegion}
                  onSelect={setSelectedRegion}
                />
              </div>
              <FilteredSpotList
                filter={{ regionCode: selectedRegion, type: selectedType }}
                limit={HOME_PREVIEW_LIMIT}
              />
              <Link
                to={spotsPath({
                  region: selectedRegion,
                  type: selectedType,
                })}
                className="flex items-center justify-center gap-1 rounded-2xl bg-slate-50 py-3 text-sm font-medium text-slate-600"
              >
                전체 여행지 더보기
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
