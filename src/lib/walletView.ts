/**
 * Adaptador central del diseño v2: UserCardJoined (hooks/useUserCards) →
 * WalletCardView (la forma que esperan las pantallas del prototipo).
 * Es el ÚNICO code path después de useUserCards: mocks y Supabase real
 * producen exactamente el mismo view-model.
 */
import type { Benefit, BenefitCategory, ConfidenceLevel } from '../types/database'
import { TIER_LABELS } from '../types/database'
import type { UserCardJoined } from '../hooks/useUserCards'
import type { WalletCardView } from '../types/view'
import type { ConfLevel } from '../components/v2/ConfidenceBadge'
import type { RewardKind } from '../components/v2/RewardChip'
import { ratePerMultiplier, estimateVeoYear } from './ve'

const CONF_MAP: Record<ConfidenceLevel, ConfLevel> = {
  confirmado: 'ok',
  probable: 'warn',
  accion: 'info',
}

export function toConfLevel(c: ConfidenceLevel | undefined): ConfLevel {
  return c ? CONF_MAP[c] : 'warn'
}

/**
 * % efectivo de un beneficio; null si no aporta tasa (es perk).
 * isAccrual distingue acumulación recurrente (cashback/puntos) de descuentos
 * situacionales (2x1, % dcto): ambos rankean en el recomendador, pero solo
 * la acumulación entra al estimado anual VEO (un 2x1 de cine no es un 50%
 * permanente del gasto en entretenimiento).
 */
function benefitRate(b: Benefit, loyaltyProgram: string | null): { rate: number; isAccrual: boolean } | null {
  if (b.numeric_value == null) return null
  switch (b.value_type) {
    case 'cashback_percent':
      return { rate: b.numeric_value, isAccrual: true }
    case 'points_multiplier':
      return { rate: b.numeric_value * ratePerMultiplier(`${loyaltyProgram ?? ''} ${b.title}`), isAccrual: true }
    case 'discount_percent':
      // Ahorro directo sobre la compra donde aplica
      return { rate: b.numeric_value, isAccrual: false }
    default:
      return null
  }
}

function deriveReward(cardName: string, loyaltyProgram: string | null, benefits: Benefit[]): RewardKind {
  const text = `${cardName} ${loyaltyProgram ?? ''}`.toLowerCase()
  if (text.includes('lifemiles') || text.includes('milla') || text.includes('aadvantage')) return 'millas'
  const hasPoints = benefits.some((b) => b.value_type === 'points_multiplier')
  if (loyaltyProgram && hasPoints) return 'puntos'
  const hasCashback = benefits.some((b) => b.value_type === 'cashback_percent')
  if (hasCashback) return 'cashback'
  return loyaltyProgram ? 'puntos' : 'cashback'
}

export function toWalletView(uc: UserCardJoined): WalletCardView {
  const { card, benefits } = uc
  const bank = card.bank

  const rates: Partial<Record<BenefitCategory, number>> = {}
  const accrualRates: Partial<Record<BenefitCategory, number>> = {}
  const conf: Partial<Record<BenefitCategory | 'default', ConfLevel>> = {}
  const perks: string[] = []

  for (const b of benefits) {
    const r = benefitRate(b, bank.loyalty_program)
    if (r == null) {
      // lounge_access / fixed_benefit / sin valor numérico → beneficio cualitativo
      perks.push(b.value_label && b.value_label !== b.title ? `${b.title} — ${b.value_label}` : b.title)
      continue
    }
    const rate = Math.round(r.rate * 10) / 10
    const prev = rates[b.category]
    if (prev == null || rate > prev) {
      rates[b.category] = rate
      conf[b.category] = toConfLevel(b.confidence)
    }
    if (r.isAccrual) {
      const prevA = accrualRates[b.category]
      if (prevA == null || rate > prevA) accrualRates[b.category] = rate
    }
  }

  // 'puntos' y 'cashback' son meta-categorías de acumulación base ("en todas
  // tus compras"): alimentan la tasa general si no hay una mejor explícita.
  for (const meta of ['puntos', 'cashback'] as const) {
    const m = rates[meta]
    if (m != null && (rates.general == null || m > rates.general)) {
      rates.general = m
      conf.general = conf[meta]
    }
    const ma = accrualRates[meta]
    if (ma != null && (accrualRates.general == null || ma > accrualRates.general)) {
      accrualRates.general = ma
    }
  }

  const hasData = benefits.length > 0
  conf.default = 'warn'

  const feeMonth = card.fee_month ?? (card.no_annual_fee ? 0 : null)

  return {
    id: card.id,
    userCardId: uc.id,
    bankId: bank.id,
    issuer: bank.short_name,
    product: card.name,
    network: card.franchise,
    tier: TIER_LABELS[card.tier] ?? card.tier,
    nickname: uc.nickname || card.name,
    last4: uc.last_four || '0000',
    isPrimary: uc.is_primary,
    reward: deriveReward(card.name, bank.loyalty_program, benefits),
    accent: bank.logo_color,
    feeMonth,
    feeNote: card.fee_note,
    noAnnualFee: card.no_annual_fee,
    veoYear: hasData ? estimateVeoYear(accrualRates, feeMonth) : 0,
    perks,
    rates,
    conf,
    paymentProfile: uc.payment_profile ?? 'totalero',
    hasData,
    benefits,
  }
}

export function toWalletViews(cards: UserCardJoined[]): WalletCardView[] {
  return cards.map(toWalletView)
}
