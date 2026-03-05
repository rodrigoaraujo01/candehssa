import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import CharacterForm from '../components/character/CharacterForm'
import { usePlayer } from '../contexts/PlayerContext'
import styles from './CreateCharacterPage.module.css'

export default function CreateCharacterPage() {
  const { createPlayer } = usePlayer()
  const navigate = useNavigate()

  async function handleCreate(data) {
    const result = await createPlayer(data)
    if (!result.error) {
      navigate('/grupo', { replace: true })
    }
    return result
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Criar Personagem</h1>
        <p className={styles.subtitle}>
          Registre seu personagem para começar a aventura em Candeh'ssa.
        </p>
      </div>
      <Card className={styles.card}>
        <CharacterForm onSubmit={handleCreate} />
      </Card>
    </div>
  )
}
