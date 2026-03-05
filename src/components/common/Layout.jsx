import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { usePlayer } from '../../contexts/PlayerContext'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  const { signOut } = useAuth()
  const { player, group } = usePlayer()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/mapa" className={styles.brand}>Candeh'ssa</Link>
        <div className={styles.info}>
          {player && (
            <span className={styles.playerName}>{player.name}</span>
          )}
          {group && (
            <span className={styles.groupName}>{group.name}</span>
          )}
          <button onClick={handleSignOut} className={styles.logout}>
            Sair
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
