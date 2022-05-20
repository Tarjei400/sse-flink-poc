import styles from './styles.module.css'
import { COLUMNS } from '../../services/board'
import Field from './Field'

const Board = ({ board }) => (
  <div className={styles.board}>
    {[...COLUMNS].map(column =>
      [...COLUMNS].map((_, row) => {
        const position = `${column}${row + 1}`
        return (
          <Field key={position} piece={board[position]} />
        )
      })
    )}
  </div>
)

export default Board
