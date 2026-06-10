import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useUserCards } from '../hooks/useUserCards'
import { toWalletViews } from '../lib/walletView'
import { COP } from '../lib/format'
import Icon, { type IconName } from '../components/v2/Icon'
import ScreenHeader from '../components/v2/ScreenHeader'
import Section from '../components/v2/Section'
import MiniStat from '../components/v2/MiniStat'
import Btn from '../components/v2/Btn'

interface SettingItem {
  glyph: IconName
  title: string
  detail?: string
  go?: () => void
}

function SettingsGroup({ label, items }: { label: string; items: SettingItem[] }) {
  return (
    <Section label={label} style={{ marginTop: 24 }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        {items.map((it, i) => (
          <button key={i} className="tap" onClick={it.go ?? (() => {})} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', border: 'none', borderBottom: i < items.length - 1 ? '1px solid var(--line-soft)' : 'none', background: 'transparent', cursor: it.go ? 'pointer' : 'default', textAlign: 'left', font: 'inherit' }}>
            <Icon name={it.glyph} size={19} style={{ color: 'var(--ink-soft)', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 500 }}>{it.title}</span>
            {it.detail && <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>{it.detail}</span>}
            {it.go && <Icon name="chevronR" size={16} style={{ color: 'var(--ink-faint)' }} />}
          </button>
        ))}
      </div>
    </Section>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { cards } = useUserCards()
  const wallet = useMemo(() => toWalletViews(cards), [cards])
  const walletValue = wallet.reduce((s, c) => s + c.veoYear, 0)

  const fullName = (user?.user_metadata?.full_name as string | undefined) || user?.email?.split('@')[0] || 'Tu cuenta'
  const initial = (fullName[0] || 'E').toUpperCase()
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
    : null
  const allTotalero = wallet.every((c) => c.paymentProfile === 'totalero')
  const coveredCats = new Set(wallet.flatMap((c) => Object.keys(c.rates))).size

  const handleSignOut = async () => {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="screen">
      <ScreenHeader title="Perfil" large />
      <div style={{ padding: '14px 20px 0' }}>
        {/* tarjeta de usuario */}
        <div className="card" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: 'var(--brand-deep)', color: 'var(--on-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800 }}>{initial}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fullName}</div>
            <div className="mono" style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
          {wallet.length > 0 && (
            <span className={'conf ' + (allTotalero ? 'conf-ok' : 'conf-warn')}><span className="dot" />{allTotalero ? 'Totalero' : 'Mixto'}</span>
          )}
        </div>

        {/* resumen */}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <MiniStat value={COP(walletValue)} label="Valor / año est." tone="brand" />
          <MiniStat value={`${wallet.length}`} label="Tarjetas" />
          <MiniStat value={`${coveredCats}`} label="Categorías" />
        </div>
      </div>

      <SettingsGroup label="Privacidad y datos" items={[
        { glyph: 'lock', title: 'Habeas Data (Ley 1581)', detail: 'Consentido' },
        { glyph: 'eye', title: 'Datos que compartes', detail: 'Solo tarjetas' },
        { glyph: 'shield', title: 'Nuestra neutralidad', detail: 'Sin comisión oculta' },
      ]} />

      <SettingsGroup label="Cuenta" items={[
        { glyph: 'card', title: 'Mis tarjetas', detail: `${wallet.length}`, go: () => navigate('/my-cards') },
        { glyph: 'star', title: 'Plan', detail: 'Gratis' },
        ...(memberSince ? [{ glyph: 'calendar' as IconName, title: 'Miembro desde', detail: memberSince }] : []),
      ]} />

      <div style={{ padding: '20px' }}>
        <Btn block variant="ghost" icon="logout" onClick={handleSignOut} style={{ color: 'var(--ink-soft)' }}>Cerrar sesión</Btn>
        <p className="mono" style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 16, letterSpacing: '0.04em' }}>Eliseo v2 · La Suiza de las tarjetas</p>
      </div>
      <div style={{ height: 24 }} />
    </div>
  )
}
