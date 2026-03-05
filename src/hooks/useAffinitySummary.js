import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { usePlayer } from '../contexts/PlayerContext'

export function useAffinitySummary() {
  const { player } = usePlayer()
  const [affinities, setAffinities] = useState([])
  const [activeNpcIds, setActiveNpcIds] = useState(new Set())
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!player) {
      setLoading(false)
      return
    }

    const [fpResult, activeResult] = await Promise.all([
      supabase
        .from('friendship_points')
        .select(`
          points,
          npc_id,
          npcs (
            id, name, description, location_id,
            npc_abilities (id, friendship_level, name, description)
          )
        `)
        .eq('player_id', player.id)
        .gt('points', 0)
        .order('points', { ascending: false }),
      supabase
        .from('active_npcs')
        .select('npc_id')
        .eq('player_id', player.id),
    ])

    if (!fpResult.error && fpResult.data) {
      const items = fpResult.data.map(fp => ({
        npc: fp.npcs,
        points: fp.points,
        abilities: (fp.npcs?.npc_abilities || [])
          .filter(a => a.friendship_level <= fp.points)
          .sort((a, b) => a.friendship_level - b.friendship_level),
      }))
      setAffinities(items)
    }

    if (!activeResult.error) {
      setActiveNpcIds(new Set((activeResult.data || []).map(r => r.npc_id)))
    }

    setLoading(false)
  }, [player])

  useEffect(() => { fetch() }, [fetch])

  async function toggleActive(npcId) {
    if (!player) return

    if (activeNpcIds.has(npcId)) {
      const { error } = await supabase
        .from('active_npcs')
        .delete()
        .eq('player_id', player.id)
        .eq('npc_id', npcId)

      if (!error) setActiveNpcIds(new Set())
    } else {
      // Remove qualquer NPC ativo anterior e ativa o novo
      await supabase.from('active_npcs').delete().eq('player_id', player.id)
      const { error } = await supabase
        .from('active_npcs')
        .insert({ player_id: player.id, npc_id: npcId })

      if (!error) setActiveNpcIds(new Set([npcId]))
    }
  }

  return { affinities, activeNpcIds, loading, toggleActive }
}
