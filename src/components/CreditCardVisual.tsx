import type { Card, Bank } from '../types'
import { TIER_LABELS } from '../types'

interface Props {
  card: Card
  bank: Bank
  size?: 'sm' | 'md' | 'lg'
  showLastFour?: string
  className?: string
  onClick?: () => void
}

const FRANCHISE_LOGOS: Record<string, JSX.Element> = {
  Visa: (
    <svg viewBox="0 0 60 20" className="h-5 fill-white">
      <text x="0" y="18" fontSize="22" fontWeight="bold" fontFamily="Arial" letterSpacing="-1">VISA</text>
    </svg>
  ),
  Mastercard: (
    <div className="flex items-center">
      <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
      <div className="w-6 h-6 rounded-full bg-[#F79E1B] -ml-3 opacity-90" />
    </div>
  ),
  Amex: (
    <svg viewBox="0 0 100 30" className="h-5 fill-white">
      <text x="0" y="24" fontSize="18" fontWeight="bold" fontFamily="Arial" letterSpacing="2">AMEX</text>
    </svg>
  ),
  Diners: (
    <svg viewBox="0 0 120 30" className="h-5 fill-white">
      <text x="0" y="24" fontSize="14" fontWeight="bold" fontFamily="Arial" letterSpacing="1">DINERS</text>
    </svg>
  ),
}

export default function CreditCardVisual({ card, bank, size = 'md', showLastFour, className = '', onClick }: Props) {
  const dims = {
    sm: 'w-36 h-[86px] rounded-xl',
    md: 'w-72 h-[170px] rounded-2xl',
    lg: 'w-full max-w-sm h-[195px] rounded-2xl',
  }

  const text = {
    sm: { bank: 'text-[8px]', name: 'text-[7px]', tier: 'text-[6px]', number: 'text-[9px]' },
    md: { bank: 'text-sm', name: 'text-[11px]', tier: 'text-[10px]', number: 'text-base' },
    lg: { bank: 'text-base', name: 'text-xs', tier: 'text-[11px]', number: 'text-lg' },
  }

  return (
    <div
      className={`${dims[size]} relative overflow-hidden shadow-float select-none transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : ''} ${className}`}
      style={{ background: card.gradient }}
      onClick={onClick}
    >
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -right-4 -bottom-12 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute left-4 -bottom-8 w-24 h-24 rounded-full bg-white/5" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <div
              className={`font-black text-white ${text[size].bank} leading-tight`}
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {bank.short_name}
            </div>
            {size !== 'sm' && (
              <div className={`text-white/70 ${text[size].tier} mt-0.5`}>
                {TIER_LABELS[card.tier] || card.tier}
              </div>
            )}
          </div>
          {/* Chip */}
          <div className={`${size === 'sm' ? 'w-5 h-3.5' : 'w-8 h-6'} rounded bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-90`} />
        </div>

        {/* Middle: card number */}
        {size !== 'sm' && (
          <div className={`text-white font-mono ${text[size].number} tracking-widest opacity-90`}>
            {showLastFour
              ? `•••• •••• •••• ${showLastFour}`
              : '•••• •••• •••• ••••'}
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div className={`text-white/80 ${text[size].name} font-medium`}>{card.name}</div>
          <div>{FRANCHISE_LOGOS[card.franchise] || null}</div>
        </div>
      </div>
    </div>
  )
}
