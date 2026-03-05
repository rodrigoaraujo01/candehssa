import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const { user } = useAuth()
  const [player, setPlayer] = useState(null)
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchPlayer = useCallback(async () => {
    if (!user) {
      setPlayer(null)
      setGroup(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error) {
      console.error('Error fetching player:', error)
      setLoading(false)
      return
    }

    setPlayer(data)

    if (data?.group_id) {
      const { data: groupData } = await supabase
        .from('groups')
        .select('id, name')
        .eq('id', data.group_id)
        .single()
      setGroup(groupData)
    } else {
      setGroup(null)
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchPlayer()
  }, [fetchPlayer])

  async function createPlayer({ name, race, level }) {
    const { data, error } = await supabase
      .from('players')
      .insert({ user_id: user.id, name, race, level })
      .select()
      .single()

    if (error) return { error }
    setPlayer(data)
    return { data }
  }

  async function updatePlayer(updates) {
    const { data, error } = await supabase
      .from('players')
      .update(updates)
      .eq('id', player.id)
      .select()
      .single()

    if (error) return { error }
    setPlayer(data)
    return { data }
  }

  async function createGroup(name, password) {
    const { data, error } = await supabase.rpc('create_group', {
      group_name: name,
      group_password: password,
    })

    if (error) return { error }

    await supabase
      .from('players')
      .update({ group_id: data })
      .eq('id', player.id)

    await fetchPlayer()
    return { data }
  }

  async function joinGroup(name, password) {
    const { data, error } = await supabase.rpc('join_group', {
      group_name: name,
      group_password: password,
    })

    if (error) return { error }
    await fetchPlayer()
    return { data }
  }

  const value = {
    player,
    group,
    loading,
    createPlayer,
    updatePlayer,
    createGroup,
    joinGroup,
    refreshPlayer: fetchPlayer,
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
