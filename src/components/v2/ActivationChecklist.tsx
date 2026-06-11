import { useNavigate } from 'react-router-dom'
import type { ActivationStep } from '../../lib/activation'
import Icon from './Icon'

/**
 * Checklist de primeros pasos (patrón MaxRewards pantalla 24):
 * progreso visible, paso siguiente con CTA, futuros con candado suave.
 */
export default function ActivationChecklist({ steps, name }: { steps: ActivationStep[]; name?: string }) {
  const navigate = useNavigate()
  const doneCount = steps.filter((s) => s.done).length
  const progress = Math.round((doneCount / steps.length) * 100)
  const nextId = steps.find((s) => !s.done)?.id

  return (
    <div className="card pop-in" style={{ padding: '18px 18px 8px' }}>
      <div style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: '-0.01em' }}>
        {name ? `¡Bienvenido, ${name}!` : '¡Bienvenido!'}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.45 }}>
        Completa estos pasos y empieza a recuperar plata en cada compra.
      </p>

      {/* barra de progreso */}
      <div style={{ height: 7, borderRadius: 999, background: 'var(--line-soft)', marginTop: 12, overflow: 'hidden' }}>
        <div style={{ width: `${Math.max(progress, 6)}%`, height: '100%', borderRadius: 999, background: 'var(--brand)', transition: 'width .4s ease' }} />
      </div>

      <div style={{ marginTop: 6 }}>
        {steps.map((s, i) => {
          const isNext = s.id === nextId
          const locked = !s.done && !isNext
          return (
            <div key={s.id} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: i < steps.length - 1 ? '1px solid var(--line-soft)' : 'none', opacity: locked ? 0.55 : 1 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: s.done ? 'var(--brand)' : 'var(--surface)',
                border: s.done ? 'none' : `1.5px solid ${isNext ? 'var(--brand)' : 'var(--line)'}`,
                color: 'var(--on-brand)',
              }}>
                {s.done ? <Icon name="check" size={14} stroke={2.4} /> : locked ? <Icon name="lock" size={12} style={{ color: 'var(--ink-faint)' }} /> : null}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: s.done ? 'var(--ink-soft)' : 'var(--ink)', textDecoration: s.done ? 'line-through' : 'none', textDecorationColor: 'var(--line)' }}>{s.title}</div>
                {isNext && s.detail && <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2, lineHeight: 1.4 }}>{s.detail}</div>}
                {isNext && s.to && s.cta && (
                  <button className="tap" onClick={() => navigate(s.to!)} style={{ marginTop: 9, padding: '9px 16px', borderRadius: 999, border: 'none', background: 'var(--brand-tint)', color: 'var(--brand-deep)', fontWeight: 700, fontSize: 13, cursor: 'pointer', font: 'inherit' }}>
                    {s.cta}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
