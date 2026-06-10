import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUserCards } from '../hooks/useUserCards'
import { toWalletViews } from '../lib/walletView'
import { recommend } from '../lib/recommend'
import { MERCHANTS, PROMOS } from '../data/merchants'
import { CAT_V2 } from '../data/categories'
import { COP } from '../lib/format'
import { REWARD_LABEL } from '../components/v2/RewardChip'
import type { MerchantView } from '../types/view'
import Icon from '../components/v2/Icon'
import GlyphTile from '../components/v2/GlyphTile'
import ScreenHeader from '../components/v2/ScreenHeader'
import ConfidenceBadge from '../components/v2/ConfidenceBadge'
import Btn from '../components/v2/Btn'
import { useToast } from '../components/v2/Toast'

const stepBtn: React.CSSProperties = {
  width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line)',
  background: 'var(--surface)', color: 'var(--ink)', fontSize: 20, fontWeight: 600,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
}

export default function Recommender() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { cards, loading } = useUserCards()
  const { showToast } = useToast()
  const wallet = useMemo(() => toWalletViews(cards), [cards])

  const [merchant, setMerchant] = useState<MerchantView | null>(null)
  const [amount, setAmount] = useState(0)
  const [query, setQuery] = useState('')
  const [computing, setComputing] = useState(false)
  const [used, setUsed] = useState(false)

  const pick = (m: MerchantView) => {
    setMerchant(m)
    setAmount(m.typical)
    setUsed(false)
    setComputing(true)
    setTimeout(() => setComputing(false), 750)
  }

  // categoría preseleccionada desde el dashboard (?cat=)
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && !merchant) {
      const m = MERCHANTS.find((x) => x.cat === cat)
      if (m) pick(m)
      setSearchParams({}, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = () => { setMerchant(null); setQuery(''); setUsed(false) }

  if (!loading && wallet.length === 0) {
    return (
      <div className="screen">
        <ScreenHeader title="¿Qué tarjeta uso?" subtitle="Recomendador" large />
        <div style={{ padding: '30px 20px', textAlign: 'center' }}>
          <GlyphTile glyph="cards" size={56} iconSize={26} />
          <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>Primero, tus tarjetas</h2>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
            Para decirte cuál usar necesitamos saber qué tarjetas tienes.
          </p>
          <Btn variant="primary" style={{ marginTop: 20 }} icon="plus" onClick={() => navigate('/add-card?onboarding=1')}>Agregar tarjeta</Btn>
        </div>
      </div>
    )
  }

  // ── Vista de entrada ──
  if (!merchant) {
    const filtered = MERCHANTS.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
    return (
      <div className="screen">
        <ScreenHeader title="¿Qué tarjeta uso?" subtitle="Recomendador" large />
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <Icon name="search" size={20} style={{ position: 'absolute', left: 15, top: 16, color: 'var(--ink-faint)' }} />
            <input className="field" style={{ paddingLeft: 46, fontSize: 16.5 }} placeholder="Voy a pagar en…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="eyebrow" style={{ marginBottom: 12 }}>{query ? 'Resultados' : 'Comercios frecuentes'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((m) => (
              <button key={m.id} className="tap" onClick={() => pick(m)} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 14px', borderRadius: 15, border: '1px solid var(--line-soft)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
                <GlyphTile glyph={m.glyph} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 1 }}>{CAT_V2[m.cat]?.label} · ~{COP(m.typical)}</div>
                </div>
                <Icon name="arrowR" size={18} style={{ color: 'var(--brand)' }} />
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <Icon name="search" size={30} style={{ color: 'var(--ink-faint)' }} />
                <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 10 }}>Aún no tenemos “{query}”</div>
                <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 5, lineHeight: 1.4 }}>
                  Te confirmamos sus beneficios en menos de 24 h. Nunca inventamos un dato.
                </p>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    )
  }

  // ── Resultado ──
  const ranked = recommend(merchant, wallet, PROMOS).map((r) => ({ ...r, saving: amount * (r.rate / 100) }))
  const top = ranked[0]
  const runner = ranked[1]

  return (
    <div className="screen" style={{ background: 'var(--paper)' }}>
      <ScreenHeader title={merchant.name} subtitle={CAT_V2[merchant.cat]?.label} onBack={reset} />

      {/* monto */}
      <div style={{ padding: '18px 20px 0' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div className="eyebrow">Monto de la compra</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="tap" aria-label="Menos" onClick={() => setAmount((a) => Math.max(10000, a - 10000))} style={stepBtn}>–</button>
            <span className="tnum" style={{ fontSize: 18, fontWeight: 700, minWidth: 96, textAlign: 'center' }}>{COP(amount)}</span>
            <button className="tap" aria-label="Más" onClick={() => setAmount((a) => a + 10000)} style={stepBtn}>+</button>
          </div>
        </div>
      </div>

      {computing || loading ? (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div className="skel" style={{ height: 160, borderRadius: 24, marginBottom: 14 }} />
          <div className="mono fade-in" style={{ fontSize: 12, color: 'var(--ink-faint)', letterSpacing: '0.05em' }}>Comparando tus {wallet.length} tarjetas…</div>
        </div>
      ) : (
        <div className="pop-in" style={{ padding: '18px 20px 0' }}>
          {/* advertencia rotativo */}
          {top.isRotativo && (
            <div style={{ display: 'flex', gap: 10, padding: '13px 14px', borderRadius: 14, background: 'var(--warn-tint)', marginBottom: 14 }}>
              <Icon name="info" size={18} style={{ color: 'var(--warn)', flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12.5, color: 'oklch(0.45 0.09 70)', lineHeight: 1.45 }}>
                Todas tus tarjetas son de perfil rotativo: el interés pesa más que cualquier recompensa. Prioriza pagar el total o usar la de tasa más baja.
              </p>
            </div>
          )}

          {/* RESULTADO ESTRELLA */}
          <div style={{ borderRadius: 24, padding: '22px', background: 'linear-gradient(160deg, var(--hero-a) 0%, var(--hero-b) 100%)', color: '#f6f5f0', boxShadow: '0 16px 38px rgba(20,40,30,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="eyebrow" style={{ color: 'var(--hero-accent)' }}>Usa esta tarjeta</span>
              <ConfidenceBadge level={top.conf} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{top.card.issuer}</div>
                <div className="mono" style={{ fontSize: 12, color: 'rgba(246,245,240,0.65)', marginTop: 2 }}>{top.card.product} · •••• {top.card.last4}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--hero-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ganas</div>
                <div className="tnum" style={{ fontSize: 30, fontWeight: 800, color: 'var(--hero-accent)', letterSpacing: '-0.02em', lineHeight: 1 }}>+{COP(top.saving)}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'rgba(246,245,240,0.6)', marginTop: 2 }}>{top.rate.toFixed(1)}% {REWARD_LABEL[top.reward]}</div>
              </div>
            </div>
            {/* por qué */}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(246,245,240,0.14)', fontSize: 13, color: 'rgba(246,245,240,0.82)', lineHeight: 1.5 }}>
              {runner && runner.saving > 0
                ? <>Le gana a tu <strong style={{ color: '#fff' }}>{runner.card.issuer}</strong> ({runner.rate.toFixed(1)}%) por {COP(top.saving - runner.saving)} en esta compra.</>
                : 'Mejor opción de tu billetera para esta categoría.'}
              {top.promo && (
                <div style={{ marginTop: 8, display: 'flex', gap: 7, alignItems: 'flex-start', color: 'var(--hero-accent)' }}>
                  <Icon name="zap" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 12.5 }}>{top.promo.note}</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button className="tap" onClick={() => { if (!used) { setUsed(true); showToast('¡Listo! Ahorro registrado: ' + COP(top.saving)) } }} style={{ flex: 1, padding: '13px', borderRadius: 13, border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 700, fontSize: 14.5, background: used ? 'color-mix(in oklab, var(--hero-accent) 22%, transparent)' : '#f6f5f0', color: used ? 'var(--hero-accent)' : '#16140f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                {used ? <><Icon name="check" size={17} /> Registrada</> : 'La usé'}
              </button>
              <button className="tap" onClick={reset} style={{ padding: '13px 18px', borderRadius: 13, border: '1px solid rgba(246,245,240,0.25)', background: 'transparent', color: '#f6f5f0', cursor: 'pointer', font: 'inherit', fontWeight: 600, fontSize: 14.5 }}>Otra</button>
            </div>
          </div>

          {/* alternativas */}
          {ranked.length > 1 && (
            <>
              <div className="eyebrow" style={{ margin: '24px 0 12px' }}>Tus otras tarjetas</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ranked.slice(1).map((r) => (
                  <div key={r.card.userCardId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 15, background: 'var(--surface)', border: '1px solid var(--line-soft)', opacity: 0.92 }}>
                    <div style={{ width: 30, height: 20, borderRadius: 5, background: r.card.accent, flexShrink: 0, opacity: 0.85 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{r.card.issuer}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 1 }}>
                        {r.isRotativo ? 'Rotativo · prioriza tasa baja' : `${r.rate.toFixed(1)}% ${REWARD_LABEL[r.reward]}`}
                      </div>
                    </div>
                    <span className="tnum" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)' }}>+{COP(r.saving)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', margin: '20px 4px 0' }}>
            <Icon name="shield" size={16} style={{ color: 'var(--ink-faint)', flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 11.5, color: 'var(--ink-faint)', lineHeight: 1.5 }}>
              Comparamos las {wallet.length} tarjetas de tu billetera, sin importar el banco. No recomendamos por comisión.
            </p>
          </div>
        </div>
      )}
      <div style={{ height: 24 }} />
    </div>
  )
}
