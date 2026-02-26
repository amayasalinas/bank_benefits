import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Star, ChevronRight, CreditCard } from 'lucide-react'
import { useUserCards } from '../hooks/useUserCards'
import CreditCardVisual from '../components/CreditCardVisual'
import { getBankById } from '../data/banks'
import { TIER_LABELS } from '../types'

export default function MyCards() {
  const { userCards, loading, removeCard, setPrimary } = useUserCards()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta tarjeta de tu cartera?')) return
    setDeleting(id)
    await removeCard(id)
    setDeleting(null)
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-44 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Mis Tarjetas</h1>
          <p className="text-sm text-gray-500 mt-0.5">{userCards.length} tarjeta{userCards.length !== 1 ? 's' : ''} registrada{userCards.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/add-card" className="eliseo-btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
          <Plus size={16} />
          Agregar
        </Link>
      </div>

      {userCards.length === 0 ? (
        <div className="eliseo-card p-10 text-center border-2 border-dashed border-eliseo-200">
          <div className="w-16 h-16 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-4">
            <CreditCard size={28} className="text-eliseo-400" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Sin tarjetas aún</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            Agrega tus tarjetas para explorar todos sus beneficios y recibir recomendaciones personalizadas
          </p>
          <Link to="/add-card" className="eliseo-btn-primary inline-block">
            Agregar mi primera tarjeta
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userCards.map(uc => {
            if (!uc.card) return null
            const bank = getBankById(uc.card.bank_id)
            if (!bank) return null

            const benefits = uc.card.benefits || []
            const topBenefits = benefits.slice(0, 3)

            return (
              <div key={uc.id} className="eliseo-card overflow-hidden animate-slide-up">
                {/* Card visual + actions */}
                <div className="relative">
                  <CreditCardVisual
                    card={uc.card}
                    bank={bank}
                    size="lg"
                    showLastFour={uc.last_four || undefined}
                    className="w-full rounded-none"
                  />
                  {/* Overlay actions */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => setPrimary(uc.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shadow transition-all ${
                        uc.is_primary ? 'bg-yellow-400' : 'bg-white/80 hover:bg-white'
                      }`}
                      title={uc.is_primary ? 'Tarjeta principal' : 'Marcar como principal'}
                    >
                      <Star size={14} className={uc.is_primary ? 'fill-white text-white' : 'text-gray-500'} />
                    </button>
                    <button
                      onClick={() => handleDelete(uc.id)}
                      disabled={deleting === uc.id}
                      className="w-8 h-8 bg-white/80 hover:bg-red-50 rounded-lg flex items-center justify-center shadow transition-all"
                      title="Eliminar tarjeta"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                  {uc.is_primary && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Principal
                    </div>
                  )}
                </div>

                {/* Card info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{uc.card.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{bank.name}</span>
                        <span className="text-gray-200">·</span>
                        <span
                          className="badge-tier text-xs"
                          style={{
                            background: uc.card.tier === 'black' ? '#1a1a1a' :
                              uc.card.tier === 'gold' ? '#DAA520' :
                              uc.card.tier === 'platinum' ? '#667eea' :
                              uc.card.tier === 'infinite' ? '#302b63' :
                              '#5B4CF5',
                            color: 'white',
                          }}
                        >
                          {TIER_LABELS[uc.card.tier] || uc.card.tier}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/card-detail/${uc.card.id}`}
                      className="flex items-center gap-1 text-eliseo-500 text-sm font-semibold"
                    >
                      Ver beneficios <ChevronRight size={14} />
                    </Link>
                  </div>

                  {/* Benefits preview */}
                  {topBenefits.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {topBenefits.map(b => (
                        <div key={b.id} className="flex-shrink-0 bg-eliseo-50 rounded-lg px-3 py-1.5">
                          <div className="text-[10px] text-eliseo-400 font-medium">{b.title}</div>
                          <div className="text-xs font-bold text-eliseo-700">
                            {b.value_type === 'cashback_percent' ? `${b.value}% back` :
                             b.value_type === 'points_multiplier' ? `x${b.value}` :
                             b.value_type === 'lounge_access' ? '✈ VIP' :
                             b.value_type === 'discount_percent' ? `${b.value}% off` : '✓'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {uc.nickname && (
                    <p className="text-xs text-gray-400 mt-2">"{uc.nickname}"</p>
                  )}
                </div>
              </div>
            )
          })}

          {/* Add more */}
          <Link to="/add-card" className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-eliseo-200 rounded-2xl text-eliseo-500 font-semibold text-sm hover:bg-eliseo-50 transition-colors">
            <Plus size={18} />
            Agregar otra tarjeta
          </Link>
        </div>
      )}
    </div>
  )
}
