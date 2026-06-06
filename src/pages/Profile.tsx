import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, CreditCard, Mail, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUserCards } from '../hooks/useUserCards'

export default function Profile() {
  const { user, signOut } = useAuth()
  const { cards } = useUserCards()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/', { replace: true })
  }

  const memberDate = user?.created_at ? new Date(user.created_at) : null
  const memberSince =
    memberDate && !isNaN(memberDate.getTime())
      ? memberDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
      : null

  return (
    <div className="page-container space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="eliseo-card p-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-eliseo flex items-center justify-center">
            <span className="text-white font-black text-xl">
              {user?.email?.charAt(0).toUpperCase() ?? 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 truncate">{user?.email}</p>
            {memberSince && (
              <p className="text-xs text-gray-500 mt-0.5">Miembro desde {memberSince}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <h2 className="section-title">Resumen</h2>
        <div className="eliseo-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-eliseo-50 flex items-center justify-center">
            <CreditCard size={18} className="text-eliseo-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Tarjetas agregadas</p>
          </div>
          <span className="text-lg font-black text-eliseo-500">{cards.length}</span>
        </div>
        <div className="eliseo-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-eliseo-50 flex items-center justify-center">
            <Mail size={18} className="text-eliseo-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Correo</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="eliseo-card p-4 flex items-start gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-mint-50 flex items-center justify-center flex-shrink-0">
          <Shield size={18} className="text-mint-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Tu privacidad</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Eliseo no almacena números de tarjeta, fechas de vencimiento ni CVV. Solo guardamos el banco y modelo de tarjeta para mostrarte beneficios.
          </p>
        </div>
      </motion.div>

      {/* Sign Out */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleSignOut}
          className="w-full eliseo-card p-4 flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Cerrar sesión</span>
        </button>
      </motion.div>
    </div>
  )
}
