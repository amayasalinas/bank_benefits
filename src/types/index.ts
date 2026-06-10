export interface Bank {
  id: string
  name: string
  short_name: string
  logo_color: string
  logo_text: string
  website: string
  loyalty_program: string
  is_digital: boolean
}

export interface Card {
  id: string
  bank_id: string
  bank?: Bank
  name: string
  franchise: 'Visa' | 'Mastercard' | 'Amex' | 'Diners'
  type: 'credit' | 'debit'
  tier: 'classic' | 'gold' | 'platinum' | 'black' | 'infinite' | 'signature' | 'digital' | 'premium' | 'standard' | 'cashback'
  annual_fee_note: string
  has_no_annual_fee: boolean
  gradient: string
  benefits?: CardBenefit[]
}

export interface CardBenefit {
  id: string
  card_id: string
  category: BenefitCategory
  title: string
  description: string
  value: number | null
  value_type: 'cashback_percent' | 'points_multiplier' | 'lounge_access' | 'discount_percent' | 'fixed_benefit'
  conditions: string
}

export type BenefitCategory =
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
  | 'general'

export interface UserCard {
  id: string
  user_id: string
  card_id: string
  card?: Card
  nickname: string
  last_four: string
  is_primary: boolean
  created_at: string
}

export interface Promotion {
  id: string
  bank_id: string | null
  card_id: string | null
  bank?: Bank
  card?: Card
  title: string
  description: string
  discount_value: string
  category: BenefitCategory
  valid_until: string | null
  url: string
  is_active: boolean
}

export interface CategoryInfo {
  id: BenefitCategory
  name: string
  icon: string
  emoji: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'general', name: 'General', icon: 'Star', emoji: '⭐' },
  { id: 'cashback', name: 'Cashback', icon: 'RotateCcw', emoji: '💰' },
  { id: 'puntos', name: 'Puntos / Millas', icon: 'Award', emoji: '🏆' },
  { id: 'viajes', name: 'Viajes', icon: 'Plane', emoji: '✈️' },
  { id: 'restaurantes', name: 'Restaurantes', icon: 'Utensils', emoji: '🍽️' },
  { id: 'entretenimiento', name: 'Entretenimiento', icon: 'Music', emoji: '🎬' },
  { id: 'supermercados', name: 'Supermercados', icon: 'ShoppingCart', emoji: '🛒' },
  { id: 'combustible', name: 'Combustible', icon: 'Fuel', emoji: '⛽' },
  { id: 'streaming', name: 'Streaming', icon: 'Tv', emoji: '📺' },
  { id: 'moda', name: 'Moda', icon: 'Shirt', emoji: '👗' },
  { id: 'seguros', name: 'Seguros', icon: 'Shield', emoji: '🛡️' },
]

export const TIER_LABELS: Record<string, string> = {
  classic: 'Clásica',
  gold: 'Gold',
  platinum: 'Platinum',
  black: 'Black',
  infinite: 'Infinite',
  signature: 'Signature',
  digital: 'Digital',
  premium: 'Premium',
  standard: 'Estándar',
  cashback: 'Cashback',
}

export const FRANCHISE_COLORS: Record<string, string> = {
  Visa: '#1A1F71',
  Mastercard: '#EB001B',
  Amex: '#016FD0',
  Diners: '#004A97',
}
