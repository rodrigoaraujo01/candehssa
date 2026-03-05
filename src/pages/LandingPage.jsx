import Card from '../components/common/Card'
import LoginForm from '../components/auth/LoginForm'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Candeh'ssa</h1>
        <p className={styles.subtitle}>
          Rastreie suas amizades com os habitantes da cidade
        </p>
      </div>
      <Card className={styles.card}>
        <LoginForm />
      </Card>
    </div>
  )
}
