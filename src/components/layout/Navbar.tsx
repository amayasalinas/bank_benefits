import { Link, useLocation } from 'react-router-dom'
import { Bell, ChevronLeft } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Inicio',
  '/my-cards': 'Mis Tarjetas',
  '/recommender': 'Recomendador',
  '/offers': 'Ofertas',
  '/profile': 'Perfil',
  '/add-card': 'Agregar Tarjeta',
}

export default function Navbar() {
  const location = useLocation()
  const { user } = useAuth()
  const title = PAGE_TITLES[location.pathname] ?? 'ELISEO'
  const canGoBack = ['/add-card', '/card-detail'].some(p => location.pathname.startsWith(p))
  const isHome = location.pathname === '/dashboard'

  if (!user) return null

  return (
    <header className="sticky top-0 z-40 glass border-b border-eliseo-100/50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {canGoBack ? (
          <Link to={-1 as never} className="flex items-center gap-1 text-eliseo-600 font-semibold">
            <ChevronLeft size={20} />
            <span className="text-sm">Atrás</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            {isHome && (
              <div className="w-7 h-7 rounded-lg bg-gradient-eliseo flex items-center justify-center">
                <span className="text-white font-black text-sm">E</span>
              </div>
            )}
            <span className="font-bold text-gray-900 text-base">{title}</span>
          </div>
        )}

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-eliseo-50 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
