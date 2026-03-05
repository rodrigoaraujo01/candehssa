import { Link } from 'react-router-dom'
import { useAffinitySummary } from '../hooks/useAffinitySummary'
import Loading from '../components/common/Loading'
import styles from './AffinitySummaryPage.module.css'

export default function AffinitySummaryPage() {
  const { affinities, activeNpcIds, loading, toggleActive } = useAffinitySummary()

  if (loading) return <Loading />

  const activeAffinities = affinities.filter(a => activeNpcIds.has(a.npc?.id))
  const allActiveAbilities = activeAffinities.flatMap(a =>
    a.abilities.map(ab => ({ ...ab, npcName: a.npc.name }))
  )

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Afinidades</h1>

      {affinities.length === 0 ? (
        <p className={styles.empty}>
          Nenhum NPC com afinidade ainda. Explore a cidade e construa relacionamentos!
        </p>
      ) : (
        <>
          <section className={styles.summarySection}>
            <h2 className={styles.sectionTitle}>Benefícios Ativos</h2>
            {allActiveAbilities.length === 0 ? (
              <p className={styles.summaryEmpty}>
                Selecione NPCs como ativos para ver os benefícios disponíveis nesta aventura.
              </p>
            ) : (
              <div className={styles.benefitsList}>
                {allActiveAbilities.map(ab => (
                  <div key={ab.id} className={styles.benefitItem}>
                    <span className={styles.benefitNpc}>{ab.npcName}</span>
                    <span className={styles.benefitName}>{ab.name}</span>
                    {ab.description && (
                      <p className={styles.benefitDesc}>{ab.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

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
                          {isActive ? 'Ativo' : 'Inativo'}
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
        </>
      )}
    </div>
  )
}
