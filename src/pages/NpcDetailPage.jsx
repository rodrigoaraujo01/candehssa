import { useParams, Link } from 'react-router-dom'
import { useNpcDetail } from '../hooks/useNpcDetail'
import { useFriendship } from '../hooks/useFriendship'
import FriendshipMeter from '../components/common/FriendshipMeter'
import AbilityList from '../components/npc/AbilityList'
import MissionPanel from '../components/npc/MissionPanel'
import Loading from '../components/common/Loading'
import styles from './NpcDetailPage.module.css'

export default function NpcDetailPage() {
  const { id } = useParams()
  const { npc, abilities, loading: npcLoading } = useNpcDetail(id)
  const { points, missionCompleted, loading: fpLoading, updatePoints, completeMission } = useFriendship(id)

  if (npcLoading || fpLoading) return <Loading />
  if (!npc) return <p>NPC não encontrado.</p>

  return (
    <div>
      {npc.locations && (
        <Link to={`/local/${npc.location_id}`} className={styles.back}>
          &larr; {npc.locations.name}
        </Link>
      )}

      <h1 className={styles.name}>{npc.name}</h1>
      {npc.description && (
        <p className={styles.description}>{npc.description}</p>
      )}

      <div className={styles.meterSection}>
        <FriendshipMeter points={points} onUpdate={updatePoints} />
      </div>

      <div className={styles.section}>
        <AbilityList abilities={abilities} currentPoints={points} />
      </div>

      {points >= 7 && (
        <div className={styles.section}>
          <MissionPanel
            npc={npc}
            completed={missionCompleted}
            onComplete={completeMission}
          />
        </div>
      )}
    </div>
  )
}
