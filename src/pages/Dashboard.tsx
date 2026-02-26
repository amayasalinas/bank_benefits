import { Link } from 'react-router-dom'
import { Plus, ChevronRight, Plane, Utensils, ShoppingCart, Fuel, Sparkles, Trophy, TrendingUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUserCards } from '../hooks/useUserCards'
import CreditCardVisual from '../components/CreditCardVisual'
import { CATEGORIES } from '../types'
import { getBankById } from '../data/banks'

const QUICK_CATEGORIES = [
  { id: 'viajes', label: 'Viajes', icon: Plane, color: 'bg-blue-50 text-blue-500' },
  { id: 'restaurantes', label: 'Comida', icon: Utensils, color: 'bg-orange-50 text-orange-500' },
  { id: 'supermercados', label: 'Mercado', icon: ShoppingCart, color: 'bg-green-50 text-green-500' },
  { id: 'combustible', label: 'Gasolina', icon: Fuel, color: 'bg-yellow-50 text-yellow-600' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { userCards, loading } = useUserCards()

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuario'

  const primaryCard = userCards.find(uc => uc.is_primary) || userCards[0]

  // Stats
  const totalCards = userCards.length
  const hasLounge = userCards.some(uc =>
    uc.card?.benefits?.some(b => b.value_type === 'lounge_access')
  )
  const maxCashback = userCards.reduce((max, uc) => {
    const cashbackBenefits = uc.card?.benefits?.filter(b => b.value_type === 'cashback_percent') || []
    const maxCard = Math.max(0, ...cashbackBenefits.map(b => b.value || 0))
    return Math.max(max, maxCard)
  }, 0)

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Buenos días'
    if (h < 18) return 'Buenas tardes'
    return 'Buenas noches'
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Greeting */}
      <div className="mb-6">
        <p className="text-gray-500 text-sm">{getGreeting()},</p>
        <h1 className="text-2xl font-black text-gray-900">{firstName} 👋</h1>
      </div>

      {/* Stats bar */}
      {totalCards > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="eliseo-card p-3 text-center">
            <div className="text-2xl font-black text-eliseo-600">{totalCards}</div>
            <div className="text-xs text-gray-500 mt-0.5">Tarjetas</div>
          </div>
          <div className="eliseo-card p-3 text-center">
            <div className="text-2xl font-black text-mint-600">{maxCashback > 0 ? `${maxCashback}%` : '—'}</div>
            <div className="text-xs text-gray-500 mt-0.5">Máx cashback</div>
          </div>
          <div className="eliseo-card p-3 text-center">
            <div className="text-2xl font-black text-amber-500">{hasLounge ? '✓' : '—'}</div>
            <div className="text-xs text-gray-500 mt-0.5">Sala VIP</div>
          </div>
        </div>
      )}

      {/* Primary card or CTA to add */}
      {loading ? (
        <div className="h-44 bg-gray-100 rounded-2xl animate-pulse mb-6" />
      ) : primaryCard?.card ? (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="section-title mb-0">Tarjeta principal</span>
            <Link to="/my-cards" className="text-sm text-eliseo-500 font-semibold flex items-center gap-1">
              Ver todas <ChevronRight size={14} />
            </Link>
          </div>
          <Link to={`/card-detail/${primaryCard.card.id}`}>
            <CreditCardVisual
              card={primaryCard.card}
              bank={getBankById(primaryCard.card.bank_id)!}
              size="lg"
              showLastFour={primaryCard.last_four || undefined}
              className="w-full"
            />
          </Link>
          {primaryCard.card.benefits && primaryCard.card.benefits.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {primaryCard.card.benefits.slice(0, 4).map(b => (
                <div key={b.id} className="flex-shrink-0 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
                  <div className="text-xs text-gray-500">{b.title}</div>
                  <div className="text-sm font-bold text-eliseo-600">
                    {b.value_type === 'cashback_percent' ? `${b.value}% back` :
                     b.value_type === 'points_multiplier' ? `x${b.value} pts` :
                     b.value_type === 'lounge_access' ? '✈ VIP' :
                     b.value_type === 'discount_percent' ? `${b.value}% off` : '✓ Incluido'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6">
          <div className="eliseo-card p-8 text-center border-2 border-dashed border-eliseo-200">
            <div className="w-16 h-16 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-4">
              <Plus size={28} className="text-eliseo-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Agrega tu primera tarjeta</h3>
            <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
              Selecciona tu banco y tu tarjeta para ver todos sus beneficios
            </p>
            <Link to="/add-card" className="eliseo-btn-primary text-sm inline-block">
              Agregar tarjeta
            </Link>
          </div>
        </div>
      )}

      {/* Quick recommendation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="section-title mb-0">¿Dónde vas a gastar?</span>
          <Link to="/recommender" className="text-sm text-eliseo-500 font-semibold flex items-center gap-1">
            Ver todo <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/recommender?category=${cat.id}`}
              className="eliseo-card p-3 text-center hover:shadow-card-hover transition-all duration-200 active:scale-95"
            >
              <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-2`}>
                <cat.icon size={18} />
              </div>
              <span className="text-xs font-medium text-gray-600">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Best cards highlight */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="section-title mb-0">Destacados Colombia</span>
          <Link to="/recommender" className="text-sm text-eliseo-500 font-semibold flex items-center gap-1">
            Explorar <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {[
            { icon: Trophy, color: 'bg-amber-50 text-amber-600', label: 'Mejor cashback', value: 'CarroYa AV Villas · 10% gasolina', link: '/card-detail/av-carroya' },
            { icon: Sparkles, color: 'bg-eliseo-50 text-eliseo-600', label: 'Sin cuota de manejo', value: 'Nu, Lulobank, RappiCard, Nequi...', link: '/recommender' },
            { icon: TrendingUp, color: 'bg-mint-50 text-mint-600', label: 'Más millas', value: 'LATAM Pass Signature · 2/USD', link: '/card-detail/bog-latam-signature' },
          ].map((item, i) => (
            <Link key={i} to={item.link} className="eliseo-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-all duration-200 active:scale-[0.99]">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                <item.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                <div className="text-sm font-bold text-gray-900 truncate">{item.value}</div>
              </div>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Add more cards */}
      {totalCards > 0 && (
        <Link to="/add-card" className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-eliseo-200 rounded-2xl text-eliseo-500 font-semibold text-sm hover:bg-eliseo-50 transition-colors mb-4">
          <Plus size={18} />
          Agregar otra tarjeta
        </Link>
      )}
    </div>
  )
}
