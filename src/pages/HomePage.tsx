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
import { ShareButton } from '@/components/ShareButton'
import { Seo } from '@/components/Seo'
import { ChevronRightIcon, LocateIcon } from '@/components/icons'
import { SITE_URL } from '@/constants/site'

const HOME_PREVIEW_LIMIT = 6
const RANKING_PREVIEW_LIMIT = 3

const THEME_LINKS = [
  { label: '한산한 해수욕장 보기', to: '/quiet-beaches' },
  { label: '한산한 계곡 보기', to: '/quiet-valleys' },
  { label: '서울 근교 피서지 보기', to: '/near-seoul' },
  { label: '아이와 가기 좋은 곳 보기', to: '/family' },
  { label: '주차 편한 곳 보기', to: '/parking-easy' },
  { label: '부산 피서지 보기', to: '/regions/busan' },
  { label: '강원도 피서지 보기', to: '/regions/gangwon' },
  { label: '제주 피서지 보기', to: '/regions/jeju' },
  { label: '덜 붐비는 시간 알아보기', to: '/guide/best-time' },
  { label: '혼잡도 보는 방법', to: '/guide/crowding' },
]

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
      <Seo
        title="한산한 해수욕장·계곡 추천 | 피서지 혼잡도 확인 - 피서콕"
        description="피서콕에서 해수욕장·계곡·하천의 예상 혼잡도, 주차, 날씨, 화장실 정보를 확인하고 지금 가기 좋은 한산한 피서지를 찾아보세요."
        path="/"
      />
      <div className="relative overflow-hidden">
        <HeroOceanBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-white" />

        <div className="relative space-y-4 px-5 pt-[calc(env(safe-area-inset-top)+1.75rem)] pb-9">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-sky-600">피서콕 🌊</span>
            <ShareButton
              title="피서콕"
              text="지금 가기 좋은 피서지를 한눈에 확인하세요"
              url={SITE_URL}
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-[32px] leading-[1.25] font-bold text-slate-900">
              지금 가기 좋은
              <br />
              한산한 피서지를 <span className="text-sky-500">한눈에</span>
            </h1>
            <p className="text-sm text-slate-600">
              피서콕에서 혼잡도·주차·화장실 정보까지 한 번에 확인하세요
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

        {!isSearching && (
          <section className="-mx-5 space-y-2">
            <h2 className="px-5 text-base font-semibold text-slate-900">
              테마별로 둘러보기
            </h2>
            <div className="flex gap-2 overflow-x-auto px-5 pb-1">
              {THEME_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="shrink-0 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

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
