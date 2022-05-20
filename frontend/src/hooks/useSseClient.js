import { useEffect, useState } from 'react'
import { init } from '../services/sse'

export const useSseClient = topic => {
  const [sseClient, setSseClient] = useState(undefined)

  useEffect(() => {
    const client = init(topic)
    setSseClient(client)

    return () => client.close()
  }, [topic])

  return sseClient
}
