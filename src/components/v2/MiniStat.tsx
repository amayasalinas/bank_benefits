export default function MiniStat({ value, label, tone }: { value: string; label: string; tone?: 'brand' }) {
  return (
    <div className="card" style={{ flex: 1, padding: '12px 13px' }}>
      <div className="tnum" style={{ fontSize: 17, fontWeight: 700, color: tone === 'brand' ? 'var(--brand-deep)' : 'var(--ink)' }}>{value}</div>
      <div className="eyebrow" style={{ marginTop: 3 }}>{label}</div>
    </div>
  )
}
