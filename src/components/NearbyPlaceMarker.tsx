import { CustomOverlayMap } from 'react-kakao-maps-sdk'
import type { NearbyPlace } from '@/apis/kakaoPlaces'
import type { AmenityCategory } from '@/constants/nearbyAmenities'
import { AMENITY_CATEGORY_META } from '@/constants/nearbyAmenities'

interface NearbyPlaceMarkerProps {
  place: NearbyPlace
  category: AmenityCategory
}

export function NearbyPlaceMarker({ place, category }: NearbyPlaceMarkerProps) {
  const meta = AMENITY_CATEGORY_META[category]

  return (
    <CustomOverlayMap position={place.coordinates} yAnchor={1}>
      <span
        title={place.name}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs shadow ${meta.markerClass}`}
      >
        {meta.icon}
      </span>
    </CustomOverlayMap>
  )
}
