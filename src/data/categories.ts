/** Las 11 categorías del PRD con su glifo del set de iconos v2. */
import type { BenefitCategory } from '../types/database'
import type { IconName } from '../components/v2/Icon'

export interface CategoryV2 {
  id: BenefitCategory
  label: string
  glyph: IconName
}

export const CATEGORIES_V2: CategoryV2[] = [
  { id: 'general',         label: 'General',         glyph: 'wrench' },
  { id: 'cashback',        label: 'Cashback',        glyph: 'coins' },
  { id: 'puntos',          label: 'Puntos / Millas', glyph: 'trophy' },
  { id: 'viajes',          label: 'Viajes',          glyph: 'plane' },
  { id: 'restaurantes',    label: 'Restaurantes',    glyph: 'utensils' },
  { id: 'entretenimiento', label: 'Entretenimiento', glyph: 'ticket' },
  { id: 'supermercados',   label: 'Supermercados',   glyph: 'cart' },
  { id: 'combustible',     label: 'Combustible',     glyph: 'fuel' },
  { id: 'streaming',       label: 'Streaming',       glyph: 'tv' },
  { id: 'moda',            label: 'Moda',            glyph: 'shirt' },
  { id: 'seguros',         label: 'Seguros',         glyph: 'shield' },
]

export const CAT_V2: Record<string, CategoryV2> = Object.fromEntries(
  CATEGORIES_V2.map((c) => [c.id, c])
)
