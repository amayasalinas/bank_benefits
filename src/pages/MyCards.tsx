import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Star, ChevronRight, CreditCard } from 'lucide-react'
import { useUserCards } from '../hooks/useUserCards'
import { TIER_LABELS } from '../types/database'

export default function MyCards() {
  const { cards, loading } = useUserCards()

  if (loading) {
    return (
      <div className="page-container space-y-3">
        <h1 className="text-2xl font-bold text-gray-900">Mis tarjetas</h1>
        {[1, 2, 3].map((i) => (
          <div key={i} className="eliseo-card h-20 animate-pulse bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="page-container space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mis tarjetas</h1>
        <Link
          to="/add-card"
          aria-label="Agregar tarjeta"
          className="w-10 h-10 rounded-xl bg-eliseo-500 flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform"
        >
          <Plus size={20} />
        </Link>
      </div>

      {cards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eliseo-card p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-4">
            <CreditCard size={28} className="text-eliseo-400" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Sin tarjetas aún</h3>
          <p className="text-sm text-gray-500 mb-5">
            Agrega tus tarjetas para ver sus beneficios y recibir recomendaciones.
          </p>
          <Link to="/add-card" className="eliseo-btn-primary inline-flex items-center gap-2">
            <Plus size={18} />
            Agregar tarjeta
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {cards.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/card-detail/${uc.id}`}
                className="eliseo-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: uc.card.bank.logo_color + '20' }}
                >
                  <span
                    className="text-lg font-black"
                    style={{ color: uc.card.bank.logo_color }}
                  >
                    {uc.card.bank.short_name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {uc.nickname ?? uc.card.name}
                    </p>
                    {uc.is_primary && (
                      <Star size={12} className="text-eliseo-500 flex-shrink-0" fill="currentColor" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {uc.card.bank.short_name} · {uc.card.franchise} {TIER_LABELS[uc.card.tier]}
                  </p>
                  <p className="text-[11px] text-eliseo-500 font-medium mt-0.5">
                    {uc.benefits.length} beneficio{uc.benefits.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
