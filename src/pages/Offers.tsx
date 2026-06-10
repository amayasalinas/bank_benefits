import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Tag } from 'lucide-react'
import { fetchOffers } from '../lib/dataSource'
import { CATEGORIES } from '../types/database'
import ConfidenceBadge from '../components/ConfidenceBadge'
import type { Offer, Bank, BenefitCategory } from '../types/database'

export default function Offers() {
  const [offers, setOffers] = useState<(Offer & { bank: Bank })[]>([])
  const [banks, setBanks] = useState<Bank[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<BenefitCategory | null>(null)

  useEffect(() => {
    fetchOffers().then(({ offers, banks }) => {
      setOffers(offers)
      setBanks(banks)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return offers.filter((o) => {
      if (selectedBank && o.bank_id !== selectedBank) return false
      if (selectedCategory && o.category !== selectedCategory) return false
      return true
    })
  }, [offers, selectedBank, selectedCategory])

  const offerBankIds = new Set(offers.map((o) => o.bank_id))
  const relevantBanks = banks.filter((b) => offerBankIds.has(b.id))

  if (loading) {
    return (
      <div className="page-container space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Ofertas</h1>
        {[1, 2, 3].map((i) => (
          <div key={i} className="eliseo-card h-24 animate-pulse bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="page-container space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ofertas</h1>
        <p className="text-sm text-gray-500 mt-1">
          Promociones y descuentos activos de los bancos.
        </p>
      </div>

      {/* Bank filter */}
      {relevantBanks.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedBank(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !selectedBank
                ? 'bg-eliseo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {relevantBanks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(selectedBank === bank.id ? null : bank.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedBank === bank.id
                  ? 'bg-eliseo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {bank.short_name}
            </button>
          ))}
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.filter((c) => c.id !== 'general').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-eliseo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Offers list */}
      {filtered.length === 0 ? (
        <div className="eliseo-card p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-3">
            <Tag size={24} className="text-eliseo-400" />
          </div>
          <p className="text-sm text-gray-500">
            {offers.length === 0
              ? 'No hay ofertas disponibles por el momento.'
              : 'No hay ofertas con estos filtros.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((offer, i) => {
            const cat = CATEGORIES.find((c) => c.id === offer.category)
            const daysLeft = offer.valid_until
              ? Math.ceil((new Date(offer.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              : null

            const inner = (
              <>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: offer.bank.logo_color + '20' }}
                >
                  <span className="font-black text-xs" style={{ color: offer.bank.logo_color }}>
                    {offer.bank.short_name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900">{offer.title}</p>
                    {cat && (
                      <span className="text-[10px] bg-eliseo-50 text-eliseo-600 font-semibold px-1.5 py-0.5 rounded-full">
                        {cat.emoji} {cat.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{offer.description}</p>
                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    <span className="text-[11px] text-gray-400">{offer.bank.short_name}</span>
                    {daysLeft !== null && (
                      <span className={`text-[11px] font-medium flex items-center gap-1 ${
                        daysLeft <= 3 ? 'text-red-500' : daysLeft <= 7 ? 'text-amber-500' : 'text-gray-400'
                      }`}>
                        <Calendar size={10} />
                        {daysLeft <= 0 ? 'Vence hoy' : `${daysLeft} día${daysLeft !== 1 ? 's' : ''}`}
                      </span>
                    )}
                    {offer.confidence && <ConfidenceBadge level={offer.confidence} />}
                  </div>
                </div>
                {offer.url && (
                  <ExternalLink size={16} className="text-eliseo-400 flex-shrink-0 mt-0.5" aria-hidden />
                )}
              </>
            )

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`eliseo-card p-4 ${offer.url ? 'hover:shadow-card-hover transition-shadow' : ''}`}
              >
                {offer.url ? (
                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3"
                    aria-label={`${offer.title} — abrir en ${offer.bank.short_name}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-start gap-3">{inner}</div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
