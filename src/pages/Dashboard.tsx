import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useUserCards } from '../hooks/useUserCards'
import { toWalletViews } from '../lib/walletView'
import { COP } from '../lib/format'
import { CATEGORIES_V2 } from '../data/categories'
import Icon from '../components/v2/Icon'
import GlyphTile from '../components/v2/GlyphTile'
import Section from '../components/v2/Section'
import ConfidenceBadge from '../components/v2/ConfidenceBadge'
import Btn from '../components/v2/Btn'

const iconBtn: React.CSSProperties = {
  position: 'relative', width: 40, height: 40, borderRadius: 13,
  border: '1px solid var(--line)', background: 'var(--surface)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--ink)', cursor: 'pointer',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cards, loading } = useUserCards()
  const wallet = useMemo(() => toWalletViews(cards), [cards])

  const walletValue = wallet.reduce((s, c) => s + c.veoYear, 0)
  const monthly = Math.round(walletValue / 12)
  const coveredCats = new Set(wallet.flatMap((c) => Object.keys(c.rates))).size

  const fullName = (user?.user_metadata?.full_name as string | undefined) || user?.email?.split('@')[0] || ''
  const firstName = fullName.split(' ')[0]
  const initial = (firstName[0] || 'E').toUpperCase()
  const today = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })

  if (loading) {
    return (
      <div className="screen">
        <div style={{ padding: 'calc(40px + env(safe-area-inset-top, 0px)) 20px' }}>
          <div className="skel" style={{ height: 56, borderRadius: 16, marginBottom: 16 }} />
          <div className="skel" style={{ height: 180, borderRadius: 24 }} />
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      {/* barra superior */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'calc(26px + env(safe-area-inset-top, 0px)) 20px 16px' }}>
        <div>
          <div className="eyebrow" style={{ textTransform: 'capitalize' }}>{today}</div>
          <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 2 }}>Hola{firstName ? `, ${firstName}` : ''}</div>
        </div>
        <div style={{ display: 'flex', gap: 9 }}>
          <button className="tap" onClick={() => navigate('/offers')} aria-label="Ofertas" style={iconBtn}>
            <Icon name="bell" size={20} />
            <span style={{ position: 'absolute', top: 9, right: 9, width: 7, height: 7, borderRadius: '50%', background: 'var(--warn)', border: '1.5px solid var(--surface)' }} />
          </button>
          <button className="tap" onClick={() => navigate('/profile')} aria-label="Perfil" style={{ ...iconBtn, background: 'var(--brand-deep)', color: 'var(--on-brand)', fontWeight: 800, fontSize: 15, fontFamily: 'var(--font-sans)' }}>{initial}</button>
        </div>
      </div>

      {wallet.length === 0 ? (
        /* estado vacío: primera tarjeta */
        <div style={{ padding: '10px 20px 0' }}>
          <div className="card pop-in" style={{ padding: '28px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GlyphTile glyph="cards" size={56} iconSize={26} />
            <h2 style={{ fontSize: 19, fontWeight: 700, marginTop: 16, letterSpacing: '-0.01em' }}>Tu billetera está vacía</h2>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
              Agrega tu primera tarjeta y descubre cuánto valor tienes sin usar. Solo banco y modelo — nunca el número completo.
            </p>
            <Btn block variant="primary" style={{ marginTop: 20 }} icon="plus" onClick={() => navigate('/add-card?onboarding=1')}>
              Agregar mi primera tarjeta
            </Btn>
          </div>
        </div>
      ) : (
        <>
          {/* héroe de valor */}
          <div style={{ margin: '0 20px', borderRadius: 24, padding: '22px 22px 20px', background: 'linear-gradient(155deg, var(--hero-a) 0%, var(--hero-b) 100%)', color: '#f6f5f0', boxShadow: '0 14px 34px rgba(20,40,30,0.28)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="eyebrow" style={{ color: 'var(--hero-accent)' }}>Potencial estimado / mes</div>
              <ConfidenceBadge level="warn">Estimado</ConfidenceBadge>
            </div>
            <div className="tnum" style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>{COP(monthly)}</div>
            <div style={{ fontSize: 13.5, color: 'rgba(246,245,240,0.7)', marginTop: 7 }}>Lo que tus tarjetas pueden devolverte si las usas bien.</div>
            <div style={{ display: 'flex', gap: 20, marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(246,245,240,0.14)' }}>
              <div>
                <div className="tnum" style={{ fontSize: 18, fontWeight: 700 }}>{COP(walletValue)}</div>
                <div className="mono" style={{ fontSize: 9.5, color: 'rgba(246,245,240,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Valor / año</div>
              </div>
              <div>
                <div className="tnum" style={{ fontSize: 18, fontWeight: 700 }}>{wallet.length}</div>
                <div className="mono" style={{ fontSize: 9.5, color: 'rgba(246,245,240,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Tarjetas</div>
              </div>
              <div>
                <div className="tnum" style={{ fontSize: 18, fontWeight: 700 }}>{coveredCats}</div>
                <div className="mono" style={{ fontSize: 9.5, color: 'rgba(246,245,240,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Categorías</div>
              </div>
            </div>
          </div>

          {/* CTA recomendador — el momento estrella */}
          <div style={{ padding: '18px 20px 0' }}>
            <button className="tap" onClick={() => navigate('/recommender')} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 18,
              border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', font: 'inherit', boxShadow: 'var(--shadow-sm)' }}>
              <GlyphTile glyph="wand" size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>¿Qué tarjeta uso?</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 1 }}>Dime dónde vas a pagar</div>
              </div>
              <Icon name="arrowR" size={20} style={{ color: 'var(--brand)' }} />
            </button>
          </div>

          {/* categorías rápidas */}
          <Section label="Optimiza por categoría" style={{ marginTop: 26 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {CATEGORIES_V2.slice(1, 9).map((c) => (
                <button key={c.id} className="tap" onClick={() => navigate(`/recommender?cat=${c.id}`)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, padding: '14px 4px', borderRadius: 16, border: '1px solid var(--line-soft)', background: 'var(--surface)', cursor: 'pointer', font: 'inherit' }}>
                  <Icon name={c.glyph} size={22} style={{ color: 'var(--brand-deep)' }} />
                  <span style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.15 }}>{c.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* mejores del mercado */}
          <Section label="Para ti" action="Ver destacados" onAction={() => navigate('/destacados')} style={{ marginTop: 26 }}>
            <button className="tap" onClick={() => navigate('/destacados')} style={{ width: '100%', display: 'flex', gap: 14, padding: '16px', borderRadius: 18, border: '1px solid var(--line)', background: 'linear-gradient(135deg, color-mix(in oklab, var(--gold) 14%, white), var(--surface))', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
              <GlyphTile glyph="star" size={44} accent="var(--gold)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>Las mejores del mercado</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2 }}>Mira qué tarjeta completaría tu billetera — comparadas sin comisión de por medio.</div>
              </div>
            </button>
          </Section>
        </>
      )}

      <div style={{ height: 24 }} />
    </div>
  )
}
