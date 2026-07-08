import type { SpotType } from '@/types/spot'

export const SPOT_TYPE_LABEL: Record<SpotType, string> = {
  beach: '해수욕장',
  valley: '계곡',
  river: '하천·강',
  mountain: '산',
}

export const SPOT_TYPE_MARKER_ICON: Record<SpotType, string> = {
  beach: '🌊',
  valley: '🏞️',
  river: '🏕️',
  mountain: '⛰️',
}

export interface SpotTypeOption {
  code: SpotType | 'all'
  label: string
}

export const SPOT_TYPE_OPTIONS: SpotTypeOption[] = [
  { code: 'all', label: '전체' },
  { code: 'beach', label: SPOT_TYPE_LABEL.beach },
  { code: 'valley', label: SPOT_TYPE_LABEL.valley },
  { code: 'river', label: SPOT_TYPE_LABEL.river },
  { code: 'mountain', label: SPOT_TYPE_LABEL.mountain },
]
