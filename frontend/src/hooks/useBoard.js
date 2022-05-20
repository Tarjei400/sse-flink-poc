import { useSseClient } from './useSseClient'
import { BOARD_TOPIC, EVENTS, move } from '../services/board'
import { useCallback, useState } from 'react'
import { useSseEventListenerEffect } from './useSseEventListenerEffect'

export const useBoard = () => {
  const sseClient = useSseClient(BOARD_TOPIC)

  const [board, setBoard] = useState({})
  const moveEventHandler = useCallback(movePayload => {
    const { from, to, piece } = movePayload
    setBoard(oldBoard => move(from, to, piece)(oldBoard))
  }, [])

  useSseEventListenerEffect(sseClient, EVENTS.MOVE, moveEventHandler)

  return board
}
