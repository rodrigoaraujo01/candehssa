import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useNpcs } from '../hooks/useNpcs'
import { useDiscoveredNpcs } from '../hooks/useDiscoveredNpcs'
import { usePlayer } from '../contexts/PlayerContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'
import styles from './LocationDetailPage.module.css'

export default function LocationDetailPage() {
  const { id } = useParams()
  const { npcs, loading: npcsLoading } = useNpcs(id)
  const { discoveredIds, discoverNpc, loading: discLoading } = useDiscoveredNpcs()
  const [location, setLocation] = useState(null)
  const [discovering, setDiscovering] = useState(null)

  useEffect(() => {
    async function fetchLocation() {
      const { data } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single()
      setLocation(data)
    }
    fetchLocation()
  }, [id])

  if (npcsLoading || discLoading || !location) return <Loading />

  async function handleDiscover(npcId) {
    setDiscovering(npcId)
    await discoverNpc(npcId)
    setDiscovering(null)
  }

  return (
    <div>
      <Link to="/mapa" className={styles.back}>&larr; Voltar ao mapa</Link>
      <h1 className={styles.title}>{location.name}</h1>
      {location.description && (
        <p className={styles.description}>{location.description}</p>
      )}

      <h2 className={styles.sectionTitle}>Habitantes</h2>
      <div className={styles.npcList}>
        {npcs.map(npc => {
          const isDiscovered = discoveredIds.has(npc.id)
          return (
            <Card key={npc.id} className={`${styles.npcCard} ${!isDiscovered ? styles.undiscovered : ''}`}>
              <div className={styles.npcInfo}>
                <h3>{npc.name}</h3>
                {isDiscovered && npc.description && (
                  <p className={styles.npcDescription}>{npc.description}</p>
                )}
              </div>
              {isDiscovered ? (
                <Link to={`/npc/${npc.id}`} className={styles.viewLink}>
                  Ver detalhes &rarr;
                </Link>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => handleDiscover(npc.id)}
                  loading={discovering === npc.id}
                  style={{ width: 'auto' }}
                >
                  Descobrir
                </Button>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
