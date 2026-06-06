import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, CreditCard, Compass, ChevronRight, Star } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUserCards } from '../hooks/useUserCards'
import { CATEGORIES, TIER_LABELS } from '../types/database'

export default function Dashboard() {
  const { user } = useAuth()
  const { cards, loading } = useUserCards()

  const primaryCard = cards.find((c) => c.is_primary) ?? cards[0]
  const totalBenefits = cards.reduce((sum, c) => sum + c.benefits.length, 0)
  const firstName = user?.email?.split('@')[0] ?? 'Usuario'

  if (loading) {
    return (
      <div className="page-container space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="eliseo-card h-24 animate-pulse bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="page-container space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-gray-400">Hola,</p>
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{firstName}</h1>
      </motion.div>

      {/* Primary Card or Empty State */}
      {primaryCard ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            to={`/card-detail/${primaryCard.id}`}
            className="block rounded-2xl p-5 text-white shadow-float"
            style={{ background: primaryCard.card.bank.logo_color }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/70 text-xs font-medium">
                  {primaryCard.card.bank.short_name}
                </p>
                <p className="font-bold text-lg">
                  {primaryCard.nickname ?? primaryCard.card.name}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                <Star size={12} />
                <span className="text-[10px] font-semibold">Principal</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-[10px]">{primaryCard.card.franchise}</p>
                <p className="text-sm font-semibold">
                  {TIER_LABELS[primaryCard.card.tier]}
                </p>
              </div>
              {primaryCard.last_four && (
                <p className="text-white/50 text-sm tracking-widest">
                  •••• {primaryCard.last_four}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="eliseo-card p-6 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-3">
            <CreditCard size={24} className="text-eliseo-400" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Agrega tu primera tarjeta</h3>
          <p className="text-sm text-gray-500 mb-4">
            Descubre todos los beneficios que ya tienes.
          </p>
          <Link to="/add-card" className="eliseo-btn-primary inline-flex items-center gap-2">
            <Plus size={18} />
            Agregar tarjeta
          </Link>
        </motion.div>
      )}

      {/* Quick Stats */}
      {cards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="eliseo-card p-4 text-center">
            <p className="text-2xl font-black text-eliseo-500">{cards.length}</p>
            <p className="text-[11px] text-gray-500">Tarjetas</p>
          </div>
          <div className="eliseo-card p-4 text-center">
            <p className="text-2xl font-black text-mint-500">{totalBenefits}</p>
            <p className="text-[11px] text-gray-500">Beneficios</p>
          </div>
          <div className="eliseo-card p-4 text-center">
            <p className="text-2xl font-black text-coral-500">
              {new Set(cards.map((c) => c.card.bank_id)).size}
            </p>
            <p className="text-[11px] text-gray-500">Bancos</p>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="section-title">Acciones rapidas</h2>
        <div className="space-y-2">
          <Link
            to="/recommender"
            className="eliseo-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-eliseo-50 flex items-center justify-center">
              <Compass size={20} className="text-eliseo-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">Cual tarjeta uso?</p>
              <p className="text-xs text-gray-500">Recomendacion por categoria</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Link>
          <Link
            to="/add-card"
            className="eliseo-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-mint-50 flex items-center justify-center">
              <Plus size={20} className="text-mint-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">Agregar tarjeta</p>
              <p className="text-xs text-gray-500">Suma otra tarjeta a tu billetera</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Link>
        </div>
      </motion.div>

      {/* Top Categories */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="section-title">Explorar categorias</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.filter((c) => c.id !== 'general').map((cat) => (
            <Link
              key={cat.id}
              to={`/recommender?category=${cat.id}`}
              className="flex-shrink-0 eliseo-card px-4 py-3 flex items-center gap-2 hover:shadow-card-hover transition-shadow"
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
