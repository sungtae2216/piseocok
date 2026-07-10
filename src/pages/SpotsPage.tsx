import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { RegionCode, SpotType } from '@/types/spot'
import { REGIONS } from '@/constants/regions'
import { SPOT_TYPE_OPTIONS } from '@/constants/spotTypes'
import { FilterChips } from '@/components/FilterChips'
import { FilteredSpotList } from '@/components/FilteredSpotList'
import { ArrowLeftIcon } from '@/components/icons'
import { Seo } from '@/components/Seo'
import { ROUTES } from '@/constants/routes'

const PAGE_SIZE = 20

export function SpotsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [selectedRegion, setSelectedRegion] = useState<RegionCode | 'all'>(
    (searchParams.get('region') as RegionCode | null) ?? 'all',
  )
  const [selectedType, setSelectedType] = useState<SpotType | 'all'>(
    (searchParams.get('type') as SpotType | null) ?? 'all',
  )

  return (
    <div className="space-y-4 px-5 pt-[calc(env(safe-area-inset-top)+2rem)] pb-8">
      <Seo
        title="전체 피서지 목록 | 해수욕장·계곡·하천·산 - 피서콕"
        description="지역과 유형별로 필터링해 전국 해수욕장·계곡·하천·산 피서지를 한눈에 둘러보세요."
        path={ROUTES.SPOTS}
      />
      <header className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">전체 여행지</h1>
      </header>

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

      <FilteredSpotList
        key={`${selectedRegion}-${selectedType}`}
        filter={{ regionCode: selectedRegion, type: selectedType }}
        pageSize={PAGE_SIZE}
      />
    </div>
  )
}
