import styles from './AbilityList.module.css'

export default function AbilityList({ abilities, currentPoints }) {
  return (
    <div className={styles.list}>
      <h3 className={styles.title}>Habilidades</h3>
      {abilities.map(ability => {
        const unlocked = currentPoints >= ability.friendship_level
        return (
          <div
            key={ability.id}
            className={`${styles.ability} ${unlocked ? styles.unlocked : styles.locked}`}
          >
            <div className={styles.level}>Nível {ability.friendship_level}</div>
            <div className={styles.info}>
              <span className={styles.name}>{unlocked ? ability.name : '???'}</span>
              {unlocked && ability.description && (
                <p className={styles.description}>{ability.description}</p>
              )}
            </div>
            <span className={styles.status}>
              {unlocked ? '✓' : '🔒'}
            </span>
          </div>
        )
      })}
      {abilities.length === 0 && (
        <p className={styles.empty}>Nenhuma habilidade cadastrada.</p>
      )}
    </div>
  )
}
