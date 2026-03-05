import { Link } from 'react-router-dom'
import Card from '../common/Card'
import styles from './LocationCard.module.css'

export default function LocationCard({ location, totalNpcs, discoveredCount }) {
  return (
    <Link to={`/local/${location.id}`} className={styles.link}>
      <Card className={styles.card}>
        <h3 className={styles.name}>{location.name}</h3>
        {location.description && (
          <p className={styles.description}>{location.description}</p>
        )}
        <span className={styles.counter}>
          {discoveredCount}/{totalNpcs} NPCs descobertos
        </span>
      </Card>
    </Link>
  )
}
