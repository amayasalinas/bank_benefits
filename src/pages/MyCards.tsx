import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserCards } from '../hooks/useUserCards'
import { toWalletViews } from '../lib/walletView'
import { COP } from '../lib/format'
import Icon from '../components/v2/Icon'
import ScreenHeader from '../components/v2/ScreenHeader'
import CardVisual from '../components/v2/CardVisual'

export default function MyCards() {
  const navigate = useNavigate()
  const { cards, loading } = useUserCards()
  const wallet = useMemo(() => toWalletViews(cards), [cards])
  const walletValue = wallet.reduce((s, c) => s + c.veoYear, 0)

  // Recomendación de portafolio: tarjeta cuya cuota conocida supera su aporte anual
  const reviewCard = wallet.find((c) => c.feeMonth != null && c.feeMonth > 0 && c.hasData && c.veoYear < c.feeMonth * 12)

  return (
    <div className="screen">
      <ScreenHeader title="Mis tarjetas" subtitle={`${wallet.length} en tu billetera · ${COP(walletValue)}/año est.`} large
        right={
          <button className="tap" onClick={() => navigate('/add-card')} aria-label="Agregar tarjeta" style={{ width: 40, height: 40, borderRadius: 13, border: 'none', background: 'var(--brand-deep)', color: 'var(--on-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="plus" size={22} />
          </button>
        } />

      {reviewCard && (
        <div style={{ padding: '18px 20px 6px' }}>
          <div style={{ display: 'flex', gap: 12, padding: '14px', borderRadius: 16, background: 'var(--info-tint)', border: '1px solid color-mix(in oklab, var(--info) 22%, white)' }}>
            <Icon name="scale" size={22} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'oklch(0.40 0.09 245)' }}>Revisa tu {reviewCard.product}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2, lineHeight: 1.4 }}>
                Aporta ~{COP(reviewCard.veoYear)}/año pero su cuota suma {COP((reviewCard.feeMonth ?? 0) * 12)}. Úsala solo donde rinde o considera cancelarla (ojo: cancelar afecta tu historial).
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading && <div className="skel" style={{ height: 212, borderRadius: 20 }} />}

        {!loading && wallet.map((c, i) => (
          <div key={c.userCardId} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <CardVisual card={c} onClick={() => navigate(`/card-detail/${c.userCardId}`)} />
          </div>
        ))}

        {!loading && (
          <button className="tap" onClick={() => navigate('/add-card')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '20px', borderRadius: 18, border: '1.5px dashed var(--line)', background: 'transparent', color: 'var(--ink-soft)', cursor: 'pointer', font: 'inherit', fontWeight: 600, fontSize: 15 }}>
            <Icon name="plus" size={20} /> {wallet.length === 0 ? 'Agregar mi primera tarjeta' : 'Agregar otra tarjeta'}
          </button>
        )}
      </div>
      <div style={{ height: 24 }} />
    </div>
  )
}
