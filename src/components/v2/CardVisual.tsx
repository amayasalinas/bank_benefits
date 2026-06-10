import type { CSSProperties } from 'react'
import RewardChip, { type RewardKind } from './RewardChip'
import { COP } from '../../lib/format'

/** Datos mínimos para pintar una tarjeta (los satisface WalletCardView) */
export interface CardVisualData {
  issuer: string
  product: string
  network: string
  tier: string
  nickname: string
  last4: string
  reward: RewardKind
  accent: string
  veoYear: number
  isPrimary?: boolean
}

interface CardVisualProps {
  card: CardVisualData
  style?: CSSProperties
  onClick?: () => void
  compact?: boolean
}

/** Tarjeta de crédito, tratamiento "matte" (el default congelado del prototipo) */
export default function CardVisual({ card, style = {}, onClick, compact = false }: CardVisualProps) {
  const a = card.accent
  const face = 'linear-gradient(150deg, #232521 0%, #16140f 60%, #100f0b 100%)'
  const ink = '#f6f5f0'
  const sub = 'rgba(246,245,240,0.6)'
  const line = 'rgba(246,245,240,0.12)'
  const h = compact ? 150 : 212
  return (
    <div className={onClick ? 'tap' : ''} onClick={onClick} style={{
      position: 'relative', width: '100%', height: h, borderRadius: 20,
      background: face, overflow: 'hidden', color: ink,
      boxShadow: '0 10px 30px rgba(20,18,12,0.32)',
      ...style,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: a, opacity: 0.95 }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(140% 120% at 110% -10%, ${a}22 0%, transparent 45%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', height: '100%', padding: compact ? '18px 18px' : '22px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: compact ? 15 : 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{card.issuer}</div>
            <div className="mono" style={{ fontSize: 10.5, color: sub, marginTop: 2, letterSpacing: '0.02em' }}>{card.product}</div>
          </div>
          {card.isPrimary && (
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: ink, opacity: 0.85, border: `1px solid ${line}`, padding: '3px 7px', borderRadius: 6 }}>Principal</span>
          )}
        </div>

        {!compact && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RewardChip reward={card.reward} />
            {card.veoYear > 0 && <span className="mono" style={{ fontSize: 11, color: sub }}>{COP(card.veoYear)}/año</span>}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: ink, opacity: 0.95 }}>{card.nickname}</div>
            <div className="mono" style={{ fontSize: 13, color: sub, marginTop: 3, letterSpacing: '0.12em' }}>•••• {card.last4}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: ink, fontStyle: 'italic', letterSpacing: '0.02em' }}>{card.network}</div>
            <div className="mono" style={{ fontSize: 9.5, color: sub, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{card.tier}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
