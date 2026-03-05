import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useNpcDetail(npcId) {
  const [npc, setNpc] = useState(null)
  const [abilities, setAbilities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!npcId) {
      setLoading(false)
      return
    }

    async function fetch() {
      const [npcResult, abilitiesResult] = await Promise.all([
        supabase.from('npcs').select('*, locations(name)').eq('id', npcId).single(),
        supabase.from('npc_abilities').select('*').eq('npc_id', npcId).order('friendship_level'),
      ])

      if (!npcResult.error) setNpc(npcResult.data)
      if (!abilitiesResult.error) setAbilities(abilitiesResult.data || [])
      setLoading(false)
    }
    fetch()
  }, [npcId])

  return { npc, abilities, loading }
}
