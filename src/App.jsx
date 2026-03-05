import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { PlayerProvider } from './contexts/PlayerContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Layout from './components/common/Layout'
import Loading from './components/common/Loading'
import LandingPage from './pages/LandingPage'
import CreateCharacterPage from './pages/CreateCharacterPage'
import GroupPage from './pages/GroupPage'
import MapPage from './pages/MapPage'
import LocationDetailPage from './pages/LocationDetailPage'
import NpcDetailPage from './pages/NpcDetailPage'
import AffinitySummaryPage from './pages/AffinitySummaryPage'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <Loading />

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/personagem" replace /> : <LandingPage />} />
      <Route
        path="/criar-personagem"
        element={
          <ProtectedRoute requirePlayer={false} requireGroup={false}>
            <CreateCharacterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/grupo"
        element={
          <ProtectedRoute requireGroup={false}>
            <GroupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mapa"
        element={
          <ProtectedRoute>
            <Layout><MapPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/local/:id"
        element={
          <ProtectedRoute>
            <Layout><LocationDetailPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/npc/:id"
        element={
          <ProtectedRoute>
            <Layout><NpcDetailPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/personagem"
        element={
          <ProtectedRoute>
            <Layout><AffinitySummaryPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <PlayerProvider>
          <AppRoutes />
        </PlayerProvider>
      </AuthProvider>
    </HashRouter>
  )
}
