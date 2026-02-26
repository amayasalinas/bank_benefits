import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Sparkles, Tag, User } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
  { path: '/my-cards', icon: CreditCard, label: 'Tarjetas' },
  { path: '/recommender', icon: Sparkles, label: 'Recomienda' },
  { path: '/offers', icon: Tag, label: 'Ofertas' },
  { path: '/profile', icon: User, label: 'Perfil' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-eliseo-100/50 safe-area-pb">
      <div className="max-w-2xl mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ${
                  active ? 'text-eliseo-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${active ? 'bg-eliseo-50' : ''}`}>
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                </div>
                <span className={`text-[10px] font-medium leading-none ${active ? 'text-eliseo-600' : ''}`}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
