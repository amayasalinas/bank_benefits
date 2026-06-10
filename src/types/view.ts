/**
 * View-model del diseño v2: la forma que esperan las pantallas del prototipo.
 * Se produce SIEMPRE vía toWalletView() (src/lib/walletView.ts) a partir de
 * UserCardJoined — mismo code path para mocks y Supabase real.
 */
import type { Benefit, BenefitCategory, PaymentProfile } from './database'
import type { ConfLevel } from '../components/v2/ConfidenceBadge'
import type { RewardKind } from '../components/v2/RewardChip'
import type { IconName } from '../components/v2/Icon'

export interface WalletCardView {
  /** id del catálogo (cards.id) */
  id: string
  /** id de la fila en cards_user */
  userCardId: string
  bankId: string
  issuer: string
  product: string
  network: string
  tier: string
  nickname: string
  last4: string
  isPrimary: boolean
  reward: RewardKind
  accent: string
  /** Cuota de manejo mensual en COP; null = desconocida (fee_note es la nota humana) */
  feeMonth: number | null
  feeNote: string | null
  noAnnualFee: boolean
  /** Valor económico estimado del año en COP (recompensas − cuota conocida). SIEMPRE etiquetar "estimado". */
  veoYear: number
  perks: string[]
  /** % efectivo en COP por categoría (tabla VE aplicada). Ausente = sin dato. */
  rates: Partial<Record<BenefitCategory, number>>
  /** Nivel de confianza por categoría + 'default' */
  conf: Partial<Record<BenefitCategory | 'default', ConfLevel>>
  paymentProfile: PaymentProfile
  /** false = la tarjeta no tiene benefits cargados; la UI muestra "datos en camino", nunca 0% */
  hasData: boolean
  /** Benefits crudos (para CardDetail) */
  benefits: Benefit[]
}

export interface MerchantView {
  id: string
  name: string
  cat: BenefitCategory
  /** Monto típico de compra en COP (semilla del estimado, ajustable en UI) */
  typical: number
  glyph: IconName
}

/** Promo por comercio×tarjeta. Fase 1: constantes front (src/data/merchants.ts); luego tabla. */
export interface PromoView {
  id: string
  merchantId: string
  /** La promo aplica a tarjetas de este banco… */
  bankId: string
  /** …y opcionalmente solo si el nombre del producto contiene este texto (case-insensitive) */
  cardNameIncludes?: string
  /** Puntos porcentuales efectivos extra sobre la tasa base */
  boost: number
  conf: ConfLevel
  note: string
  validDays: number
}

export interface RankedCard {
  card: WalletCardView
  baseRate: number
  rate: number
  saving: number
  promo: PromoView | null
  conf: ConfLevel
  reward: RewardKind
  /** true si la tarjeta es de perfil rotativo: el interés domina, no las recompensas */
  isRotativo: boolean
}
