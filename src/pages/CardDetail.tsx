import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Trash2, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useUserCards } from '../hooks/useUserCards'
import { TIER_LABELS, CATEGORIES } from '../types/database'
import ConfidenceBadge from '../components/ConfidenceBadge'

export default function CardDetail() {
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const { cards, loading, removeCard, setPrimary } = useUserCards()
  const [removing, setRemoving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const userCard = cards.find((c) => c.id === cardId)

  if (loading) {
    return (
      <div className="page-container space-y-4">
        <div className="h-40 eliseo-card animate-pulse bg-gray-100" />
        <div className="h-20 eliseo-card animate-pulse bg-gray-100" />
      </div>
    )
  }

  if (!userCard) {
    return (
      <div className="page-container text-center pt-20">
        <p className="text-gray-500">Tarjeta no encontrada</p>
        <button onClick={() => navigate('/my-cards')} className="eliseo-btn-secondary mt-4">
          Volver a mis tarjetas
        </button>
      </div>
    )
  }

  const { card, benefits } = userCard
  const { bank } = card

  const categoriesWithBenefits = CATEGORIES.filter((cat) =>
    benefits.some((b) => b.category === cat.id)
  )

  const handleRemove = async () => {
    setRemoving(true)
    await removeCard(userCard.id)
    navigate('/my-cards', { replace: true })
  }

  const handleSetPrimary = async () => {
    await setPrimary(userCard.id)
  }

  return (
    <div className="page-container space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1">Detalle</h1>
        <button
          onClick={() => setShowConfirm(true)}
          aria-label="Eliminar tarjeta"
          className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      {/* Card Visual */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 text-white shadow-float"
        style={{ background: bank.logo_color }}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-white/70 text-xs font-medium">{bank.short_name}</p>
            <p className="font-bold text-lg">{userCard.nickname ?? card.name}</p>
          </div>
          {userCard.is_primary && (
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
              <Star size={12} />
              <span className="text-[10px] font-semibold">Principal</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-[10px]">{card.franchise} · {card.type === 'credito' ? 'Crédito' : 'Débito'}</p>
            <p className="text-sm font-semibold">{TIER_LABELS[card.tier]}</p>
          </div>
          {userCard.last_four && (
            <p className="text-white/50 text-sm tracking-widest">•••• {userCard.last_four}</p>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-2">
        {!userCard.is_primary && (
          <button onClick={handleSetPrimary} className="eliseo-btn-secondary flex-1 text-sm flex items-center justify-center gap-1.5">
            <Star size={14} />
            Hacer principal
          </button>
        )}
        {card.bank_url && (
          <a
            href={card.bank_url}
            target="_blank"
            rel="noopener noreferrer"
            className="eliseo-btn-outline flex-1 text-sm flex items-center justify-center gap-1.5"
          >
            <ExternalLink size={14} />
            Ver en banco
          </a>
        )}
      </div>

      {/* Fee info */}
      {card.fee_note && (
        <div className="eliseo-card p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Cuota de manejo</p>
          <p className="text-sm text-gray-900">{card.fee_note}</p>
        </div>
      )}

      {/* Benefits by Category */}
      {benefits.length > 0 ? (
        <div className="space-y-4">
          <h2 className="section-title">Beneficios ({benefits.length})</h2>
          {categoriesWithBenefits.map((cat) => {
            const catBenefits = benefits.filter((b) => b.category === cat.id)
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{cat.emoji}</span>
                  <h3 className="text-sm font-bold text-gray-900">{cat.name}</h3>
                </div>
                <div className="space-y-2">
                  {catBenefits.map((benefit) => (
                    <div key={benefit.id} className="eliseo-card p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{benefit.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{benefit.description}</p>
                          {benefit.conditions && (
                            <p className="text-[11px] text-gray-400 mt-1">{benefit.conditions}</p>
                          )}
                          {benefit.confidence && (
                            <ConfidenceBadge level={benefit.confidence} className="mt-1.5" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-eliseo-500 bg-eliseo-50 px-2 py-1 rounded-lg whitespace-nowrap">
                          {benefit.value_label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="eliseo-card p-6 text-center">
          <p className="text-sm text-gray-500">
            No hay beneficios registrados para esta tarjeta aún.
          </p>
        </div>
      )}

      {/* Delete Confirmation */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center p-4"
          onClick={() => setShowConfirm(false)}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-gray-900 text-lg mb-2">¿Eliminar tarjeta?</h3>
            <p className="text-sm text-gray-500 mb-5">
              Se eliminará <strong>{userCard.nickname ?? card.name}</strong> de tu billetera. Puedes agregarla de nuevo después.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="eliseo-btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={handleRemove}
                disabled={removing}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-6 py-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {removing ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
