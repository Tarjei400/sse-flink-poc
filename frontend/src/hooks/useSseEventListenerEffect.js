import { useCallback } from 'react'
import { useEventListenerEffect } from './useEventListenerEffect'

export const useSseEventListenerEffect = (sseClient, event, listener) => {
  const eventListener = useCallback(
    ({ data }) => listener(JSON.parse(data)),
    [listener],
  )

  useEventListenerEffect(sseClient, event, eventListener)
}
