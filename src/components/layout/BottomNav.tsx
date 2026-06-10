import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Icon, { type IconName } from '../v2/Icon'

const items: { to: string; icon: IconName; label: string }[] = [
  { to: '/dashboard', icon: 'home', label: 'Inicio' },
  { to: '/my-cards', icon: 'cards', label: 'Tarjetas' },
  { to: '/offers', icon: 'tag', label: 'Ofertas' },
  { to: '/profile', icon: 'user', label: 'Perfil' },
]

/** Nav inferior v2: 4 destinos + FAB central al recomendador (el momento estrella). */
export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const fabActive = location.pathname.startsWith('/recommender')

  const renderItem = ({ to, icon, label }: (typeof items)[number]) => (
    <NavLink key={to} to={to} className={({ isActive }) => 'nav-item tap' + (isActive ? ' active' : '')}>
      <Icon name={icon} size={22} />
      <span>{label}</span>
    </NavLink>
  )

  return (
    <nav className="nav">
      {items.slice(0, 2).map(renderItem)}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className="nav-fab"
          aria-label="¿Qué tarjeta uso?"
          onClick={() => navigate('/recommender')}
          style={fabActive ? { background: 'var(--brand)' } : undefined}
        >
          <Icon name="wand" size={24} />
        </button>
      </div>
      {items.slice(2).map(renderItem)}
    </nav>
  )
}
