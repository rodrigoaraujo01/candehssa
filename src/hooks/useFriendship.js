import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { usePlayer } from '../contexts/PlayerContext'

export function useFriendship(npcId) {
  const { player } = usePlayer()
  const [points, setPoints] = useState(0)
  const [missionCompleted, setMissionCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!player || !npcId) {
      setLoading(false)
      return
    }

    const [fpResult, missionResult] = await Promise.all([
      supabase
        .from('friendship_points')
        .select('points')
        .eq('player_id', player.id)
        .eq('npc_id', npcId)
        .maybeSingle(),
      supabase
        .from('completed_missions')
        .select('id')
        .eq('player_id', player.id)
        .eq('npc_id', npcId)
        .maybeSingle(),
    ])

    if (!fpResult.error && fpResult.data) {
      setPoints(fpResult.data.points)
    }
    if (!missionResult.error) {
      setMissionCompleted(!!missionResult.data)
    }
    setLoading(false)
  }, [player, npcId])

  useEffect(() => { fetch() }, [fetch])

  async function updatePoints(newPoints) {
    if (!player || newPoints < 0 || newPoints > 7) return

    const prevPoints = points
    setPoints(newPoints) // optimistic

    const { error } = await supabase
      .from('friendship_points')
      .upsert(
        { player_id: player.id, npc_id: npcId, points: newPoints },
        { onConflict: 'player_id,npc_id' }
      )

    if (error) {
      setPoints(prevPoints) // revert
    }
  }

  async function completeMission() {
    if (!player) return { error: { message: 'Sem jogador' } }

    const { error } = await supabase
      .from('completed_missions')
      .insert({ player_id: player.id, npc_id: npcId })

    if (!error) {
      setMissionCompleted(true)
    }
    return { error }
  }

  return { points, missionCompleted, loading, updatePoints, completeMission }
}
