import type { CSSProperties, ReactNode } from 'react'
import Icon from './Icon'

interface SectionProps {
  label?: string
  action?: string
  onAction?: () => void
  children: ReactNode
  style?: CSSProperties
}

export default function Section({ label, action, onAction, children, style }: SectionProps) {
  return (
    <div style={{ padding: '0 20px', ...style }}>
      {(label || action) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          {label && <div className="eyebrow">{label}</div>}
          {action && (
            <button className="tap" onClick={onAction} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontSize: 12.5, fontWeight: 600, color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: 3 }}>
              {action}<Icon name="chevronR" size={13} />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
