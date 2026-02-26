import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, ExternalLink, ChevronRight, Flame } from 'lucide-react'
import { BANKS, getBankById } from '../data/banks'
import type { BenefitCategory } from '../types'
import { CATEGORIES } from '../types'

interface Offer {
  id: string
  bank_id: string
  title: string
  description: string
  discount_value: string
  category: BenefitCategory
  valid_until: string | null
  url: string
  highlight?: boolean
}

const DEMO_OFFERS: Offer[] = [
  {
    id: '1',
    bank_id: 'bbva',
    title: 'Puntos dobles en restaurantes',
    description: 'Cada martes obtén el doble de Puntos BBVA en restaurantes aliados con tu tarjeta Aqua o Infinite.',
    discount_value: 'x2 puntos',
    category: 'restaurantes',
    valid_until: '2026-03-31',
    url: 'https://www.bbva.com.co/personas/beneficios',
    highlight: true,
  },
  {
    id: '2',
    bank_id: 'bbva',
    title: 'Puntos dobles en cines',
    description: 'Cada jueves obtén el doble de Puntos BBVA en cines aliados con tu tarjeta BBVA.',
    discount_value: 'x2 puntos',
    category: 'entretenimiento',
    valid_until: '2026-03-31',
    url: 'https://www.bbva.com.co/personas/beneficios',
  },
  {
    id: '3',
    bank_id: 'itau',
    title: 'Cashback en supermercados',
    description: '3% de devolución en tus compras en supermercados con la Visa TDevuelve de Itaú.',
    discount_value: '3% cashback',
    category: 'supermercados',
    valid_until: null,
    url: 'https://banco.itau.co',
    highlight: true,
  },
  {
    id: '4',
    bank_id: 'avvillas',
    title: '10% en gasolina con CarroYa',
    description: 'Obtén hasta $500.000/mes en cashback sobre combustible con la Tarjeta CarroYa de AV Villas.',
    discount_value: '10% cashback',
    category: 'combustible',
    valid_until: null,
    url: 'https://www.avvillas.com.co',
    highlight: true,
  },
  {
    id: '5',
    bank_id: 'avvillas',
    title: '5% cashback Boomerang',
    description: 'Con la Tarjeta Boomerang obtén 5% de cashback en restaurantes, moda y entretenimiento.',
    discount_value: '5% cashback',
    category: 'restaurantes',
    valid_until: null,
    url: 'https://www.avvillas.com.co',
  },
  {
    id: '6',
    bank_id: 'colpatria',
    title: '10% devolución en Cencosud',
    description: 'Con la Tarjeta Cencosud obtén 10% de devolución en Jumbo, Metro, Easy y más.',
    discount_value: '10% back',
    category: 'supermercados',
    valid_until: null,
    url: 'https://www.scotiabankcolpatria.com',
    highlight: true,
  },
  {
    id: '7',
    bank_id: 'colpatria',
    title: '4% en PriceSmart',
    description: 'Con la Visa PriceSmart de Colpatria obtén 4% de cashback en todas tus compras en PriceSmart.',
    discount_value: '4% cashback',
    category: 'supermercados',
    valid_until: null,
    url: 'https://www.scotiabankcolpatria.com',
  },
  {
    id: '8',
    bank_id: 'lulobank',
    title: '30% cashback en streaming',
    description: 'Con Lulo Pro obtén 30% de cashback en tus suscripciones de Netflix, Spotify, Disney+ y más.',
    discount_value: '30% cashback',
    category: 'streaming',
    valid_until: null,
    url: 'https://www.lulobank.com',
    highlight: true,
  },
  {
    id: '9',
    bank_id: 'rappicard',
    title: '5% en Rappi Travel',
    description: 'Con RappiCard obtén 5% de cashback en vuelos, hoteles y alquileres en Rappi Travel.',
    discount_value: '5% cashback',
    category: 'viajes',
    valid_until: null,
    url: 'https://rappicard.co',
  },
  {
    id: '10',
    bank_id: 'bancolombia',
    title: 'Millas LATAM Pass',
    description: 'Con la Visa Avianca LifeMiles de Bancolombia acumula millas en todas tus compras para volar.',
    discount_value: 'Millas LifeMiles',
    category: 'viajes',
    valid_until: null,
    url: 'https://www.bancolombia.com',
  },
  {
    id: '11',
    bank_id: 'davivienda',
    title: 'G-Zero sin cuota + cashback',
    description: 'La G-Zero de Davivienda tiene 0% cuota de manejo permanente y 1% cashback en suscripciones.',
    discount_value: '1% + $0 cuota',
    category: 'streaming',
    valid_until: null,
    url: 'https://www.davivienda.com',
  },
  {
    id: '12',
    bank_id: 'colpatria',
    title: '5% cashback suscripciones',
    description: 'Con One Cashback Amex de Colpatria obtén 5% de devolución en pagos recurrentes y suscripciones.',
    discount_value: '5% cashback',
    category: 'streaming',
    valid_until: null,
    url: 'https://www.scotiabankcolpatria.com',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  restaurantes: 'bg-orange-100 text-orange-700',
  entretenimiento: 'bg-purple-100 text-purple-700',
  supermercados: 'bg-green-100 text-green-700',
  combustible: 'bg-yellow-100 text-yellow-700',
  streaming: 'bg-pink-100 text-pink-700',
  viajes: 'bg-blue-100 text-blue-700',
  cashback: 'bg-mint-100 text-mint-700',
  general: 'bg-gray-100 text-gray-700',
  puntos: 'bg-amber-100 text-amber-700',
  moda: 'bg-rose-100 text-rose-700',
  seguros: 'bg-slate-100 text-slate-700',
}

export default function Offers() {
  const [activeCategory, setActiveCategory] = useState<BenefitCategory | 'all'>('all')
  const [activeBank, setActiveBank] = useState<string>('all')

  const filteredOffers = DEMO_OFFERS.filter(o => {
    const catMatch = activeCategory === 'all' || o.category === activeCategory
    const bankMatch = activeBank === 'all' || o.bank_id === activeBank
    return catMatch && bankMatch
  })

  const highlightedOffers = filteredOffers.filter(o => o.highlight)
  const regularOffers = filteredOffers.filter(o => !o.highlight)

  const banksWithOffers = [...new Set(DEMO_OFFERS.map(o => o.bank_id))]

  const formatDate = (d: string | null) => {
    if (!d) return 'Vigente'
    const date = new Date(d)
    return `Hasta ${date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}`
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Tag size={20} className="text-eliseo-500" />
          <h1 className="text-2xl font-black text-gray-900">Ofertas</h1>
        </div>
        <p className="text-gray-500 text-sm">Descuentos y beneficios activos en Colombia</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeCategory === 'all' ? 'bg-eliseo-500 text-white' : 'bg-white text-gray-500 border border-gray-200'
          }`}
        >
          Todas
        </button>
        {CATEGORIES.filter(c => DEMO_OFFERS.some(o => o.category === c.id)).map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? 'all' : cat.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeCategory === cat.id ? 'bg-eliseo-500 text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Bank filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-5">
        <button
          onClick={() => setActiveBank('all')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeBank === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          Todos
        </button>
        {banksWithOffers.map(bankId => {
          const bank = getBankById(bankId)
          if (!bank) return null
          return (
            <button
              key={bankId}
              onClick={() => setActiveBank(activeBank === bankId ? 'all' : bankId)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeBank === bankId ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div
                className="w-4 h-4 rounded-md flex items-center justify-center text-white font-black text-[8px]"
                style={{ backgroundColor: bank.logo_color }}
              >
                {bank.logo_text.slice(0, 1)}
              </div>
              {bank.short_name}
            </button>
          )
        })}
      </div>

      {/* Highlighted offers */}
      {highlightedOffers.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-bold text-gray-900">Destacadas</span>
          </div>
          <div className="space-y-3">
            {highlightedOffers.map(offer => {
              const bank = getBankById(offer.bank_id)
              if (!bank) return null
              return (
                <div key={offer.id} className="bg-gradient-to-r from-eliseo-50 to-mint-50 rounded-2xl p-4 border border-eliseo-100">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: bank.logo_color }}
                    >
                      {bank.logo_text}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-sm">{offer.title}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[offer.category] || 'bg-gray-100 text-gray-600'}`}>
                          {CATEGORIES.find(c => c.id === offer.category)?.emoji} {CATEGORIES.find(c => c.id === offer.category)?.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{offer.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-eliseo-600 bg-eliseo-100 px-2 py-0.5 rounded-full">
                          {offer.discount_value}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(offer.valid_until)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Regular offers */}
      {regularOffers.length > 0 && (
        <div>
          {highlightedOffers.length > 0 && <h3 className="text-sm font-bold text-gray-900 mb-3">Todas las ofertas</h3>}
          <div className="space-y-3">
            {regularOffers.map(offer => {
              const bank = getBankById(offer.bank_id)
              if (!bank) return null
              return (
                <div key={offer.id} className="eliseo-card p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                      style={{ backgroundColor: bank.logo_color }}
                    >
                      {bank.logo_text}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{offer.title}</div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{offer.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-gray-600">{offer.discount_value}</span>
                        <span className="text-xs text-gray-400">{formatDate(offer.valid_until)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500 font-medium">Sin ofertas para ese filtro</p>
          <button
            onClick={() => { setActiveCategory('all'); setActiveBank('all') }}
            className="text-eliseo-500 text-sm font-semibold mt-2"
          >
            Ver todas las ofertas
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Los beneficios mostrados son de carácter informativo. Verifica condiciones actualizadas directamente en el sitio de tu banco.
        </p>
      </div>
    </div>
  )
}
