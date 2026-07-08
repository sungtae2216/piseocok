import { useCallback, useState } from 'react'
import type { Coordinates } from '@/types/spot'

interface UseMyLocationResult {
  location: Coordinates | null
  accuracy: number | null
  isLocating: boolean
  error: string | null
  locate: () => void
}

export function useMyLocation(
  onLocate?: (coordinates: Coordinates) => void,
): UseMyLocationResult {
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 정보를 지원하지 않아요.')
      return
    }

    setIsLocating(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLocation(coordinates)
        setAccuracy(position.coords.accuracy)
        setIsLocating(false)
        onLocate?.(coordinates)
      },
      () => {
        setError('위치 정보를 가져오지 못했어요. 위치 권한을 확인해주세요.')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
    )
  }, [onLocate])

  return { location, accuracy, isLocating, error, locate }
}
