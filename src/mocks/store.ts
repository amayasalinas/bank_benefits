/**
 * Store en memoria de la cartera del usuario para modo mock.
 * Persiste mientras la pestaña está abierta (estado a nivel de módulo),
 * así las operaciones add/remove/setPrimary se reflejan al navegar.
 */
import type { UserCardWithDetails } from '../types/database'
import { mockBanks, mockCards, mockBenefits, initialWallet, MOCK_USER } from './fixtures'

interface WalletRow {
  id: string
  card_id: string
  nickname: string | null
  last_four: string | null
  is_primary: boolean
}

let wallet: WalletRow[] = initialWallet.map((r) => ({ ...r }))
let idCounter = wallet.length

function bankById(id: string) {
  return mockBanks.find((b) => b.id === id)!
}

function join(row: WalletRow): UserCardWithDetails | null {
  const card = mockCards.find((c) => c.id === row.card_id)
  if (!card) return null
  return {
    id: row.id,
    user_id: MOCK_USER.id,
    card_id: row.card_id,
    nickname: row.nickname,
    last_four: row.last_four,
    is_primary: row.is_primary,
    created_at: '2026-01-01T00:00:00.000Z',
    card: { ...card, bank: bankById(card.bank_id) },
    benefits: mockBenefits.filter((b) => b.card_id === row.card_id),
  }
}

export function getUserCards(): UserCardWithDetails[] {
  return wallet
    .map(join)
    .filter((c): c is UserCardWithDetails => c !== null)
    .sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
}

export function addUserCard(
  cardId: string,
  nickname?: string,
  lastFour?: string,
  isPrimary?: boolean
) {
  if (isPrimary) wallet.forEach((r) => (r.is_primary = false))
  idCounter += 1
  wallet.push({
    id: `uc-mock-${idCounter}`,
    card_id: cardId,
    nickname: nickname || null,
    last_four: lastFour || null,
    is_primary: isPrimary ?? false,
  })
}

export function removeUserCard(userCardId: string) {
  wallet = wallet.filter((r) => r.id !== userCardId)
}

export function setPrimaryUserCard(userCardId: string) {
  wallet.forEach((r) => (r.is_primary = r.id === userCardId))
}
