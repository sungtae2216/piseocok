import { useEffect, useState } from 'react'

export type GeolocationPermissionState =
  'granted' | 'denied' | 'prompt' | 'unsupported'

function getInitialState(): GeolocationPermissionState {
  if (typeof navigator === 'undefined' || !navigator.permissions) {
    return 'unsupported'
  }
  return 'prompt'
}

export function useGeolocationPermission(): GeolocationPermissionState {
  const [state, setState] =
    useState<GeolocationPermissionState>(getInitialState)

  useEffect(() => {
    if (!navigator.permissions) return

    let status: PermissionStatus | null = null
    const handleChange = () => {
      if (status) setState(status.state as GeolocationPermissionState)
    }

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result) => {
        status = result
        setState(result.state as GeolocationPermissionState)
        result.addEventListener('change', handleChange)
      })
      .catch(() => setState('unsupported'))

    return () => {
      status?.removeEventListener('change', handleChange)
    }
  }, [])

  return state
}
