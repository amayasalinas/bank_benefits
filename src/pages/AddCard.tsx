import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, X, Search } from 'lucide-react'
import { BANKS, getCardsByBank } from '../data/banks'
import { useUserCards } from '../hooks/useUserCards'
import CreditCardVisual from '../components/CreditCardVisual'
import type { Bank, Card } from '../types'
import { TIER_LABELS } from '../types'

type Step = 'bank' | 'card' | 'details'

export default function AddCard() {
  const navigate = useNavigate()
  const { addCard, userCards } = useUserCards()

  const [step, setStep] = useState<Step>('bank')
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [nickname, setNickname] = useState('')
  const [lastFour, setLastFour] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bankSearch, setBankSearch] = useState('')

  const filteredBanks = BANKS.filter(b =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.short_name.toLowerCase().includes(bankSearch.toLowerCase())
  )

  const bankCards = selectedBank ? getCardsByBank(selectedBank.id) : []
  const addedCardIds = userCards.map(uc => uc.card_id)

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank)
    setSelectedCard(null)
    setStep('card')
  }

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card)
    setStep('details')
  }

  const handleAdd = async () => {
    if (!selectedCard) return
    setError(null)
    setLoading(true)
    const { error } = await addCard(selectedCard.id, nickname, lastFour)
    setLoading(false)
    if (error) {
      setError(error)
    } else {
      navigate('/my-cards')
    }
  }

  const STEPS_LABELS = { bank: 1, card: 2, details: 3 }
  const currentStep = STEPS_LABELS[step]

  return (
    <div className="max-w-2xl mx-auto px-4 pb-8 pt-4 min-h-screen">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: 'Banco' },
          { n: 2, label: 'Tarjeta' },
          { n: 3, label: 'Detalles' },
        ].map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
              currentStep > n ? 'bg-mint-500 text-white' :
              currentStep === n ? 'bg-eliseo-500 text-white' :
              'bg-gray-200 text-gray-400'
            }`}>
              {currentStep > n ? <Check size={14} /> : n}
            </div>
            <span className={`text-xs font-medium ${currentStep === n ? 'text-eliseo-600' : 'text-gray-400'}`}>
              {label}
            </span>
            {i < 2 && <div className={`flex-1 h-0.5 rounded ${currentStep > n ? 'bg-mint-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1: Select Bank */}
      {step === 'bank' && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-black text-gray-900 mb-1">Selecciona tu banco</h2>
          <p className="text-gray-500 text-sm mb-4">¿De qué banco es tu tarjeta?</p>

          <div className="relative mb-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar banco..."
              value={bankSearch}
              onChange={e => setBankSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Traditional banks */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Bancos tradicionales</p>
              <div className="space-y-2">
                {filteredBanks.filter(b => !b.is_digital).map(bank => (
                  <button
                    key={bank.id}
                    onClick={() => handleSelectBank(bank)}
                    className="w-full flex items-center gap-3 eliseo-card p-4 hover:shadow-card-hover hover:border-eliseo-200 transition-all duration-200 active:scale-[0.99] text-left"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: bank.logo_color }}
                    >
                      {bank.logo_text}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{bank.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{bank.loyalty_program}</div>
                    </div>
                    <div className="text-xs text-gray-300 flex-shrink-0">
                      {getCardsByBank(bank.id).length} tarjetas
                    </div>
                    <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Digital banks */}
            {filteredBanks.filter(b => b.is_digital).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 mt-4">Bancos digitales y fintech</p>
                <div className="space-y-2">
                  {filteredBanks.filter(b => b.is_digital).map(bank => (
                    <button
                      key={bank.id}
                      onClick={() => handleSelectBank(bank)}
                      className="w-full flex items-center gap-3 eliseo-card p-4 hover:shadow-card-hover hover:border-eliseo-200 transition-all duration-200 active:scale-[0.99] text-left"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: bank.logo_color }}
                      >
                        {bank.logo_text}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm">{bank.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{bank.loyalty_program}</div>
                      </div>
                      <div className="text-xs text-eliseo-400 font-medium flex-shrink-0 bg-eliseo-50 px-2 py-0.5 rounded-full">
                        Digital
                      </div>
                      <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Select Card */}
      {step === 'card' && selectedBank && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-sm"
              style={{ backgroundColor: selectedBank.logo_color }}
            >
              {selectedBank.logo_text}
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">{selectedBank.name}</h2>
              <p className="text-gray-500 text-sm">Selecciona tu tarjeta</p>
            </div>
          </div>

          <div className="space-y-3">
            {bankCards.map(card => {
              const isAdded = addedCardIds.includes(card.id)
              return (
                <button
                  key={card.id}
                  onClick={() => !isAdded && handleSelectCard(card)}
                  disabled={isAdded}
                  className={`w-full text-left transition-all duration-200 ${isAdded ? 'opacity-50 cursor-default' : 'active:scale-[0.99]'}`}
                >
                  <div className={`eliseo-card overflow-hidden ${!isAdded ? 'hover:shadow-card-hover hover:border-eliseo-200' : ''}`}>
                    <div className="flex items-center gap-4 p-4">
                      {/* Mini card visual */}
                      <div
                        className="w-16 h-10 rounded-lg flex-shrink-0 relative overflow-hidden"
                        style={{ background: card.gradient }}
                      >
                        <div className="absolute bottom-1 right-1 text-white/70 text-[8px] font-mono">
                          {card.franchise}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">{card.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">{card.franchise}</span>
                          <span className="text-gray-200">·</span>
                          <span className="text-xs text-gray-400 capitalize">{card.type === 'credit' ? 'Crédito' : 'Débito'}</span>
                          <span className="text-gray-200">·</span>
                          <span
                            className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                            style={{
                              background: card.tier === 'black' ? '#1a1a1a' :
                                card.tier === 'gold' ? '#DAA520' :
                                card.tier === 'platinum' ? '#667eea' :
                                card.tier === 'infinite' ? '#302b63' :
                                '#E8E9F5',
                              color: ['black', 'gold', 'platinum', 'infinite', 'signature'].includes(card.tier) ? 'white' : '#5B4CF5',
                            }}
                          >
                            {TIER_LABELS[card.tier] || card.tier}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 truncate">{card.annual_fee_note}</div>
                      </div>
                      <div className="flex-shrink-0">
                        {isAdded ? (
                          <div className="w-6 h-6 bg-mint-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : (
                          <ChevronRight size={16} className="text-gray-300" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setStep('bank')}
            className="mt-4 w-full py-3 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
          >
            ← Cambiar banco
          </button>
        </div>
      )}

      {/* STEP 3: Details */}
      {step === 'details' && selectedCard && selectedBank && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-black text-gray-900 mb-1">Últimos detalles</h2>
          <p className="text-gray-500 text-sm mb-6">Opcional: personaliza tu tarjeta</p>

          {/* Card preview */}
          <div className="flex justify-center mb-6">
            <CreditCardVisual
              card={selectedCard}
              bank={selectedBank}
              size="lg"
              showLastFour={lastFour || undefined}
              className="w-full max-w-sm"
            />
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Últimos 4 dígitos <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                placeholder="1234"
                value={lastFour}
                onChange={e => setLastFour(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="input-field text-center text-lg tracking-widest font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">Solo para identificar tu tarjeta. Nunca almacenamos datos sensibles.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nombre personalizado <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                type="text"
                placeholder='Ej: "Mi tarjeta favorita"'
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="input-field"
                maxLength={40}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3 mb-4 flex items-center gap-2">
              <X size={14} />
              {error}
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full eliseo-btn-primary py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Check size={18} />
                Agregar a mi cartera
              </>
            )}
          </button>

          <button
            onClick={() => setStep('card')}
            className="mt-3 w-full py-3 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
          >
            ← Cambiar tarjeta
          </button>
        </div>
      )}
    </div>
  )
}
