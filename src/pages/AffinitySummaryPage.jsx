import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAffinitySummary } from '../hooks/useAffinitySummary'
import { useConditions } from '../hooks/useConditions'
import { usePlayer } from '../contexts/PlayerContext'
import { CONDITIONS } from '../data/conditions'
import {
  computeConsolidatedEffects,
  formatValue,
  formatChain,
} from '../utils/conditionEffects'
import ConditionSearch from '../components/common/ConditionSearch'
import Loading from '../components/common/Loading'
import styles from './AffinitySummaryPage.module.css'

export default function AffinitySummaryPage() {
  const { affinities, activeNpcIds, loading, toggleActive } = useAffinitySummary()
  const { activeConditions, activeNames, loading: condLoading, addCondition, removeCondition, removeAll } = useConditions()
  const { player, group } = usePlayer()
  const [showPopover, setShowPopover] = useState(false)

  const availableConditions = CONDITIONS.filter(c => !activeNames.includes(c.name))

  if (loading || condLoading) return <Loading />

  const activeAffinity = affinities.find(a => activeNpcIds.has(a.npc?.id))

  const { numeric, qualitative, expansionByCondition } =
    activeConditions.length > 0
      ? computeConsolidatedEffects(activeConditions)
      : { numeric: [], qualitative: [], expansionByCondition: {} }

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

      <div className={styles.conditionsHeader}>
        <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Condições Ativas</h2>
        {activeConditions.length > 0 && (
          <button className={styles.removeAllBtn} onClick={removeAll}>
            Remover todas
          </button>
        )}
      </div>

      <section className={styles.conditionsSection}>
        <div className={styles.conditionsAdd}>
          <ConditionSearch
            conditions={availableConditions}
            onSelect={name => addCondition(name)}
          />
        </div>

        {activeConditions.length === 0 ? (
          <p className={styles.summaryEmpty}>Nenhuma condição ativa.</p>
        ) : (
          <>
            <div className={styles.conditionTags}>
              {activeConditions.map(c => (
                <span key={c.name} className={styles.conditionTag}>
                  {c.name}
                  <button
                    className={styles.removeTagBtn}
                    onClick={() => removeCondition(c.name)}
                    aria-label={`Remover ${c.name}`}
                  >×</button>
                </span>
              ))}
            </div>

            <div className={styles.effectsSummaryHeader}>
              <span className={styles.effectsSummaryLabel}>Efeitos consolidados</span>
              <button
                className={styles.infoBtn}
                onClick={() => setShowPopover(true)}
                aria-label="Ver memória de cálculo"
                title="Memória de cálculo"
              >ⓘ</button>
            </div>

            <ul className={styles.conditionEffects}>
              {numeric.map(entry => (
                <li key={entry.category} className={styles.conditionEffect}>
                  <strong className={styles.effectValue}>{formatValue(entry.total)}</strong>
                  {' '}{entry.category}
                </li>
              ))}
              {qualitative.map(entry => (
                <li key={entry.text} className={styles.conditionEffect}>
                  {entry.text}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Popover — memória de cálculo */}
      {showPopover && (
        <>
          <div
            className={styles.popoverBackdrop}
            onClick={() => setShowPopover(false)}
          />
          <div className={styles.popover} role="dialog" aria-modal="true">
            <div className={styles.popoverHeader}>
              <span className={styles.popoverTitle}>Memória de Cálculo</span>
              <button
                className={styles.popoverClose}
                onClick={() => setShowPopover(false)}
                aria-label="Fechar"
              >×</button>
            </div>

            <div className={styles.popoverBody}>
              {numeric.length > 0 && (
                <section className={styles.popoverSection}>
                  <h3 className={styles.popoverSectionTitle}>Efeitos numéricos</h3>
                  {numeric.map(entry => (
                    <div key={entry.category} className={styles.popoverEntry}>
                      <div className={styles.popoverEntryHeader}>
                        <span className={styles.popoverEntryTotal}>
                          {formatValue(entry.total)} {entry.category}
                        </span>
                      </div>
                      <ul className={styles.popoverComponents}>
                        {entry.components.map((comp, i) => (
                          <li key={i} className={styles.popoverComponent}>
                            <span className={styles.popoverCompValue}>
                              {formatValue(comp.value)}
                            </span>
                            <span className={styles.popoverCompChain}>
                              {formatChain(comp.chain)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {qualitative.length > 0 && (
                <section className={styles.popoverSection}>
                  <h3 className={styles.popoverSectionTitle}>Efeitos qualitativos</h3>
                  <ul className={styles.popoverQualList}>
                    {qualitative.map(entry => (
                      <li key={entry.text} className={styles.popoverQualItem}>
                        <span className={styles.popoverQualText}>{entry.text}</span>
                        <span className={styles.popoverQualSources}>
                          {entry.chains.map(formatChain).join(', ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {Object.keys(expansionByCondition).some(
                k => expansionByCondition[k].some(e => e.chain.length > 1)
              ) && (
                <section className={styles.popoverSection}>
                  <h3 className={styles.popoverSectionTitle}>Expansão de condições</h3>
                  {Object.entries(expansionByCondition).map(([condName, effects]) => {
                    const indirect = effects.filter(e => e.chain.length > 1)
                    if (indirect.length === 0) return null
                    return (
                      <div key={condName} className={styles.popoverExpand}>
                        <div className={styles.popoverExpandName}>{condName}</div>
                        <ul className={styles.popoverComponents}>
                          {indirect.map((e, i) => (
                            <li key={i} className={styles.popoverComponent}>
                              <span className={styles.popoverCompChain}>
                                via {e.chain.slice(1).join(' → ')}
                              </span>
                              <span className={styles.popoverCompEffect}>{e.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </section>
              )}
            </div>
          </div>
        </>
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
