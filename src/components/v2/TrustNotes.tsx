import type { CSSProperties } from 'react'
import Icon, { type IconName } from './Icon'

const NOTES: { glyph: IconName; text: string }[] = [
  { glyph: 'lock', text: 'Nunca pedimos tu número completo, CVV ni claves bancarias' },
  { glyph: 'eye', text: 'No vendemos tus datos (Ley 1581 — Habeas Data)' },
  { glyph: 'shield', text: 'Tus tarjetas solo las ves tú: cifrado y aislamiento por usuario' },
]

/** Bloque de confianza (patrón MaxRewards pantalla 21): 3 garantías escaneables. */
export default function TrustNotes({ style }: { style?: CSSProperties }) {
  return (
    <div className="card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 11, ...style }}>
      {NOTES.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
          <Icon name={n.glyph} size={17} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45 }}>{n.text}</span>
        </div>
      ))}
    </div>
  )
}
