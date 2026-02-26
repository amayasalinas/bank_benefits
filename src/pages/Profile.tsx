import { useState } from 'react'
import { User, Mail, LogOut, ChevronRight, ExternalLink, Bell, Shield, HelpCircle, Info, CreditCard } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUserCards } from '../hooks/useUserCards'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, signOut } = useAuth()
  const { userCards } = useUserCards()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleSignOut = async () => {
    if (!confirm('¿Cerrar sesión?')) return
    setLoggingOut(true)
    await signOut()
    navigate('/')
  }

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario'
  const email = user?.email || ''
  const initials = name.slice(0, 2).toUpperCase()

  const MENU_ITEMS = [
    {
      section: 'Cuenta',
      items: [
        { icon: Bell, label: 'Notificaciones', action: () => {}, badge: null },
        { icon: Shield, label: 'Privacidad y seguridad', action: () => {}, badge: null },
      ],
    },
    {
      section: 'Información',
      items: [
        { icon: Info, label: 'Acerca de ELISEO', action: () => {}, badge: null },
        { icon: HelpCircle, label: 'Centro de ayuda', action: () => {}, badge: null },
        {
          icon: ExternalLink,
          label: 'Reportar un error',
          action: () => window.open('https://github.com/amayasalinas/bank_benefits/issues', '_blank'),
          badge: null,
        },
      ],
    },
  ]

  return (
    <div className="page-container animate-fade-in">
      {/* Avatar & name */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-eliseo flex items-center justify-center mx-auto mb-3 shadow-card">
          <span className="text-white font-black text-2xl">{initials}</span>
        </div>
        <h2 className="text-xl font-black text-gray-900">{name}</h2>
        <p className="text-gray-500 text-sm mt-0.5">{email}</p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="text-xl font-black text-eliseo-600">{userCards.length}</div>
            <div className="text-xs text-gray-400">Tarjetas</div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-xl font-black text-mint-600">
              {userCards.filter(uc => uc.card?.benefits && uc.card.benefits.length > 0).length}
            </div>
            <div className="text-xs text-gray-400">Con beneficios</div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-xl font-black text-amber-500">
              {userCards.reduce((sum, uc) => sum + (uc.card?.benefits?.length || 0), 0)}
            </div>
            <div className="text-xs text-gray-400">Beneficios totales</div>
          </div>
        </div>
      </div>

      {/* Quick action */}
      <div
        onClick={() => navigate('/add-card')}
        className="eliseo-card p-4 flex items-center gap-3 mb-5 cursor-pointer hover:shadow-card-hover transition-all active:scale-[0.99]"
      >
        <div className="w-10 h-10 rounded-xl bg-eliseo-50 flex items-center justify-center">
          <CreditCard size={20} className="text-eliseo-500" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-sm">Agregar tarjeta</div>
          <div className="text-xs text-gray-400">Tienes {userCards.length} tarjeta{userCards.length !== 1 ? 's' : ''} registrada{userCards.length !== 1 ? 's' : ''}</div>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>

      {/* Menu items */}
      {MENU_ITEMS.map(({ section, items }) => (
        <div key={section} className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">{section}</p>
          <div className="eliseo-card overflow-hidden">
            {items.map(({ icon: Icon, label, action, badge }, i) => (
              <button
                key={label}
                onClick={action}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                  i < items.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-gray-500" />
                </div>
                <span className="flex-1 text-sm font-medium text-gray-700">{label}</span>
                {badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
                )}
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        disabled={loggingOut}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-100 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors active:scale-[0.99] disabled:opacity-60 mb-6"
      >
        {loggingOut ? (
          <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
        ) : (
          <LogOut size={16} />
        )}
        Cerrar sesión
      </button>

      {/* Brand footer */}
      <div className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-eliseo flex items-center justify-center">
            <span className="text-white font-black text-xs">E</span>
          </div>
          <span className="font-black text-gray-900">ELISEO</span>
        </div>
        <p className="text-xs text-gray-400">v1.0.0 · Maximiza tus beneficios</p>
        <p className="text-xs text-gray-300 mt-0.5">© 2026 ELISEO</p>
      </div>
    </div>
  )
}
