import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { UserCard, Card, Bank, Benefit } from '../types/database'

export interface UserCardJoined extends UserCard {
  card: Card & { bank: Bank }
  benefits: Benefit[]
}

export function useUserCards() {
  const { user } = useAuth()
  const [cards, setCards] = useState<UserCardJoined[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCards = useCallback(async () => {
    if (!user) {
      setCards([])
      setLoading(false)
      return
    }

    setLoading(true)
    const { data: userCards, error } = await supabase
      .from('cards_user')
      .select(`
        *,
        card:cards (
          *,
          bank:banks (*)
        )
      `)
      .eq('user_id', user.id)
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: false })

    if (error || !userCards) {
      setCards([])
      setLoading(false)
      return
    }

    const cardIds = userCards.map((uc: any) => uc.card_id)

    const { data: benefits } = await supabase
      .from('benefits')
      .select('*')
      .in('card_id', cardIds)

    const benefitsByCard = (benefits ?? []).reduce<Record<string, Benefit[]>>((acc, b) => {
      if (!acc[b.card_id]) acc[b.card_id] = []
      acc[b.card_id].push(b)
      return acc
    }, {})

    const joined: UserCardJoined[] = userCards.map((uc: any) => ({
      ...uc,
      benefits: benefitsByCard[uc.card_id] ?? [],
    }))

    setCards(joined)
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const addCard = async (cardId: string, nickname?: string, lastFour?: string, isPrimary?: boolean) => {
    if (!user) return { error: new Error('Not authenticated') }

    if (isPrimary) {
      await supabase
        .from('cards_user')
        .update({ is_primary: false })
        .eq('user_id', user.id)
    }

    const { error } = await supabase.from('cards_user').insert({
      user_id: user.id,
      card_id: cardId,
      nickname: nickname || null,
      last_four: lastFour || null,
      is_primary: isPrimary ?? false,
    })

    if (!error) await fetchCards()
    return { error }
  }

  const removeCard = async (userCardId: string) => {
    const { error } = await supabase
      .from('cards_user')
      .delete()
      .eq('id', userCardId)

    if (!error) await fetchCards()
    return { error }
  }

  const setPrimary = async (userCardId: string) => {
    if (!user) return

    await supabase
      .from('cards_user')
      .update({ is_primary: false })
      .eq('user_id', user.id)

    await supabase
      .from('cards_user')
      .update({ is_primary: true })
      .eq('id', userCardId)

    await fetchCards()
  }

  return { cards, loading, fetchCards, addCard, removeCard, setPrimary }
}
