import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { RewardGoal } from '../types/view'
import Icon, { type IconName } from '../components/v2/Icon'
import Btn from '../components/v2/Btn'
import Wordmark from '../components/v2/Wordmark'

const GOALS: { id: RewardGoal; glyph: IconName; title: string; detail: string }[] = [
  { id: 'millas', glyph: 'plane', title: 'Viajar con millas', detail: 'Acumular para vuelos y salas VIP' },
  { id: 'cashback', glyph: 'coins', title: 'Plata de vuelta', detail: 'Cashback directo en cada compra' },
  { id: 'puntos', glyph: 'trophy', title: 'Puntos para canjear', detail: 'Mercado, bonos y experiencias' },
  { id: 'explorar', glyph: 'sparkles', title: 'Aún no sé', detail: 'Muéstrame qué puedo lograr' },
]

/**
 * Onboarding por objetivos (patrón MaxRewards pantalla 11).
 * Una sola pregunta; la meta se guarda en user_metadata.reward_goal y
 * personaliza el copy y el desempate del ranking — nunca el ahorro mostrado.
 */
export default function Goals() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [selected, setSelected] = useState<RewardGoal | null>(null)
  const [saving, setSaving] = useState(false)

  const firstName = ((user?.user_metadata?.full_name as string | undefined) || user?.email?.split('@')[0] || '').split(' ')[0]

  const continueWith = async (goal: RewardGoal) => {
    if (saving) return
    setSelected(goal)
    setSaving(true)
    await updateProfile({ reward_goal: goal })
    setSaving(false)
    navigate('/add-card?onboarding=1', { replace: true })
  }

  return (
    <div className="app">
      <div className="screen">
        <div style={{ padding: 'calc(30px + env(safe-area-inset-top, 0px)) 24px 24px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <Wordmark size={20} />
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 26, lineHeight: 1.15 }}>
          Hola{firstName ? `, ${firstName}` : ''} 👋<br />¿Qué quieres lograr con tus tarjetas?
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.5 }}>
          Con esto personalizamos tus recomendaciones. El cálculo del ahorro siempre es el mismo para todos: honesto y en pesos.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 24 }}>
          {GOALS.map((g) => {
            const active = selected === g.id
            return (
              <button key={g.id} className="tap" onClick={() => continueWith(g.id)} disabled={saving} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                padding: '18px 15px', borderRadius: 18, textAlign: 'left', font: 'inherit', cursor: 'pointer',
                border: `1.5px solid ${active ? 'var(--brand)' : 'var(--line)'}`,
                background: active ? 'var(--brand-tint)' : 'var(--surface)',
                opacity: saving && !active ? 0.5 : 1,
              }}>
                <Icon name={g.glyph} size={24} style={{ color: 'var(--brand-deep)' }} />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{g.title}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.35 }}>{g.detail}</div>
                </div>
              </button>
            )
          })}
        </div>

          <div style={{ flex: 1 }} />
          <Btn block variant="ghost" style={{ marginTop: 24, color: 'var(--ink-soft)' }} onClick={() => continueWith('explorar')} disabled={saving}>
            {saving ? 'Guardando…' : 'Saltar por ahora'}
          </Btn>
        </div>
      </div>
    </div>
  )
}
