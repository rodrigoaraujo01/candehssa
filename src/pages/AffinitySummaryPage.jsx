import { Link } from 'react-router-dom'
import { useAffinitySummary } from '../hooks/useAffinitySummary'
import { usePlayer } from '../contexts/PlayerContext'
import Loading from '../components/common/Loading'
import styles from './AffinitySummaryPage.module.css'

export default function AffinitySummaryPage() {
  const { affinities, activeNpcIds, loading, toggleActive } = useAffinitySummary()
  const { player, group } = usePlayer()

  if (loading) return <Loading />

  const activeAffinity = affinities.find(a => activeNpcIds.has(a.npc?.id))

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Personagem</h1>

      {player && (
        <div className={styles.characterCard}>
          <div className={styles.characterName}>{player.name}</div>
          <div className={styles.characterMeta}>
            {player.race && <span className={styles.metaItem}>{player.race}</span>}
            {player.level && <span className={styles.metaItem}>Nível {player.level}</span>}
            {group && <span className={styles.metaItem}>{group.name}</span>}
          </div>
        </div>
      )}

      <h2 className={styles.sectionTitle}>Benefícios Ativos</h2>

      <section className={`${styles.summarySection} ${activeAffinity ? styles.summarySectionActive : ''}`}>
        {!activeAffinity ? (
          <p className={styles.summaryEmpty}>
            Selecione um NPC como ativo para ver os benefícios disponíveis nesta aventura.
          </p>
        ) : (
          <>
            <div className={styles.activeNpcHeader}>
              <Link to={`/npc/${activeAffinity.npc.id}`} className={styles.activeNpcName}>
                {activeAffinity.npc.name}
              </Link>
              <span className={styles.points}>{activeAffinity.points}/7</span>
            </div>
            {activeAffinity.abilities.length > 0 ? (
              <div className={styles.benefitsList}>
                {activeAffinity.abilities.map(ab => (
                  <div key={ab.id} className={styles.benefitItem}>
                    <div className={styles.benefitHeader}>
                      <span className={styles.benefitName}>{ab.name}</span>
                      <span className={styles.abilityLevel}>Nv.{ab.friendship_level}</span>
                    </div>
                    {ab.description && (
                      <p className={styles.benefitDesc}>{ab.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.summaryEmpty}>Nenhuma habilidade desbloqueada ainda.</p>
            )}
          </>
        )}
      </section>

      {affinities.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>NPCs com Afinidade</h2>
          <div className={styles.npcList}>
            {affinities.map(({ npc, points, abilities }) => {
              const isActive = activeNpcIds.has(npc?.id)
              return (
                <div
                  key={npc?.id}
                  className={`${styles.npcCard} ${isActive ? styles.activeCard : ''}`}
                >
                  <div className={styles.npcHeader}>
                    <Link to={`/npc/${npc?.id}`} className={styles.npcName}>
                      {npc?.name}
                    </Link>
                    <div className={styles.npcMeta}>
                      <span className={styles.points}>{points}/7</span>
                      <button
                        className={`${styles.toggleBtn} ${isActive ? styles.activeBtn : ''}`}
                        onClick={() => toggleActive(npc?.id)}
                      >
                        {isActive ? 'Ativo' : 'Ativar'}
                      </button>
                    </div>
                  </div>

                  {abilities.length > 0 ? (
                    <ul className={styles.abilityList}>
                      {abilities.map(ab => (
                        <li key={ab.id} className={styles.abilityItem}>
                          <span className={styles.abilityLevel}>Nv.{ab.friendship_level}</span>
                          <span className={styles.abilityName}>{ab.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.noAbilities}>
                      Nenhuma habilidade desbloqueada ainda.
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
