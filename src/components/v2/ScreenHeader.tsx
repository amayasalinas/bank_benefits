import type { ReactNode } from 'react'
import Icon from './Icon'

interface ScreenHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  right?: ReactNode
  large?: boolean
}

export default function ScreenHeader({ title, subtitle, onBack, right, large = false }: ScreenHeaderProps) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'oklch(0.984 0.005 95 / 0.86)', backdropFilter: 'blur(14px) saturate(180%)',
      WebkitBackdropFilter: 'blur(14px) saturate(180%)',
      padding: 'calc(18px + env(safe-area-inset-top, 0px)) 20px 14px',
      borderBottom: '1px solid var(--line-soft)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button className="tap" onClick={onBack} aria-label="Atrás" style={{
            width: 38, height: 38, borderRadius: 12, border: '1px solid var(--line)',
            background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', cursor: 'pointer' }}>
            <Icon name="chevronL" size={20} />
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {subtitle && <div className="eyebrow" style={{ marginBottom: 3 }}>{subtitle}</div>}
          <div style={{ fontSize: large ? 26 : 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</div>
        </div>
        {right}
      </div>
    </div>
  )
}
