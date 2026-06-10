import type { CSSProperties } from 'react'

interface ChipRowProps {
  value: string
  onChange: (v: string) => void
  items: [string, string][]
  style?: CSSProperties
}

export default function ChipRow({ value, onChange, items, style }: ChipRowProps) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none', ...style }}>
      {items.map(([v, l]) => (
        <button key={v} className={'chip' + (value === v ? ' active' : '')} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  )
}
