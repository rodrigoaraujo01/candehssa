import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import CreateGroupForm from '../components/group/CreateGroupForm'
import JoinGroupForm from '../components/group/JoinGroupForm'
import { usePlayer } from '../contexts/PlayerContext'
import styles from './GroupPage.module.css'

export default function GroupPage() {
  const { createGroup, joinGroup } = usePlayer()
  const navigate = useNavigate()

  async function handleCreate(name, password) {
    const result = await createGroup(name, password)
    if (!result.error) {
      navigate('/mapa', { replace: true })
    }
    return result
  }

  async function handleJoin(name, password) {
    const result = await joinGroup(name, password)
    if (!result.error) {
      navigate('/mapa', { replace: true })
    }
    return result
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Grupo de Aventureiros</h1>
        <p className={styles.subtitle}>
          Crie um novo grupo ou entre em um existente.
        </p>
      </div>
      <div className={styles.cards}>
        <Card>
          <CreateGroupForm onSubmit={handleCreate} />
        </Card>
        <div className={styles.divider}>
          <span>ou</span>
        </div>
        <Card>
          <JoinGroupForm onSubmit={handleJoin} />
        </Card>
      </div>
    </div>
  )
}
