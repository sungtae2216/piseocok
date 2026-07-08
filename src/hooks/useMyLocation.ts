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

    if (!window.isSecureContext) {
      setError(
        '위치 정보는 HTTPS 주소에서만 사용할 수 있어요. localhost나 실제 배포 주소(https://piseocok.vercel.app)로 접속해주세요.',
      )
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
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? '위치 권한이 꺼져 있어요. 브라우저 설정에서 위치 권한을 허용해주세요.'
            : err.code === err.TIMEOUT
              ? '위치를 확인하는 데 시간이 너무 오래 걸렸어요. 다시 시도해주세요.'
              : '위치 정보를 가져오지 못했어요. GPS나 네트워크 상태를 확인해주세요.'
        setError(message)
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
    )
  }, [onLocate])

  return { location, accuracy, isLocating, error, locate }
}
