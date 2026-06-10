interface WordmarkProps {
  size?: number
  color?: string
  mark?: boolean
}

export default function Wordmark({ size = 22, color = 'var(--brand-deep)', mark = true }: WordmarkProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.42 }}>
      {mark && (
        <div style={{ width: size * 1.18, height: size * 1.18, borderRadius: size * 0.34, background: 'var(--brand-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: size * 0.5, height: size * 0.5, borderRadius: '50%', border: `${Math.max(2, size * 0.11)}px solid var(--on-brand)`, borderRightColor: 'transparent', transform: 'rotate(-45deg)' }} />
        </div>
      )}
      <span style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.03em', color }}>eliseo</span>
    </div>
  )
}
