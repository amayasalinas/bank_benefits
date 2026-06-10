/**
 * Capa de acceso a datos del catálogo y ofertas.
 * Centraliza la decisión Supabase vs. mock en un solo lugar:
 * cuando VITE_USE_MOCKS === 'true' devuelve fixtures y NO toca Supabase.
 */
import { supabase } from './supabase'
import { mockBanks, mockCards, mockOffers, mockFeatured } from '../mocks/fixtures'
import type { Bank, Card, CardWithBank, FeaturedCard, FeaturedCardRow, Offer } from '../types/database'

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

export async function fetchBanks(): Promise<Bank[]> {
  if (USE_MOCKS) {
    return [...mockBanks].sort((a, b) => a.name.localeCompare(b.name))
  }
  const { data } = await supabase.from('banks').select('*').order('name')
  return data ?? []
}

export async function fetchCardsByBank(bankId: string): Promise<Card[]> {
  if (USE_MOCKS) {
    return mockCards
      .filter((c) => c.bank_id === bankId)
      .sort((a, b) => a.name.localeCompare(b.name))
  }
  const { data } = await supabase
    .from('cards')
    .select('*')
    .eq('bank_id', bankId)
    .order('name')
  return data ?? []
}

export async function fetchOffers(): Promise<{
  offers: (Offer & { bank: Bank })[]
  banks: Bank[]
}> {
  if (USE_MOCKS) {
    const banksById = new Map(mockBanks.map((b) => [b.id, b]))
    const offers = mockOffers
      .map((o) => ({ ...o, bank: banksById.get(o.bank_id)! }))
      .sort((a, b) => (a.valid_until ?? '9999').localeCompare(b.valid_until ?? '9999'))
    return { offers, banks: [...mockBanks] }
  }
  const [offersRes, banksRes] = await Promise.all([
    supabase
      .from('offers')
      .select('*, bank:banks(*)')
      .or('valid_until.gte.now(),valid_until.is.null')
      .order('valid_until', { ascending: true }),
    supabase.from('banks').select('*').order('name'),
  ])
  return {
    offers: (offersRes.data as (Offer & { bank: Bank })[]) ?? [],
    banks: banksRes.data ?? [],
  }
}

/**
 * Tarjetas destacadas ("Mejores del mercado") — tabla featured_cards
 * (supabase/migration_v2.sql), curaduría con CTA de afiliado.
 * Si la tabla aún no existe en el proyecto, devuelve [] (estado vacío).
 */
export async function fetchFeatured(): Promise<FeaturedCard[]> {
  if (USE_MOCKS) return mockFeatured
  const { data, error } = await supabase
    .from('featured_cards')
    .select('*, card:cards(*, bank:banks(*))')
    .order('rank', { ascending: true })
  if (error || !data) return []
  return (data as (FeaturedCardRow & { card: CardWithBank })[]).map((r) => ({
    card: r.card,
    reason: r.reason,
    highlight: r.highlight,
    applyUrl: r.apply_url,
  }))
}
