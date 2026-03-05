import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { usePlayer } from '../contexts/PlayerContext'
import { CONDITIONS_MAP } from '../data/conditions'

export function useConditions() {
  const { player } = usePlayer()
  const [activeNames, setActiveNames] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!player) { setLoading(false); return }
    const { data, error } = await supabase
      .from('active_conditions')
      .select('condition_name')
      .eq('player_id', player.id)
      .order('condition_name')
    if (!error) setActiveNames((data || []).map(r => r.condition_name))
    setLoading(false)
  }, [player])

  useEffect(() => { fetch() }, [fetch])

  async function addCondition(name) {
    if (!player || activeNames.includes(name)) return
    const { error } = await supabase
      .from('active_conditions')
      .insert({ player_id: player.id, condition_name: name })
    if (!error) setActiveNames(prev => [...prev, name].sort())
  }

  async function removeCondition(name) {
    if (!player) return
    const { error } = await supabase
      .from('active_conditions')
      .delete()
      .eq('player_id', player.id)
      .eq('condition_name', name)
    if (!error) setActiveNames(prev => prev.filter(n => n !== name))
  }

  async function removeAll() {
    if (!player) return
    const { error } = await supabase
      .from('active_conditions')
      .delete()
      .eq('player_id', player.id)
    if (!error) setActiveNames([])
  }

  const activeConditions = activeNames
    .map(name => CONDITIONS_MAP[name])
    .filter(Boolean)

  return { activeConditions, activeNames, loading, addCondition, removeCondition, removeAll }
}
