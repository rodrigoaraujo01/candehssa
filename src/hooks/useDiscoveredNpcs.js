import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { usePlayer } from '../contexts/PlayerContext'

export function useDiscoveredNpcs() {
  const { group, player } = usePlayer()
  const [discoveredIds, setDiscoveredIds] = useState(new Set())
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!group) {
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('discovered_npcs')
      .select('npc_id')
      .eq('group_id', group.id)

    if (!error) {
      setDiscoveredIds(new Set((data || []).map(d => d.npc_id)))
    }
    setLoading(false)
  }, [group])

  useEffect(() => { fetch() }, [fetch])

  async function discoverNpc(npcId) {
    if (!group || !player) return { error: { message: 'Sem grupo' } }

    const { error } = await supabase
      .from('discovered_npcs')
      .insert({
        group_id: group.id,
        npc_id: npcId,
        discovered_by: player.id,
      })

    if (!error) {
      setDiscoveredIds(prev => new Set([...prev, npcId]))
    }
    return { error }
  }

  return { discoveredIds, loading, discoverNpc, refresh: fetch }
}
