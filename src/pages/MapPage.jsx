import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLocations } from '../hooks/useLocations'
import { useDiscoveredNpcs } from '../hooks/useDiscoveredNpcs'
import LocationCard from '../components/map/LocationCard'
import Loading from '../components/common/Loading'
import styles from './MapPage.module.css'

export default function MapPage() {
  const { locations, loading: locLoading } = useLocations()
  const { discoveredIds, loading: discLoading } = useDiscoveredNpcs()
  const [npcCounts, setNpcCounts] = useState({})
  const [npcsByLocation, setNpcsByLocation] = useState({})

  useEffect(() => {
    async function fetchNpcCounts() {
      const { data } = await supabase.from('npcs').select('id, location_id')
      if (!data) return

      const counts = {}
      const byLocation = {}
      for (const npc of data) {
        counts[npc.location_id] = (counts[npc.location_id] || 0) + 1
        if (!byLocation[npc.location_id]) byLocation[npc.location_id] = []
        byLocation[npc.location_id].push(npc.id)
      }
      setNpcCounts(counts)
      setNpcsByLocation(byLocation)
    }
    fetchNpcCounts()
  }, [])

  if (locLoading || discLoading) return <Loading />

  return (
    <div>
      <h1 className={styles.title}>Candeh'ssa</h1>
      <p className={styles.subtitle}>Escolha um local para explorar</p>
      <div className={styles.grid}>
        {locations.map(loc => {
          const locNpcs = npcsByLocation[loc.id] || []
          const discovered = locNpcs.filter(id => discoveredIds.has(id)).length
          return (
            <LocationCard
              key={loc.id}
              location={loc}
              totalNpcs={npcCounts[loc.id] || 0}
              discoveredCount={discovered}
            />
          )
        })}
      </div>
    </div>
  )
}
