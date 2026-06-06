import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ExternalLink, Sparkles } from 'lucide-react'
import { fetchFeatured } from '../lib/dataSource'
import { TIER_LABELS, type Card, type Bank } from '../types/database'
import type { FeaturedCard } from '../mocks/fixtures'

export default function Destacados() {
  const [featured, setFeatured] = useState<FeaturedCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatured().then((data) => {
      setFeatured(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="page-container space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Mejores del mercado</h1>
        {[1, 2, 3].map((i) => (
          <div key={i} className="eliseo-card h-40 animate-pulse bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="page-container space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mejores del mercado</h1>
        <p className="text-sm text-gray-500 mt-1">
          Tarjetas recomendadas según para qué las quieras. Comparamos todas, no las de un solo banco.
        </p>
      </div>

      {featured.length === 0 ? (
        <div className="eliseo-card p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-eliseo-50 flex items-center justify-center mx-auto mb-3">
            <Sparkles size={24} className="text-eliseo-400" />
          </div>
          <p className="text-sm text-gray-500">
            Aún no hay tarjetas destacadas disponibles. Vuelve pronto.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {featured.map((f, i) => {
            const card: Card & { bank: Bank } = f.card
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="eliseo-card overflow-hidden"
              >
                {/* Visual de la tarjeta */}
                <div className="p-5 text-white" style={{ background: card.bank.logo_color }}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Trophy size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wide">{f.reason}</span>
                  </div>
                  <p className="text-white/70 text-xs">{card.bank.short_name}</p>
                  <p className="font-bold text-lg">{card.name}</p>
                  <p className="text-white/60 text-[11px] mt-1">
                    {card.franchise} · {TIER_LABELS[card.tier]}
                    {card.no_annual_fee && ' · Sin cuota'}
                  </p>
                </div>

                {/* Gancho + CTA */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-700">{f.highlight}</p>
                  <a
                    href={f.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eliseo-btn-primary w-full flex items-center justify-center gap-2 text-sm"
                    aria-label={`Solicitar ${card.name} en ${card.bank.short_name}`}
                  >
                    Solicítala
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
