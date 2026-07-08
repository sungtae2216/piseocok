/**
 * 실제 실시간 재실 인원 데이터가 아닌, 평소 인기도를 나타내는 값이에요.
 * 화면에 표시되는 "예상 혼잡도"는 이 값과 현재 시간대를 함께 계산해서 추정해요.
 */
export type CongestionLevel = 'low' | 'medium' | 'high' | 'severe'

export type SpotType = 'beach' | 'valley' | 'river' | 'mountain'

export type RegionCode =
  | 'seoul-incheon-gyeonggi'
  | 'gangwon'
  | 'chungcheong'
  | 'jeolla'
  | 'gyeongsang'
  | 'jeju'

export interface Coordinates {
  lat: number
  lng: number
}

export interface Spot {
  id: string
  name: string
  type: SpotType
  regionCode: RegionCode
  regionLabel: string
  address: string
  description: string
  amenities: string[]
  coordinates: Coordinates
  basePopularity: CongestionLevel
  rating: number
  reviewCount: number
  temperature: number
  tags: string[]
  imageUrl: string
}
