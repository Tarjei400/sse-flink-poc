import styles from './styles.module.css'
import clsx from 'clsx'

const Field = ({ piece }) => (
  <div
    className={clsx(piece && styles.active, styles.field)}
  />
)

export default Field
