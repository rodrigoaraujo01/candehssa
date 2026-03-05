import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/common/Loading'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      navigate(user ? '/mapa' : '/', { replace: true })
    }
  }, [user, loading, navigate])

  return <Loading message="Autenticando..." />
}
