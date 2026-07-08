import type { RegionCode } from '@/types/spot'

export interface Region {
  code: RegionCode | 'all'
  label: string
}

export const REGIONS: Region[] = [
  { code: 'all', label: '전체' },
  { code: 'seoul-incheon-gyeonggi', label: '수도권' },
  { code: 'gangwon', label: '강원' },
  { code: 'chungcheong', label: '충청' },
  { code: 'jeolla', label: '전라' },
  { code: 'gyeongsang', label: '경상' },
  { code: 'jeju', label: '제주' },
]
