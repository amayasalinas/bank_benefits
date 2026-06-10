export default function Fact({ label, value, tone }: { label: string; value: string; tone?: 'brand' }) {
  return (
    <div className="card" style={{ padding: '13px 15px' }}>
      <div className="eyebrow">{label}</div>
      <div className="tnum" style={{ fontSize: 15.5, fontWeight: 700, marginTop: 4, color: tone === 'brand' ? 'var(--brand-deep)' : 'var(--ink)' }}>{value}</div>
    </div>
  )
}
