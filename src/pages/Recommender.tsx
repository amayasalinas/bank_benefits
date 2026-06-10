import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Plus, Trophy } from 'lucide-react'
import { useUserCards } from '../hooks/useUserCards'
import { CATEGORIES, TIER_LABELS, type BenefitCategory } from '../types/database'

const VALUE_TYPE_WEIGHT: Record<string, number> = {
  cashback_percent: 100,
  discount_percent: 80,
  points_multiplier: 60,
  lounge_access: 50,
  fixed_benefit: 10,
}

export default function Recommender() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') as BenefitCategory | null
  const [selected, setSelected] = useState<BenefitCategory | null>(initialCategory)
  const { cards, loading } = useUserCards()

  const recommendations = useMemo(() => {
    if (!selected || cards.length === 0) return []

    return cards
      .map((uc) => {
        const matching = uc.benefits.filter((b) => b.category === selected)
        const bestScore = matching.reduce((max, b) => {
          const weight = VALUE_TYPE_WEIGHT[b.value_type] ?? 0
          const numVal = b.numeric_value ?? 1
          return Math.max(max, weight * numVal)
        }, 0)
        return { userCard: uc, matching, score: bestScore }
      })
      .filter((r) => r.matching.length > 0)
      .sort((a, b) => b.score - a.score)
  }, [selected, cards])

  const selectableCategories = CATEGORIES.filter((c) => c.id !== 'general')

  if (loading) {
    return (
      <div className="page-container space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Recomendador</h1>
        {[1, 2, 3].map((i) => (
          <div key={i} className="eliseo-card h-16 animate-pulse bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="page-container space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recomendador</h1>
        <p className="text-sm text-gray-500 mt-1">
          Selecciona una categoría y te decimos cuál tarjeta usar.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {selectableCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(selected === cat.id ? null : cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              selected === cat.id
                ? 'bg-eliseo-500 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-eliseo-300'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="eliseo-card p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-3">
              <Trophy size={24} className="text-eliseo-400" />
            </div>
            <p className="text-sm text-gray-500">
              Elige una categoría para ver cuál de tus tarjetas te da el mejor beneficio.
            </p>
          </motion.div>
        ) : cards.length === 0 ? (
          <motion.div
            key="no-cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="eliseo-card p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-3">
              <CreditCard size={24} className="text-eliseo-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Agrega tu primera tarjeta</h3>
            <p className="text-sm text-gray-500 mb-4">
              Para obtener recomendaciones personalizadas.
            </p>
            <Link to="/add-card" className="eliseo-btn-primary inline-flex items-center gap-2">
              <Plus size={18} />
              Agregar tarjeta
            </Link>
          </motion.div>
        ) : recommendations.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="eliseo-card p-6 text-center"
          >
            <p className="text-sm text-gray-500">
              Ninguna de tus tarjetas tiene beneficios específicos para esta categoría.
              Usa tu tarjeta principal para esta compra.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {recommendations.map((rec, i) => {
              const { userCard: uc, matching } = rec
              const isTop = i === 0

              return (
                <motion.div
                  key={uc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/card-detail/${uc.id}`}
                    className={`block eliseo-card p-4 transition-shadow ${
                      isTop ? 'ring-2 ring-eliseo-400 shadow-card-hover' : 'hover:shadow-card-hover'
                    }`}
                  >
                    {isTop && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Trophy size={14} className="text-eliseo-500" />
                        <span className="text-xs font-bold text-eliseo-500">MEJOR OPCIÓN</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: uc.card.bank.logo_color + '20' }}
                      >
                        <span className="font-black text-sm" style={{ color: uc.card.bank.logo_color }}>
                          {uc.card.bank.short_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {uc.nickname ?? uc.card.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {uc.card.bank.short_name} · {TIER_LABELS[uc.card.tier]}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                    </div>
                    <div className="space-y-1.5">
                      {matching.map((b) => (
                        <div key={b.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-700">{b.title}</p>
                          <span className="text-xs font-bold text-eliseo-500">{b.value_label}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
