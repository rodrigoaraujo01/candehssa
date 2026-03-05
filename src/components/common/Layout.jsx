import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/personagem" className={styles.brand}>Candeh'ssa</Link>
        <nav className={styles.nav}>
          <Link to="/personagem" className={styles.navLink}>Personagem</Link>
          <Link to="/mapa" className={styles.navLink}>Mapa</Link>
        </nav>
        <button onClick={handleSignOut} className={styles.logout}>
          Sair
        </button>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
