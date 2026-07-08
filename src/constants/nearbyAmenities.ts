export type AmenityCategory = 'convenience' | 'parking' | 'restroom'

interface AmenityCategoryMeta {
  label: string
  icon: string
  markerClass: string
}

export const AMENITY_CATEGORY_META: Record<
  AmenityCategory,
  AmenityCategoryMeta
> = {
  convenience: { label: '편의점', icon: '🏪', markerClass: 'bg-emerald-500' },
  parking: { label: '주차장', icon: '🅿️', markerClass: 'bg-blue-500' },
  restroom: { label: '화장실', icon: '🚻', markerClass: 'bg-amber-500' },
}

export const AMENITY_CATEGORIES: AmenityCategory[] = [
  'convenience',
  'parking',
  'restroom',
]

export interface RadiusOption {
  meters: number
  label: string
}

export const RADIUS_OPTIONS: RadiusOption[] = [
  { meters: 1000, label: '1km' },
  { meters: 2000, label: '2km' },
  { meters: 5000, label: '5km' },
  { meters: 10000, label: '10km' },
]
