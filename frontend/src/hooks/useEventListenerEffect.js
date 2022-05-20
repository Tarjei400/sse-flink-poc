import { useEffect } from 'react'

export const useEventListenerEffect = (target, type, listener) => useEffect(() => {
  target?.addEventListener?.(type, listener)

  return () => target?.removeEventListener?.(type, listener)
}, [target, type, listener])
