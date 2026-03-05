import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useLocations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('sort_order')

      if (!error) setLocations(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { locations, loading }
}
