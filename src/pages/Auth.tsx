import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Wordmark from '../components/v2/Wordmark'
import Icon from '../components/v2/Icon'
import Btn from '../components/v2/Btn'

type Mode = 'signup' | 'login'

export default function Auth() {
  const [searchParams] = useSearchParams()
  const initialMode: Mode = searchParams.get('mode') === 'login' ? 'login' : 'signup'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const isSignup = mode === 'signup'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignup) {
        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres.')
          return
        }
        const { error } = await signUp(email, password, name || undefined)
        if (error) {
          const msg = (error.message ?? '').toLowerCase()
          if (msg.includes('rate limit')) {
            setError('Estamos recibiendo muchos registros en este momento. Espera unos minutos e intenta de nuevo.')
          } else if (msg.includes('already registered') || msg.includes('already been registered')) {
            setError('Este correo ya tiene una cuenta. Usa "Ingresar".')
          } else if (msg.includes('invalid')) {
            setError('Ese correo no parece válido. Revísalo e intenta de nuevo.')
          } else {
            setError('No se pudo crear la cuenta. Intenta de nuevo en unos minutos.')
          }
        } else {
          // Si Supabase exige confirmación de correo no habrá sesión y se muestra
          // esta pantalla; si la sesión se crea de una, PublicRoute redirige sola.
          setConfirmationSent(true)
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          setError('Correo o contraseña incorrectos.')
        } else {
          navigate('/dashboard', { replace: true })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (confirmationSent) {
    return (
      <div className="app">
        <div className="screen">
          <div style={{ padding: 'calc(34px + env(safe-area-inset-top, 0px)) 24px 24px', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="card pop-in" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 19, background: 'var(--brand-tint)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon name="checkCircle" size={28} />
              </div>
              <h2 style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em' }}>Revisa tu correo</h2>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 8 }}>
                Enviamos un enlace de confirmación a <strong>{email}</strong>. Haz clic en él para activar tu cuenta.
              </p>
              <Btn block variant="ghost" style={{ marginTop: 22 }} onClick={() => { setConfirmationSent(false); setMode('login') }}>
                Volver a iniciar sesión
              </Btn>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="screen">
        <div style={{ padding: 'calc(30px + env(safe-area-inset-top, 0px)) 24px 24px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <button className="tap" onClick={() => navigate('/')} aria-label="Volver" style={{ width: 38, height: 38, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', cursor: 'pointer' }}>
            <Icon name="chevronL" size={20} />
          </button>

          <div style={{ marginTop: 30 }}>
            <Wordmark size={20} />
            <h1 style={{ fontSize: 27, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 22 }}>
              {isSignup ? 'Crea tu cuenta' : 'Bienvenido de vuelta'}
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginTop: 6 }}>
              {isSignup ? 'Empieza a optimizar cada compra en 2 minutos.' : 'Tus tarjetas y tu ahorro te esperan.'}
            </p>
          </div>

          {/* Toggle registrarse / ingresar */}
          <div style={{ display: 'flex', gap: 4, background: 'var(--surface-2)', borderRadius: 999, padding: 4, marginTop: 26, border: '1px solid var(--line-soft)' }}>
            {([['signup', 'Registrarme'], ['login', 'Ingresar']] as [Mode, string][]).map(([m, l]) => (
              <button key={m} type="button" onClick={() => { setMode(m); setError('') }} className="tap" style={{
                flex: 1, padding: '10px', borderRadius: 999, border: 'none', cursor: 'pointer', font: 'inherit',
                fontSize: 14, fontWeight: 600,
                background: mode === m ? 'var(--surface)' : 'transparent',
                color: mode === m ? 'var(--ink)' : 'var(--ink-faint)',
                boxShadow: mode === m ? 'var(--shadow-sm)' : 'none' }}>{l}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {isSignup && (
                <input className="field" placeholder="Tu nombre" aria-label="Tu nombre" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
              )}
              <input className="field" type="email" required placeholder="Correo" aria-label="Correo" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              <div style={{ position: 'relative' }}>
                <input className="field" type={showPassword ? 'text' : 'password'} required placeholder="Contraseña" aria-label="Contraseña" value={password} onChange={e => setPassword(e.target.value)} autoComplete={isSignup ? 'new-password' : 'current-password'} style={{ paddingRight: 48 }} />
                <button type="button" className="tap" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--ink-faint)', cursor: 'pointer', display: 'flex' }}>
                  <Icon name="eye" size={18} />
                </button>
              </div>
            </div>

            {error && (
              <p className="fade-in" style={{ fontSize: 13, color: '#c0322e', textAlign: 'center', marginTop: 14 }}>{error}</p>
            )}

            <Btn block variant="primary" type="submit" style={{ marginTop: 18 }} iconR="arrowR" disabled={loading}>
              {loading ? 'Un momento…' : isSignup ? 'Crear cuenta' : 'Ingresar'}
            </Btn>
          </form>

          <div style={{ flex: 1 }} />
          <p style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--ink-faint)', textAlign: 'center', marginTop: 20 }}>
            Al continuar aceptas el tratamiento de tus datos según la Ley 1581 (Habeas Data). Nunca pedimos tu número de tarjeta completo, CVV ni claves bancarias.
          </p>
        </div>
      </div>
    </div>
  )
}
