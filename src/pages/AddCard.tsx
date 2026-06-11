import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchBanks, fetchCardsByBank } from '../lib/dataSource'
import { useUserCards } from '../hooks/useUserCards'
import type { Bank, Card, PaymentProfile } from '../types/database'
import { TIER_LABELS } from '../types/database'
import Icon from '../components/v2/Icon'
import ScreenHeader from '../components/v2/ScreenHeader'
import CardVisual from '../components/v2/CardVisual'
import Btn from '../components/v2/Btn'
import TrustNotes from '../components/v2/TrustNotes'
import { useToast } from '../components/v2/Toast'

export default function AddCard() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const onboarding = searchParams.get('onboarding') === '1'
  const { cards: walletCards, addCard } = useUserCards()
  const { showToast } = useToast()

  const [step, setStep] = useState(1)
  const [banks, setBanks] = useState<Bank[]>([])
  const [bankQuery, setBankQuery] = useState('')
  const [bank, setBank] = useState<Bank | null>(null)
  const [products, setProducts] = useState<Card[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selected, setSelected] = useState<Card[]>([])
  const [nickname, setNickname] = useState('')
  const [last4, setLast4] = useState('')
  const [profile, setProfile] = useState<PaymentProfile>('totalero')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBanks().then(setBanks)
  }, [])

  const filteredBanks = useMemo(
    () => banks.filter((b) => b.name.toLowerCase().includes(bankQuery.toLowerCase())),
    [banks, bankQuery]
  )

  const pickBank = async (b: Bank) => {
    setBank(b)
    setSelected([])
    setStep(2)
    setLoadingProducts(true)
    setProducts(await fetchCardsByBank(b.id))
    setLoadingProducts(false)
  }

  const toggleProduct = (p: Card) => {
    setSelected((sel) => (sel.some((s) => s.id === p.id) ? sel.filter((s) => s.id !== p.id) : [...sel, p]))
  }

  const back = () => {
    if (step > 1) setStep((s) => s - 1)
    else navigate(onboarding ? '/dashboard' : '/my-cards')
  }

  const finish = async () => {
    if (selected.length === 0 || saving) return
    setSaving(true)
    const single = selected.length === 1
    let walletEmpty = walletCards.length === 0
    let failures = 0
    for (const p of selected) {
      const { error } = await addCard(
        p.id,
        single ? nickname || undefined : undefined,
        single ? last4 || undefined : undefined,
        walletEmpty,
        profile
      )
      if (error) failures++
      else walletEmpty = false
    }
    setSaving(false)
    if (failures === selected.length) {
      showToast('No pudimos guardar. Intenta de nuevo.')
      return
    }
    const added = selected.length - failures
    showToast(added === 1 ? 'Tarjeta agregada · tu billetera vale más' : `${added} tarjetas agregadas · tu billetera vale más`)
    navigate('/dashboard')
  }

  const single = selected.length === 1
  const previewCard = bank && single && {
    issuer: bank.short_name,
    product: selected[0].name,
    network: selected[0].franchise,
    tier: TIER_LABELS[selected[0].tier] ?? selected[0].tier,
    nickname: nickname || 'Mi tarjeta',
    last4: last4 || '0000',
    reward: 'cashback' as const,
    veoYear: 0,
    accent: bank.logo_color,
  }

  return (
    <div className="screen">
      <ScreenHeader title="Agregar tarjeta" subtitle={`Paso ${step} de 3`} onBack={back} />

      {/* progreso */}
      <div style={{ display: 'flex', gap: 6, padding: '16px 20px 4px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? 'var(--brand)' : 'var(--line)', transition: 'background .3s' }} />
        ))}
      </div>

      <div style={{ padding: '20px 20px 40px' }}>
        {step === 1 && (
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 12 }}>¿De qué banco es?</div>
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <Icon name="search" size={18} style={{ position: 'absolute', left: 14, top: 15, color: 'var(--ink-faint)' }} />
              <input className="field" style={{ paddingLeft: 42 }} placeholder="Busca tu banco" value={bankQuery} onChange={(e) => setBankQuery(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {banks.length === 0 && <div className="skel" style={{ height: 62, borderRadius: 14 }} />}
              {filteredBanks.map((b) => (
                <button key={b.id} className="tap" onClick={() => pickBank(b)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 14,
                  border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `color-mix(in oklab, ${b.logo_color} 16%, white)`, color: b.logo_color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>{b.name[0]}</div>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{b.name}</span>
                  <Icon name="chevronR" size={18} style={{ color: 'var(--ink-faint)' }} />
                </button>
              ))}
            </div>
            <TrustNotes style={{ marginTop: 18 }} />
          </div>
        )}

        {step === 2 && bank && (
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 4 }}>Modelos de {bank.name}</div>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 12, lineHeight: 1.4 }}>Marca todas las que tengas — las agregamos de una vez.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 84 }}>
              {loadingProducts && <div className="skel" style={{ height: 56, borderRadius: 14 }} />}
              {!loadingProducts && products.length === 0 && (
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, padding: '8px 2px' }}>
                  Aún no tenemos el catálogo de {bank.name}. Lo estamos curando — vuelve pronto.
                </p>
              )}
              {products.map((p) => {
                const isSel = selected.some((s) => s.id === p.id)
                return (
                  <button key={p.id} className="tap" onClick={() => toggleProduct(p)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '15px 14px', borderRadius: 14,
                    border: `1.5px solid ${isSel ? 'var(--brand)' : 'var(--line)'}`,
                    background: isSel ? 'var(--brand-tint)' : 'var(--surface)',
                    cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
                    <div style={{ width: 30, height: 20, borderRadius: 5, background: bank.logo_color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 1 }}>{p.franchise} · {TIER_LABELS[p.tier] ?? p.tier}{p.no_annual_fee ? ' · Sin cuota' : ''}</div>
                    </div>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isSel ? 'var(--brand)' : 'transparent',
                      border: isSel ? 'none' : '1.5px solid var(--line)',
                      color: 'var(--on-brand)',
                    }}>
                      <Icon name={isSel ? 'check' : 'plus'} size={15} stroke={2.2} style={isSel ? undefined : { color: 'var(--ink-faint)' }} />
                    </div>
                  </button>
                )
              })}
            </div>
            {selected.length > 0 && (
              <div style={{ position: 'sticky', bottom: 12, paddingTop: 8 }}>
                <Btn block variant="primary" iconR="arrowR" onClick={() => setStep(3)}>
                  Continuar ({selected.length})
                </Btn>
              </div>
            )}
          </div>
        )}

        {step === 3 && bank && single && previewCard && (
          <div className="fade-up">
            <CardVisual card={previewCard} compact style={{ marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="eyebrow" htmlFor="nickname">Apodo (opcional)</label>
                <input id="nickname" className="field" style={{ marginTop: 7 }} maxLength={40} placeholder="Ej: La de los viajes" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
              <div>
                <label className="eyebrow" htmlFor="last4">Últimos 4 dígitos (opcional)</label>
                <input id="last4" className="field mono" style={{ marginTop: 7, letterSpacing: '0.2em' }} maxLength={4} inputMode="numeric" placeholder="0000" value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, ''))} />
              </div>
              <PaymentProfilePicker profile={profile} onChange={setProfile} plural={false} />
            </div>
            <Btn block variant="primary" style={{ marginTop: 24 }} icon="check" disabled={saving} onClick={finish}>
              {saving ? 'Guardando…' : 'Guardar tarjeta'}
            </Btn>
          </div>
        )}

        {step === 3 && bank && !single && (
          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 12 }}>Vas a agregar {selected.length} tarjetas</div>
            <div className="card" style={{ overflow: 'hidden', marginBottom: 18 }}>
              {selected.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < selected.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                  <div style={{ width: 30, height: 20, borderRadius: 5, background: bank.logo_color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 500 }}>{p.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 1 }}>{p.franchise} · {TIER_LABELS[p.tier] ?? p.tier}</div>
                  </div>
                  <button className="tap" aria-label={`Quitar ${p.name}`} onClick={() => setSelected((sel) => sel.filter((s) => s.id !== p.id))} style={{ background: 'none', border: 'none', color: 'var(--ink-faint)', cursor: 'pointer', display: 'flex', padding: 4 }}>
                    <Icon name="x" size={16} />
                  </button>
                </div>
              ))}
            </div>
            <PaymentProfilePicker profile={profile} onChange={setProfile} plural />
            <p style={{ fontSize: 11.5, color: 'var(--ink-faint)', marginTop: 14, lineHeight: 1.45 }}>
              Los apodos y últimos 4 dígitos los puedes poner después, entrando a cada tarjeta.
            </p>
            <Btn block variant="primary" style={{ marginTop: 20 }} icon="check" disabled={saving} onClick={finish}>
              {saving ? 'Guardando…' : `Guardar ${selected.length} tarjetas`}
            </Btn>
          </div>
        )}
      </div>
    </div>
  )
}

function PaymentProfilePicker({ profile, onChange, plural }: { profile: PaymentProfile; onChange: (p: PaymentProfile) => void; plural: boolean }) {
  return (
    <div>
      <span className="eyebrow">{plural ? '¿Cómo pagas tus tarjetas?' : '¿Cómo pagas esta tarjeta?'}</span>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {([['totalero', 'Pago el total'], ['rotativo', 'Difiero / roto']] as [PaymentProfile, string][]).map(([v, l]) => (
          <button key={v} onClick={() => onChange(v)} className="tap" style={{ flex: 1, padding: '13px', borderRadius: 13, border: `1.5px solid ${profile === v ? 'var(--brand)' : 'var(--line)'}`, background: profile === v ? 'var(--brand-tint)' : 'var(--surface)', color: profile === v ? 'var(--brand-deep)' : 'var(--ink-soft)', fontWeight: 600, fontSize: 14, cursor: 'pointer', font: 'inherit' }}>{l}</button>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: 'var(--ink-faint)', marginTop: 8, lineHeight: 1.45 }}>
        {profile === 'totalero' ? 'Optimizamos tus recompensas netas (interés = 0).' : 'Priorizamos tasa baja: recomendarte millas sería malo para ti.'}
      </p>
    </div>
  )
}
