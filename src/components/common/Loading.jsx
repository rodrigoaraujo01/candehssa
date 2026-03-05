import styles from './Loading.module.css'

export default function Loading({ message = 'Carregando...' }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p className={styles.message}>{message}</p>
    </div>
  )
}
