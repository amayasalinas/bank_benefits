import Icon, { type IconName } from './Icon'

interface GlyphTileProps {
  glyph: IconName
  size?: number
  accent?: string
  soft?: boolean
  iconSize?: number
}

export default function GlyphTile({ glyph, size = 44, accent, soft = true, iconSize }: GlyphTileProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: soft ? (accent ? `color-mix(in oklab, ${accent} 13%, white)` : 'var(--brand-tint)') : (accent || 'var(--brand-deep)'),
      color: soft ? (accent || 'var(--brand)') : 'white',
    }}>
      <Icon name={glyph} size={iconSize || size * 0.5} stroke={1.8} />
    </div>
  )
}
