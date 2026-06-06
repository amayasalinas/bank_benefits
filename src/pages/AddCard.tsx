import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Check, CreditCard } from 'lucide-react'
import { fetchBanks, fetchCardsByBank } from '../lib/dataSource'
import { useUserCards } from '../hooks/useUserCards'
import type { Bank, Card } from '../types/database'
import { TIER_LABELS } from '../types/database'

type Step = 'bank' | 'card' | 'details'

export default function AddCard() {
  const navigate = useNavigate()
  const { addCard } = useUserCards()

  const [step, setStep] = useState<Step>('bank')
  const [banks, setBanks] = useState<Bank[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [search, setSearch] = useState('')
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [nickname, setNickname] = useState('')
  const [lastFour, setLastFour] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBanks().then(setBanks)
  }, [])

  useEffect(() => {
    if (!selectedBank) return
    fetchCardsByBank(selectedBank.id).then(setCards)
  }, [selectedBank])

  const filteredBanks = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.short_name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank)
    setSearch('')
    setStep('card')
  }

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card)
    setStep('details')
  }

  const handleSave = async () => {
    if (!selectedCard) return
    setSaving(true)
    const { error } = await addCard(
      selectedCard.id,
      nickname || undefined,
      lastFour || undefined,
      isPrimary
    )
    setSaving(false)
    if (!error) {
      navigate('/my-cards', { replace: true })
    }
  }

  const handleBack = () => {
    if (step === 'details') {
      setSelectedCard(null)
      setStep('card')
    } else if (step === 'card') {
      setSelectedBank(null)
      setCards([])
      setStep('bank')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="page-container space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Agregar tarjeta</h1>
          <p className="text-xs text-gray-500">
            {step === 'bank' && 'Selecciona tu banco'}
            {step === 'card' && `Tarjetas de ${selectedBank?.short_name}`}
            {step === 'details' && 'Detalles opcionales'}
          </p>
        </div>
      </div>

      {/* Step: Bank */}
      {step === 'bank' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar banco..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            {filteredBanks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleSelectBank(bank)}
                className="w-full eliseo-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow text-left"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: bank.logo_color + '20' }}
                >
                  <span className="font-black text-sm" style={{ color: bank.logo_color }}>
                    {bank.short_name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{bank.name}</p>
                  {bank.loyalty_program && (
                    <p className="text-xs text-gray-500">{bank.loyalty_program}</p>
                  )}
                </div>
                {bank.is_digital && (
                  <span className="text-[10px] font-semibold text-eliseo-500 bg-eliseo-50 px-2 py-0.5 rounded-full">
                    Digital
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step: Card */}
      {step === 'card' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleSelectCard(card)}
              className="w-full eliseo-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <CreditCard size={18} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{card.name}</p>
                <p className="text-xs text-gray-500">
                  {card.franchise} · {TIER_LABELS[card.tier]} · {card.type === 'credito' ? 'Credito' : 'Debito'}
                </p>
              </div>
              {card.no_annual_fee && (
                <span className="text-[10px] font-semibold text-mint-500 bg-mint-50 px-2 py-0.5 rounded-full">
                  Sin cuota
                </span>
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Step: Details */}
      {step === 'details' && selectedCard && selectedBank && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Card preview */}
          <div
            className="rounded-2xl p-5 text-white"
            style={{ background: selectedBank.logo_color }}
          >
            <p className="text-white/70 text-xs">{selectedBank.short_name}</p>
            <p className="font-bold text-lg mt-1">{selectedCard.name}</p>
            <p className="text-white/60 text-xs mt-3">
              {selectedCard.franchise} · {TIER_LABELS[selectedCard.tier]}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Apodo (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Mi tarjeta principal"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, 40))}
                className="input-field"
                maxLength={40}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Ultimos 4 digitos (opcional)
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="1234"
                value={lastFour}
                onChange={(e) => setLastFour(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="input-field"
                maxLength={4}
              />
            </div>
            <label className="flex items-center gap-3 eliseo-card p-4 cursor-pointer">
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  isPrimary
                    ? 'bg-eliseo-500 border-eliseo-500'
                    : 'border-gray-300'
                }`}
              >
                {isPrimary && <Check size={14} className="text-white" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Tarjeta principal</p>
                <p className="text-xs text-gray-500">Se mostrara primero en tu dashboard</p>
              </div>
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="eliseo-btn-primary w-full disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar tarjeta'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
