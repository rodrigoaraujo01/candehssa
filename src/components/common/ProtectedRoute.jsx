import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { usePlayer } from '../../contexts/PlayerContext'
import Loading from './Loading'

export default function ProtectedRoute({ children, requirePlayer = true, requireGroup = true }) {
  const { user, loading: authLoading } = useAuth()
  const { player, group, loading: playerLoading } = usePlayer()

  if (authLoading || playerLoading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (requirePlayer && !player) {
    return <Navigate to="/criar-personagem" replace />
  }

  if (requireGroup && player && !group) {
    return <Navigate to="/grupo" replace />
  }

  return children
}
