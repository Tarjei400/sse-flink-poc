import { compose } from 'ramda'

export const COLUMNS = 'ABCDEFGH'
export const BOARD_TOPIC = 'board'
export const EVENTS = {
  MOVE: 'move',
}

const setFieldPiece = (position, piece) => board => ({
  ...board,
  [position]: piece,
})

export const move = (fromPosition, toPosition, piece = 1) => compose(
  setFieldPiece(fromPosition, 0),
  setFieldPiece(toPosition, piece)
)

