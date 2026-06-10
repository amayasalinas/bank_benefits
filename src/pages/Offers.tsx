import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchOffers } from '../lib/dataSource'
import type { Bank, Offer } from '../types/database'
import { toConfLevel } from '../lib/walletView'
import { CAT_V2 } from '../data/categories'
import Icon from '../components/v2/Icon'
import ScreenHeader from '../components/v2/ScreenHeader'
import ConfidenceBadge from '../components/v2/ConfidenceBadge'
import ChipRow from '../components/v2/ChipRow'

type OfferWithBank = Offer & { bank: Bank }

function daysLeft(validUntil: string | null): number | null {
  if (!validUntil) return null
  const diff = new Date(validUntil + 'T23:59:59').getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / 86_400_000))
}

function expiryLabel(o: Offer): { text: string; urgent: boolean } {
  const d = daysLeft(o.valid_until)
  if (d == null) return { text: 'Permanente', urgent: false }
  if (d <= 7) return { text: `Vence en ${d} día${d === 1 ? '' : 's'}`, urgent: d <= 3 }
  const date = new Date(o.valid_until + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
  return { text: `Hasta ${date}`, urgent: false }
}

export default function Offers() {
  const navigate = useNavigate()
  const [offers, setOffers] = useState<OfferWithBank[]>([])
  const [loading, setLoading] = useState(true)
  const [bank, setBank] = useState('all')
  const [cat, setCat] = useState('all')

  useEffect(() => {
    fetchOffers().then(({ offers }) => {
      setOffers(offers)
      setLoading(false)
    })
  }, [])

  const banksInUse = useMemo(() => {
    const ids = [...new Set(offers.map((o) => o.bank_id))]
    return ids.map((id) => offers.find((o) => o.bank_id === id)!.bank)
  }, [offers])
  const catsInUse = useMemo(() => [...new Set(offers.map((o) => o.category))], [offers])

  const list = offers.filter((o) => (bank === 'all' || o.bank_id === bank) && (cat === 'all' || o.category === cat))

  return (
    <div className="screen">
      <ScreenHeader title="Ofertas" subtitle="Promociones vigentes" large
        right={
          <button className="tap" onClick={() => navigate('/destacados')} aria-label="Destacados" style={{ width: 40, height: 40, borderRadius: 13, border: 'none', background: 'var(--brand-deep)', color: 'var(--on-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="star" size={19} />
          </button>
        } />

      {/* filtros */}
      <div style={{ padding: '14px 0 4px' }}>
        <ChipRow value={cat} onChange={setCat}
          items={[['all', 'Todas'], ...catsInUse.map((c) => [c, CAT_V2[c]?.label ?? c] as [string, string])]} />
        <ChipRow value={bank} onChange={setBank} style={{ marginTop: 8 }}
          items={[['all', 'Todos los bancos'], ...banksInUse.map((b) => [b.id, b.short_name] as [string, string])]} />
      </div>

      <div style={{ padding: '10px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loading && <div className="skel" style={{ height: 140, borderRadius: 18 }} />}

        {!loading && list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px 20px' }}>
            <Icon name="tag" size={30} style={{ color: 'var(--ink-faint)' }} />
            <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 10 }}>Sin ofertas con estos filtros</div>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 5 }}>Prueba con otra categoría u otro banco.</p>
          </div>
        )}

        {!loading && list.map((o, i) => {
          const exp = expiryLabel(o)
          return (
            <a key={o.id}
               href={o.url ?? o.bank.website}
               target="_blank" rel="noopener noreferrer"
               className="tap fade-up"
               style={{ animationDelay: `${i * 0.04}s`, display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 18, padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `color-mix(in oklab, ${o.bank.logo_color} 16%, white)`, color: o.bank.logo_color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{o.bank.name[0]}</div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', flex: 1 }}>{o.bank.name}</span>
                <ConfidenceBadge level={toConfLevel(o.confidence)} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{o.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 5, lineHeight: 1.45 }}>{o.description}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 13, paddingTop: 12, borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: exp.urgent ? 'var(--warn)' : 'var(--ink-faint)' }}>
                  <Icon name="calendar" size={14} />
                  <span className="mono" style={{ fontSize: 11 }}>{exp.text}</span>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}>Activar <Icon name="arrowUpR" size={16} /></span>
              </div>
            </a>
          )
        })}
      </div>
      <div style={{ height: 24 }} />
    </div>
  )
}
