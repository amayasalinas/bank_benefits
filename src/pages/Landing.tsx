import { useNavigate } from 'react-router-dom'
import Wordmark from '../components/v2/Wordmark'
import GlyphTile from '../components/v2/GlyphTile'
import ConfidenceBadge from '../components/v2/ConfidenceBadge'
import Btn from '../components/v2/Btn'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="app">
      <div className="screen" style={{ background: 'linear-gradient(170deg, var(--hero-a) 0%, var(--hero-b) 92%)', color: '#f6f5f0' }}>
        <div style={{ padding: 'calc(34px + env(safe-area-inset-top, 0px)) 24px 26px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Wordmark size={22} color="#f6f5f0" />
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(246,245,240,0.55)' }}>Colombia</span>
          </div>

          <div style={{ marginTop: 46 }}>
            <div className="eyebrow fade-up" style={{ color: 'var(--gold)', marginBottom: 18 }}>La Suiza de las tarjetas</div>
            <h1 className="fade-up" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.03em', animationDelay: '.05s' }}>
              Sabes qué tarjetas<br />tienes. Eliseo sabe<br /><span style={{ color: 'var(--hero-accent)' }}>cuál usar.</span>
            </h1>
            <p className="fade-up" style={{ marginTop: 18, fontSize: 16, lineHeight: 1.5, color: 'rgba(246,245,240,0.75)', maxWidth: 320, animationDelay: '.12s' }}>
              En cada compra te decimos qué tarjeta de las tuyas te da el mejor beneficio — y cuánto ganas, en pesos.
            </p>
          </div>

          {/* Héroe: ejemplo de recomendación */}
          <div className="pop-in" style={{ marginTop: 30, animationDelay: '.2s' }}>
            <div style={{ background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.12)', borderRadius: 20, padding: 16, backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                <GlyphTile glyph="utensils" size={38} accent="var(--hero-accent)" />
                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ fontSize: 10, color: 'rgba(246,245,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Voy a pagar en</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Crepes &amp; Waffles</div>
                </div>
                <ConfidenceBadge level="ok" />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, color: 'rgba(246,245,240,0.7)' }}>Usa tu <strong style={{ color: '#fff' }}>LifeMiles</strong></div>
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(246,245,240,0.5)', marginTop: 2 }}>4x millas vs 1% cashback</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--hero-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ganas</div>
                  <div className="tnum" style={{ fontSize: 24, fontWeight: 800, color: 'var(--hero-accent)', letterSpacing: '-0.02em' }}>+$4.675</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ marginTop: 28 }}>
            <Btn block variant="primary" onClick={() => navigate('/auth?mode=signup')}
                 style={{ background: '#f6f5f0', color: '#16140f', fontSize: 17, padding: '17px' }} iconR="arrowR">
              Comenzar gratis
            </Btn>
            <button className="tap" onClick={() => navigate('/auth?mode=login')} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: 'rgba(246,245,240,0.75)', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: 8 }}>
              Ya tengo cuenta
            </button>
            <p style={{ marginTop: 14, fontSize: 11.5, lineHeight: 1.5, textAlign: 'center', color: 'rgba(246,245,240,0.45)' }}>
              Sin datos sensibles. Nunca pedimos tu número completo, CVV ni clave.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
