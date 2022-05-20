import { useBoard } from '../hooks/useBoard'
import BoardComponent from '../components/Board'

const Board = () => {
  const board = useBoard()

  return <BoardComponent board={board}/>
}

export default Board
