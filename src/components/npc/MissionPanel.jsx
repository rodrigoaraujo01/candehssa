import { useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import styles from './MissionPanel.module.css'

export default function MissionPanel({ npc, completed, onComplete }) {
  const [loading, setLoading] = useState(false)

  if (!npc.final_mission_title) return null

  async function handleComplete() {
    setLoading(true)
    await onComplete()
    setLoading(false)
  }

  return (
    <Card className={`${styles.panel} ${completed ? styles.completed : ''}`}>
      <div className={styles.header}>
        <span className={styles.badge}>Missão Especial</span>
        {completed && <span className={styles.completedBadge}>Completa</span>}
      </div>
      <h3 className={styles.title}>{npc.final_mission_title}</h3>
      {npc.final_mission_description && (
        <p className={styles.description}>{npc.final_mission_description}</p>
      )}
      {!completed && (
        <Button onClick={handleComplete} loading={loading}>
          Marcar como completa
        </Button>
      )}
    </Card>
  )
}
