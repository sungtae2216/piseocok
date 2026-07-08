import { CustomOverlayMap } from 'react-kakao-maps-sdk'
import type { Spot } from '@/types/spot'
import { CONGESTION_META, estimateCongestion } from '@/utils/congestion'
import { SPOT_TYPE_MARKER_ICON } from '@/constants/spotTypes'

interface SpotMapMarkerProps {
  spot: Spot
  isSelected: boolean
  onSelect: (spot: Spot) => void
}

export function SpotMapMarker({
  spot,
  isSelected,
  onSelect,
}: SpotMapMarkerProps) {
  const dotClass = CONGESTION_META[estimateCongestion(spot)].dotClass

  return (
    <CustomOverlayMap position={spot.coordinates} clickable yAnchor={1}>
      <button
        type="button"
        onClick={() => onSelect(spot)}
        className={`flex -translate-y-1 flex-col items-center gap-0.5 ${
          isSelected ? 'scale-110' : ''
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm shadow-md ${dotClass} ${
            isSelected ? 'ring-2 ring-sky-500' : ''
          }`}
        >
          {SPOT_TYPE_MARKER_ICON[spot.type]}
        </span>
        <span className={`-mt-1.5 h-2 w-2 rotate-45 ${dotClass}`} />
      </button>
    </CustomOverlayMap>
  )
}
