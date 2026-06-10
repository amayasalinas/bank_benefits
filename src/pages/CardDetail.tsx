import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserCards } from '../hooks/useUserCards'
import { toWalletViews } from '../lib/walletView'
import { COP } from '../lib/format'
import { CATEGORIES_V2 } from '../data/categories'
import Icon from '../components/v2/Icon'
import ScreenHeader from '../components/v2/ScreenHeader'
import CardVisual from '../components/v2/CardVisual'
import ConfidenceBadge from '../components/v2/ConfidenceBadge'
import Section from '../components/v2/Section'
import Btn from '../components/v2/Btn'
import Fact from '../components/v2/Fact'
import { useToast } from '../components/v2/Toast'

const REWARD_FACT: Record<string, string> = { millas: 'Millas', cashback: 'Cashback', puntos: 'Puntos' }

export default function CardDetail() {
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const { cards, loading, removeCard, setPrimary } = useUserCards()
  const { showToast } = useToast()
  const [confirmRemove, setConfirmRemove] = useState(false)

  const wallet = useMemo(() => toWalletViews(cards), [cards])
  // Acepta tanto el id de cards_user como el id de catálogo (links viejos)
  const card = wallet.find((c) => c.userCardId === cardId) ?? wallet.find((c) => c.id === cardId)

  if (loading) {
    return (
      <div className="screen">
        <div style={{ padding: 'calc(40px + env(safe-area-inset-top, 0px)) 20px' }}>
          <div className="skel" style={{ height: 212, borderRadius: 20 }} />
        </div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="screen">
        <ScreenHeader title="Tarjeta" onBack={() => navigate('/my-cards')} />
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>No encontramos esta tarjeta en tu billetera.</p>
          <Btn variant="outline" style={{ marginTop: 16 }} onClick={() => navigate('/my-cards')}>Volver a mis tarjetas</Btn>
        </div>
      </div>
    )
  }

  const benefitCats = CATEGORIES_V2
    .filter((c) => (card.rates[c.id] ?? 0) > 0)
    .sort((a, b) => (card.rates[b.id] ?? 0) - (card.rates[a.id] ?? 0))

  const feeValue = card.feeMonth === 0 ? 'Sin cuota' : card.feeMonth != null ? `${COP(card.feeMonth)}/mes` : (card.feeNote ?? 'Según tu banco')

  const handleRemove = async () => {
    if (!confirmRemove) {
      setConfirmRemove(true)
      return
    }
    await removeCard(card.userCardId)
    showToast('Tarjeta eliminada de tu billetera')
    navigate('/my-cards')
  }

  return (
    <div className="screen">
      <ScreenHeader title={card.product} subtitle={card.issuer} onBack={() => navigate('/my-cards')}
        right={<ConfidenceBadge level={card.hasData ? 'ok' : 'warn'}>{card.hasData ? 'Confirmado' : 'En curación'}</ConfidenceBadge>} />

      <div style={{ padding: '18px 20px 0' }}>
        <CardVisual card={card} />
      </div>

      {/* hechos clave */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 20px 0' }}>
        <Fact label="Valor estimado" value={card.hasData ? `${COP(card.veoYear)}/año` : '—'} tone="brand" />
        <Fact label="Cuota de manejo" value={feeValue} />
        <Fact label="Recompensa" value={REWARD_FACT[card.reward]} />
        <Fact label="Perfil de pago" value={card.paymentProfile === 'totalero' ? 'Totalero · interés 0' : 'Rotativo'} />
      </div>

      {/* beneficios por categoría */}
      <Section label="Beneficios por categoría" style={{ marginTop: 26 }}>
        {benefitCats.length > 0 ? (
          <>
            <div className="card" style={{ overflow: 'hidden' }}>
              {benefitCats.map((c, i) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < benefitCats.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                  <Icon name={c.glyph} size={19} style={{ color: 'var(--ink-soft)', flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{c.label}</span>
                  <ConfidenceBadge level={card.conf[c.id] ?? card.conf.default ?? 'warn'} />
                  <span className="tnum" style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-deep)', minWidth: 46, textAlign: 'right' }}>{(card.rates[c.id] ?? 0).toFixed(1)}%</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 10, lineHeight: 1.45 }}>
              % efectivo en pesos: millas y puntos ya normalizados con su valor real de redención (tabla VE).
            </p>
          </>
        ) : (
          <div className="card" style={{ padding: '22px 18px', textAlign: 'center' }}>
            <Icon name="sparkles" size={24} style={{ color: 'var(--ink-faint)' }} />
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Datos en camino</div>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.45 }}>
              Estamos validando los beneficios de esta tarjeta con doble fuente. Nunca te mostraremos un dato inventado.
            </p>
          </div>
        )}
      </Section>

      {/* incluye */}
      {card.perks.length > 0 && (
        <Section label="Incluye" style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {card.perks.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <Icon name="checkCircle" size={19} style={{ color: 'var(--ok)', flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.4 }}>{p}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      <div style={{ padding: '26px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn block variant="outline" icon="wand" onClick={() => navigate('/recommender')}>¿Dónde conviene usarla?</Btn>
        {!card.isPrimary && (
          <Btn block variant="ghost" icon="star" onClick={async () => { await setPrimary(card.userCardId); showToast('Marcada como principal') }}>
            Hacerla mi principal
          </Btn>
        )}
        <button className="tap" onClick={handleRemove} style={{ padding: '13px', borderRadius: 999, border: 'none', background: 'transparent', color: confirmRemove ? '#c0322e' : 'var(--ink-faint)', cursor: 'pointer', font: 'inherit', fontWeight: 600, fontSize: 14 }}>
          {confirmRemove ? '¿Seguro? Toca de nuevo para eliminarla' : 'Quitar de mi billetera'}
        </button>
      </div>
      <div style={{ height: 24 }} />
    </div>
  )
}
