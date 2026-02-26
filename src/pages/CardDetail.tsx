import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Star, Shield, Plane, Utensils, ShoppingCart, Fuel, Music, Tv, Shirt, Award, RotateCcw } from 'lucide-react'
import { getCardById, getBankById, getBenefitsByCard } from '../data/banks'
import CreditCardVisual from '../components/CreditCardVisual'
import { TIER_LABELS, CATEGORIES } from '../types'
import type { BenefitCategory, CardBenefit } from '../types'

const CATEGORY_ICONS: Record<BenefitCategory, React.ElementType> = {
  general: Star,
  cashback: RotateCcw,
  puntos: Award,
  viajes: Plane,
  restaurantes: Utensils,
  entretenimiento: Music,
  supermercados: ShoppingCart,
  combustible: Fuel,
  streaming: Tv,
  moda: Shirt,
  seguros: Shield,
}

const VALUE_LABEL = (b: CardBenefit): string => {
  switch (b.value_type) {
    case 'cashback_percent': return b.value ? `${b.value}% cashback` : 'Cashback'
    case 'points_multiplier': return b.value ? `x${b.value} puntos/millas` : 'Multiplicador'
    case 'lounge_access': return b.value ? `${b.value} visitas/año` : 'Acceso ilimitado'
    case 'discount_percent': return b.value ? `${b.value}% descuento` : 'Descuento'
    case 'fixed_benefit': return 'Incluido'
    default: return 'Beneficio'
  }
}

const VALUE_COLOR = (b: CardBenefit): string => {
  switch (b.value_type) {
    case 'cashback_percent': return 'bg-mint-50 text-mint-700'
    case 'points_multiplier': return 'bg-amber-50 text-amber-700'
    case 'lounge_access': return 'bg-blue-50 text-blue-700'
    case 'discount_percent': return 'bg-purple-50 text-purple-700'
    default: return 'bg-eliseo-50 text-eliseo-700'
  }
}

export default function CardDetail() {
  const { cardId } = useParams<{ cardId: string }>()
  const card = getCardById(cardId || '')
  const bank = card ? getBankById(card.bank_id) : null
  const benefits = card ? getBenefitsByCard(card.id) : []

  if (!card || !bank) {
    return (
      <div className="page-container text-center py-16">
        <p className="text-gray-500">Tarjeta no encontrada.</p>
        <Link to="/recommender" className="text-eliseo-500 font-semibold mt-2 inline-block">
          Explorar tarjetas
        </Link>
      </div>
    )
  }

  // Group benefits by category
  const categoriesWithBenefits = CATEGORIES.filter(cat =>
    benefits.some(b => b.category === cat.id)
  )

  const generalBenefits = benefits.filter(b => b.category === 'general')
  const otherBenefits = benefits.filter(b => b.category !== 'general')

  return (
    <div className="page-container animate-fade-in">
      {/* Card visual */}
      <div className="flex justify-center mb-6">
        <CreditCardVisual card={card} bank={bank} size="lg" className="w-full max-w-sm" />
      </div>

      {/* Card title */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-black text-gray-900">{card.name}</h1>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white font-black text-[8px]"
            style={{ backgroundColor: bank.logo_color }}
          >
            {bank.logo_text.slice(0, 2)}
          </div>
          <span className="text-sm text-gray-500">{bank.name}</span>
          <span className="text-gray-300">·</span>
          <span
            className="badge-tier"
            style={{
              background: card.tier === 'black' ? '#1a1a1a' :
                card.tier === 'gold' ? '#DAA520' :
                card.tier === 'platinum' ? '#667eea' :
                card.tier === 'infinite' ? '#302b63' :
                '#E8E9F5',
              color: ['black', 'gold', 'platinum', 'infinite', 'signature'].includes(card.tier) ? 'white' : '#5B4CF5',
            }}
          >
            {TIER_LABELS[card.tier]}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-500">{card.franchise}</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${card.has_no_annual_fee ? 'bg-mint-50 text-mint-700' : 'bg-gray-100 text-gray-600'}`}>
            {card.has_no_annual_fee ? '✓ Sin cuota de manejo' : card.annual_fee_note}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
            {card.type === 'credit' ? 'Crédito' : 'Débito'}
          </span>
        </div>
      </div>

      {benefits.length === 0 ? (
        <div className="eliseo-card p-8 text-center">
          <p className="text-gray-500">Sin beneficios detallados disponibles aún.</p>
          <a
            href={bank.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-eliseo-500 font-semibold mt-2 inline-flex items-center gap-1"
          >
            Ver en sitio del banco <ExternalLink size={14} />
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Benefits by category */}
          {categoriesWithBenefits.map(cat => {
            const catBenefits = benefits.filter(b => b.category === cat.id)
            const Icon = CATEGORY_ICONS[cat.id] || Star
            return (
              <div key={cat.id} className="eliseo-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-eliseo-50 flex items-center justify-center">
                    <Icon size={16} className="text-eliseo-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{cat.name}</h3>
                </div>
                <div className="space-y-3">
                  {catBenefits.map(b => (
                    <div key={b.id} className="flex items-start gap-3">
                      <span className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg ${VALUE_COLOR(b)}`}>
                        {VALUE_LABEL(b)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900">{b.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{b.description}</div>
                        {b.conditions && (
                          <div className="text-xs text-gray-400 mt-0.5">
                            <span className="font-medium">Condición:</span> {b.conditions}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Website link */}
      <div className="mt-6 eliseo-card p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-900 text-sm">Información oficial</div>
          <div className="text-xs text-gray-400 mt-0.5">Siempre verifica en el sitio del banco</div>
        </div>
        <a
          href={bank.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-eliseo-50 text-eliseo-600 text-sm font-semibold px-3 py-2 rounded-xl hover:bg-eliseo-100 transition-colors"
        >
          Visitar <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
