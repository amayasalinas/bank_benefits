import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, CreditCard, Compass, Tag, User } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Inicio' },
  { to: '/my-cards', icon: CreditCard, label: 'Tarjetas' },
  { to: '/recommender', icon: Compass, label: 'Recomendador' },
  { to: '/offers', icon: Tag, label: 'Ofertas' },
  { to: '/profile', icon: User, label: 'Perfil' },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-eliseo-100/50">
        <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-eliseo-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-eliseo-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
