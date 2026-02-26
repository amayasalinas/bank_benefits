import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getCardById, getBankById, getBenefitsByCard } from '../data/banks'
import type { UserCard } from '../types'
import { useAuth } from './useAuth'

export function useUserCards() {
  const { user } = useAuth()
  const [userCards, setUserCards] = useState<UserCard[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCards = useCallback(async () => {
    if (!user) { setUserCards([]); return }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('user_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      const enriched: UserCard[] = (data || []).map(uc => {
        const card = getCardById(uc.card_id)
        const bank = card ? getBankById(card.bank_id) : undefined
        const benefits = card ? getBenefitsByCard(card.id) : []
        return {
          ...uc,
          card: card ? { ...card, bank, benefits } : undefined,
        } as UserCard
      }).filter(uc => uc.card)

      setUserCards(enriched)
    } catch (e) {
      console.error('Error fetching user cards:', e)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const addCard = async (cardId: string, nickname?: string, lastFour?: string) => {
    if (!user) return { error: 'No autenticado' }

    // Check if already added
    const existing = userCards.find(uc => uc.card_id === cardId)
    if (existing) return { error: 'Esta tarjeta ya está en tu cartera' }

    const { error } = await supabase.from('user_cards').insert({
      user_id: user.id,
      card_id: cardId,
      nickname: nickname || '',
      last_four: lastFour || '',
      is_primary: userCards.length === 0,
    })

    if (error) return { error: error.message }
    await fetchCards()
    return { error: null }
  }

  const removeCard = async (userCardId: string) => {
    const { error } = await supabase
      .from('user_cards')
      .delete()
      .eq('id', userCardId)

    if (error) return { error: error.message }
    await fetchCards()
    return { error: null }
  }

  const setPrimary = async (userCardId: string) => {
    if (!user) return
    // Unset all primaries
    await supabase.from('user_cards').update({ is_primary: false }).eq('user_id', user.id)
    // Set new primary
    await supabase.from('user_cards').update({ is_primary: true }).eq('id', userCardId)
    await fetchCards()
  }

  return { userCards, loading, addCard, removeCard, setPrimary, refetch: fetchCards }
}
