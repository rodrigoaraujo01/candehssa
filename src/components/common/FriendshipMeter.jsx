import styles from './FriendshipMeter.module.css'

export default function FriendshipMeter({ points, onUpdate }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Pontos de Amizade</span>
      <div className={styles.meter}>
        {Array.from({ length: 7 }, (_, i) => {
          const level = i + 1
          const filled = level <= points
          return (
            <button
              key={level}
              className={`${styles.dot} ${filled ? styles.filled : styles.empty}`}
              onClick={() => onUpdate(filled ? level - 1 : level)}
              title={filled ? `Remover ponto ${level}` : `Adicionar ponto ${level}`}
              aria-label={`Ponto ${level}: ${filled ? 'preenchido' : 'vazio'}`}
            />
          )
        })}
      </div>
      <span className={styles.count}>{points}/7</span>
    </div>
  )
}
