import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Goals from './pages/Goals'
import Dashboard from './pages/Dashboard'
import MyCards from './pages/MyCards'
import AddCard from './pages/AddCard'
import CardDetail from './pages/CardDetail'
import Recommender from './pages/Recommender'
import Offers from './pages/Offers'
import Destacados from './pages/Destacados'
import Profile from './pages/Profile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="app" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--brand-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '3px solid var(--on-brand)', borderRightColor: 'transparent', transform: 'rotate(-45deg)' }} />
          </div>
          <div className="skel" style={{ width: 120, height: 8, borderRadius: 999 }} />
        </div>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/auth" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
      <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-cards" element={<MyCards />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/card-detail/:cardId" element={<CardDetail />} />
        <Route path="/recommender" element={<Recommender />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/destacados" element={<Destacados />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  )
}
