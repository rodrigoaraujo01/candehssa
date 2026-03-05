import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useNpcs(locationId) {
  const [npcs, setNpcs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!locationId) {
      setLoading(false)
      return
    }

    async function fetch() {
      const { data, error } = await supabase
        .from('npcs')
        .select('*')
        .eq('location_id', locationId)

      if (!error) setNpcs(data || [])
      setLoading(false)
    }
    fetch()
  }, [locationId])

  return { npcs, loading }
}
