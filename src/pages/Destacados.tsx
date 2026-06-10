import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchFeatured } from '../lib/dataSource'
import type { FeaturedCard } from '../mocks/fixtures'
import { TIER_LABELS } from '../types/database'
import Icon from '../components/v2/Icon'
import ScreenHeader from '../components/v2/ScreenHeader'
import Btn from '../components/v2/Btn'

export default function Destacados() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState<FeaturedCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatured().then((f) => {
      setFeatured(f)
      setLoading(false)
    })
  }, [])

  return (
    <div className="screen">
      <ScreenHeader title="Mejores del mercado" subtitle="Lo que más te conviene" onBack={() => navigate('/offers')} />
      <div style={{ padding: '8px 20px 0' }}>
        {/* cláusula de transparencia (PRD §4) */}
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', padding: '13px 14px', borderRadius: 14, background: 'var(--brand-tint)', marginBottom: 18 }}>
          <Icon name="shield" size={18} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: 'oklch(0.40 0.08 162)', lineHeight: 1.45 }}>
            Te mostramos lo mejor para ti aunque no nos pague comisión. Marcamos cuándo ganamos por referirte. Esa es la regla.
          </p>
        </div>

        {loading && <div className="skel" style={{ height: 220, borderRadius: 22 }} />}

        {!loading && featured.length === 0 && (
          <div className="card" style={{ padding: '30px 20px', textAlign: 'center' }}>
            <Icon name="star" size={28} style={{ color: 'var(--ink-faint)' }} />
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>Estamos curando los destacados</div>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 5, lineHeight: 1.45 }}>
              Comparamos el mercado con la regla de doble fuente antes de recomendarte una tarjeta nueva. Muy pronto.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {featured.map((d, i) => {
            const accent = d.card.bank.logo_color
            const fee = d.card.no_annual_fee ? '$0 cuota' : (d.card.fee_note ?? 'Cuota según banco')
            return (
              <div key={d.card.id} className="card fade-up" style={{ overflow: 'hidden', animationDelay: `${i * 0.06}s` }}>
                <div style={{ padding: '16px 18px', background: `linear-gradient(135deg, color-mix(in oklab, ${accent} 13%, white), var(--surface))` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, background: `color-mix(in oklab, ${accent} 16%, white)`, padding: '4px 9px', borderRadius: 7 }}>{d.reason}</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{fee}</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 12 }}>{d.card.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>
                    {d.card.bank.name} · {d.card.franchise} {TIER_LABELS[d.card.tier] ?? d.card.tier}
                  </div>
                  <div className="tnum" style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-deep)', marginTop: 10 }}>{d.highlight}</div>
                </div>
                <div style={{ padding: '14px 18px 18px' }}>
                  <a href={d.applyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Btn block variant="primary" iconR="arrowUpR">Solicitar con {d.card.bank.short_name}</Btn>
                  </a>
                  <p className="mono" style={{ fontSize: 9.5, color: 'var(--ink-faint)', marginTop: 8, textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Enlace de afiliado</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  )
}
