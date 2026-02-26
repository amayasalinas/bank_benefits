import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, Sparkles } from 'lucide-react'
import { CATEGORIES, type BenefitCategory, type CategoryInfo } from '../types'
import { getBestCardsForCategory, getBankById } from '../data/banks'
import CreditCardVisual from '../components/CreditCardVisual'

export default function Recommender() {
  const [params] = useSearchParams()
  const [selected, setSelected] = useState<BenefitCategory | null>(
    (params.get('category') as BenefitCategory) || null
  )

  const results = selected ? getBestCardsForCategory(selected) : []

  const VALUE_LABEL = (type: string, value: number | null): string => {
    switch (type) {
      case 'cashback_percent': return `${value}% cashback`
      case 'points_multiplier': return `x${value} pts`
      case 'lounge_access': return value ? `${value} visitas VIP/año` : 'VIP ilimitado'
      case 'discount_percent': return `${value}% descuento`
      case 'fixed_benefit': return 'Beneficio incluido'
      default: return 'Beneficio'
    }
  }

  const BADGE_COLOR = (type: string) => {
    switch (type) {
      case 'cashback_percent': return 'bg-mint-500'
      case 'points_multiplier': return 'bg-amber-500'
      case 'lounge_access': return 'bg-blue-500'
      case 'discount_percent': return 'bg-purple-500'
      default: return 'bg-eliseo-500'
    }
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={20} className="text-eliseo-500" />
          <h1 className="text-2xl font-black text-gray-900">Recomendador</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Selecciona dónde vas a gastar y te decimos qué tarjeta usar
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {CATEGORIES.filter(c => c.id !== 'general').map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelected(selected === cat.id ? null : cat.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
              selected === cat.id
                ? 'border-eliseo-400 bg-eliseo-50 shadow-md'
                : 'border-transparent bg-white shadow-sm hover:border-eliseo-200'
            }`}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span className={`text-xs font-semibold text-center leading-tight ${selected === cat.id ? 'text-eliseo-700' : 'text-gray-600'}`}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {selected && (
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="section-title mb-0">
              Mejores tarjetas para {CATEGORIES.find(c => c.id === selected)?.name}
            </h2>
            <span className="bg-eliseo-50 text-eliseo-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {results.length}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="eliseo-card p-8 text-center">
              <p className="text-gray-500 text-sm">No hay tarjetas con beneficios específicos en esta categoría.</p>
              <p className="text-gray-400 text-xs mt-1">Prueba con otra categoría.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((item, idx) => {
                const bank = getBankById(item.bank_id)
                if (!bank) return null
                return (
                  <Link
                    key={item.id}
                    to={`/card-detail/${item.id}`}
                    className="block animate-slide-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="eliseo-card p-4 hover:shadow-card-hover transition-all duration-200 active:scale-[0.99]">
                      <div className="flex items-center gap-3">
                        {/* Rank */}
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0 ${
                          idx === 0 ? 'bg-amber-400' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-400' : 'bg-eliseo-200'
                        }`}>
                          {idx + 1}
                        </div>

                        {/* Mini card */}
                        <CreditCardVisual card={item} bank={bank} size="sm" />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm truncate">{item.name}</div>
                          <div className="text-xs text-gray-400 truncate">{bank.name}</div>
                          <div className="mt-1.5">
                            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${BADGE_COLOR(item.topBenefit.value_type)}`}>
                              {VALUE_LABEL(item.topBenefit.value_type, item.topBenefit.value)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 truncate">{item.topBenefit.title}</div>
                        </div>

                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}

      {!selected && (
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-3xl bg-eliseo-50 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-eliseo-400" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">¿Dónde vas a gastar?</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Selecciona una categoría y te mostramos las mejores tarjetas para maximizar tus beneficios
          </p>
        </div>
      )}
    </div>
  )
}
