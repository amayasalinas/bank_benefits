export type Franchise = 'Visa' | 'Mastercard' | 'Amex' | 'Diners'

export type CardType = 'credito' | 'debito'

export type CardTier =
  | 'classic'
  | 'standard'
  | 'gold'
  | 'platinum'
  | 'signature'
  | 'black'
  | 'infinite'
  | 'digital'
  | 'cashback'
  | 'premium'

export type BenefitCategory =
  | 'general'
  | 'cashback'
  | 'puntos'
  | 'viajes'
  | 'restaurantes'
  | 'entretenimiento'
  | 'supermercados'
  | 'combustible'
  | 'streaming'
  | 'moda'
  | 'seguros'

export type ValueType =
  | 'cashback_percent'
  | 'points_multiplier'
  | 'lounge_access'
  | 'discount_percent'
  | 'fixed_benefit'

export interface Bank {
  id: string
  name: string
  short_name: string
  loyalty_program: string | null
  is_digital: boolean
  website: string
  logo_color: string
  cards_url: string
}

export interface Card {
  id: string
  bank_id: string
  name: string
  franchise: Franchise
  type: CardType
  tier: CardTier
  no_annual_fee: boolean
  fee_note: string | null
  bank_url: string
  franchise_benefits_url: string | null
}

export interface Benefit {
  id: string
  card_id: string
  bank_id: string
  card_name: string
  category: BenefitCategory
  title: string
  description: string
  numeric_value: number | null
  value_type: ValueType
  value_label: string
  conditions: string | null
  source: string | null
  status: string
}

export interface FranchiseBenefit {
  id: string | null
  franchise: Franchise
  min_tier: CardTier
  applies_higher_tiers: boolean
  category: BenefitCategory
  title: string
  description: string
  numeric_value: number | null
  value_type: ValueType
  value_label: string
  conditions: string | null
  applies_colombia: boolean
  source_url: string | null
}

export interface UserCard {
  id: string
  user_id: string
  card_id: string
  nickname: string | null
  last_four: string | null
  is_primary: boolean
  created_at: string
}

export interface Offer {
  id: string
  bank_id: string
  title: string
  description: string
  category: BenefitCategory
  valid_until: string | null
}

export interface CategoryInfo {
  id: BenefitCategory
  name: string
  emoji: string
  description: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'general', name: 'General', emoji: '🔧', description: 'Beneficio sin categoria especifica' },
  { id: 'cashback', name: 'Cashback', emoji: '💰', description: 'Devolucion en efectivo sobre el valor de la compra' },
  { id: 'puntos', name: 'Puntos / Millas', emoji: '🏆', description: 'Acumulacion de puntos o millas canjeables' },
  { id: 'viajes', name: 'Viajes', emoji: '✈️', description: 'Beneficios para viajeros' },
  { id: 'restaurantes', name: 'Restaurantes', emoji: '🍽️', description: 'Descuentos o puntos especiales en gastronomia' },
  { id: 'entretenimiento', name: 'Entretenimiento', emoji: '🎬', description: 'Cines, conciertos, eventos' },
  { id: 'supermercados', name: 'Supermercados', emoji: '🛒', description: 'Descuentos en compras de mercado' },
  { id: 'combustible', name: 'Combustible', emoji: '⛽', description: 'Devoluciones en gasolineras' },
  { id: 'streaming', name: 'Streaming', emoji: '📺', description: 'Beneficios en plataformas digitales' },
  { id: 'moda', name: 'Moda', emoji: '👗', description: 'Descuentos en tiendas de ropa' },
  { id: 'seguros', name: 'Seguros', emoji: '🛡️', description: 'Coberturas de viaje, compra, medica' },
]

export const TIER_HIERARCHY: Record<CardTier, number> = {
  classic: 1,
  standard: 2,
  gold: 3,
  platinum: 4,
  signature: 5,
  black: 5,
  infinite: 6,
  digital: 0,
  cashback: 0,
  premium: 0,
}

export const TIER_LABELS: Record<CardTier, string> = {
  classic: 'Clasica',
  standard: 'Estandar',
  gold: 'Gold',
  platinum: 'Platinum',
  signature: 'Signature',
  black: 'Black',
  infinite: 'Infinite',
  digital: 'Digital',
  cashback: 'Cashback',
  premium: 'Premium',
}

// Joined types for UI
export interface CardWithBank extends Card {
  bank: Bank
}

export interface UserCardWithDetails extends UserCard {
  card: CardWithBank
  benefits: Benefit[]
}
