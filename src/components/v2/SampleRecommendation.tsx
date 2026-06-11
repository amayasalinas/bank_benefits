import GlyphTile from './GlyphTile'
import ConfidenceBadge from './ConfidenceBadge'

interface SampleRecommendationProps {
  /** 'dark' = sobre héroe verde oscuro (Landing); 'light' = sobre papel (estados vacíos) */
  tone?: 'dark' | 'light'
  /** Muestra la etiqueta EJEMPLO (para estados vacíos dentro de la app) */
  exampleTag?: boolean
}

/**
 * La recomendación de muestra ("Crepes & Waffles → usa tu LifeMiles, ganas +$4.675").
 * Patrón MaxRewards pantallas 2-6 y 27-28: enseñar la UI real antes de pedir nada.
 */
export default function SampleRecommendation({ tone = 'dark', exampleTag = false }: SampleRecommendationProps) {
  const dark = tone === 'dark'
  const sub = dark ? 'rgba(246,245,240,0.5)' : 'var(--ink-faint)'
  const text = dark ? 'rgba(246,245,240,0.7)' : 'var(--ink-soft)'
  const strong = dark ? '#fff' : 'var(--ink)'
  return (
    <div style={{
      position: 'relative',
      background: dark ? 'rgba(246,245,240,0.06)' : 'var(--surface)',
      border: dark ? '1px solid rgba(246,245,240,0.12)' : '1px solid var(--line-soft)',
      borderRadius: 20, padding: 16,
      backdropFilter: dark ? 'blur(8px)' : undefined,
      boxShadow: dark ? undefined : 'var(--shadow-sm)',
      color: dark ? '#f6f5f0' : 'var(--ink)',
    }}>
      {exampleTag && (
        <span className="mono" style={{ position: 'absolute', top: -9, right: 14, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--paper)', padding: '3px 8px', borderRadius: 6 }}>Ejemplo</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
        <GlyphTile glyph="utensils" size={38} accent={dark ? 'var(--hero-accent)' : undefined} />
        <div style={{ flex: 1 }}>
          <div className="mono" style={{ fontSize: 10, color: sub, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Voy a pagar en</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Crepes &amp; Waffles</div>
        </div>
        <ConfidenceBadge level="ok" />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: text }}>Usa tu <strong style={{ color: strong }}>LifeMiles</strong></div>
          <div className="mono" style={{ fontSize: 11, color: sub, marginTop: 2 }}>4x millas vs 1% cashback</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 10, color: dark ? 'var(--hero-accent)' : 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ganas</div>
          <div className="tnum" style={{ fontSize: 24, fontWeight: 800, color: dark ? 'var(--hero-accent)' : 'var(--brand-deep)', letterSpacing: '-0.02em' }}>+$4.675</div>
        </div>
      </div>
    </div>
  )
}
