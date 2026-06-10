import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wordmark from '../components/v2/Wordmark'
import Icon from '../components/v2/Icon'
import ConfidenceBadge from '../components/v2/ConfidenceBadge'
import SampleRecommendation from '../components/v2/SampleRecommendation'
import Btn from '../components/v2/Btn'

const slideBox: React.CSSProperties = {
  background: 'rgba(246,245,240,0.06)',
  border: '1px solid rgba(246,245,240,0.12)',
  borderRadius: 20, padding: 16, backdropFilter: 'blur(8px)',
  height: '100%',
}

/** Slide 2: mini-feed de ofertas (patrón MaxRewards pantallas 2-6: enseñar la UI real) */
function OffersSlide() {
  const rows = [
    { bank: 'Bancolombia', title: '4x millas en restaurantes', level: 'ok' as const },
    { bank: 'Davivienda', title: '10% en supermercados', level: 'ok' as const },
    { bank: 'Falabella', title: '25% en moda — clientes seleccionados', level: 'warn' as const },
  ]
  return (
    <div style={slideBox}>
      <div className="mono" style={{ fontSize: 10, color: 'rgba(246,245,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Promociones vigentes, todos los bancos</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: i < rows.length - 1 ? 10 : 0, borderBottom: i < rows.length - 1 ? '1px solid rgba(246,245,240,0.1)' : 'none' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
              <div className="mono" style={{ fontSize: 10, color: 'rgba(246,245,240,0.5)', marginTop: 2 }}>{r.bank}</div>
            </div>
            <ConfidenceBadge level={r.level} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Slide 3: el valor anual descubierto */
function ValueSlide() {
  const bullets = ['Millas y puntos traducidos a pesos reales', 'Cuotas de manejo que no se justifican', 'Promos que vencen antes de que te enteres']
  return (
    <div style={slideBox}>
      <div className="mono" style={{ fontSize: 10, color: 'rgba(246,245,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tu billetera, en pesos</div>
      <div className="tnum" style={{ fontSize: 32, fontWeight: 800, color: 'var(--hero-accent)', letterSpacing: '-0.02em', marginTop: 8 }}>$1.100.000/año</div>
      <div style={{ fontSize: 12, color: 'rgba(246,245,240,0.7)', marginTop: 2 }}>es lo que una billetera típica deja sobre la mesa.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="check" size={14} style={{ color: 'var(--hero-accent)', flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12.5, color: 'rgba(246,245,240,0.8)', lineHeight: 1.4 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setSlide(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div className="app">
      <div className="screen" style={{ background: 'linear-gradient(170deg, var(--hero-a) 0%, var(--hero-b) 92%)', color: '#f6f5f0' }}>
        <div style={{ padding: 'calc(34px + env(safe-area-inset-top, 0px)) 24px 26px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Wordmark size={22} color="#f6f5f0" />
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(246,245,240,0.55)' }}>Colombia</span>
          </div>

          <div style={{ marginTop: 40 }}>
            <div className="eyebrow fade-up" style={{ color: 'var(--gold)', marginBottom: 16 }}>La Suiza de las tarjetas</div>
            <h1 className="fade-up" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.03em', animationDelay: '.05s' }}>
              Sabes qué tarjetas<br />tienes. Eliseo sabe<br /><span style={{ color: 'var(--hero-accent)' }}>cuál usar.</span>
            </h1>
            <p className="fade-up" style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.5, color: 'rgba(246,245,240,0.75)', maxWidth: 320, animationDelay: '.12s' }}>
              En cada compra te decimos qué tarjeta de las tuyas te da el mejor beneficio — y cuánto ganas, en pesos.
            </p>
          </div>

          {/* Carrusel de value props (scroll-snap, sin librerías) */}
          <div className="pop-in" style={{ marginTop: 24, animationDelay: '.2s' }}>
            <div ref={trackRef} onScroll={onScroll} style={{
              display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
              gap: 12, margin: '0 -24px', padding: '4px 24px', scrollbarWidth: 'none',
            }}>
              {[<SampleRecommendation key="s1" tone="dark" />, <OffersSlide key="s2" />, <ValueSlide key="s3" />].map((s, i) => (
                <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'center' }}>{s}</div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 14 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: slide === i ? 22 : 7, height: 7, borderRadius: 999, background: slide === i ? 'var(--hero-accent)' : 'rgba(246,245,240,0.25)', transition: 'all .25s ease' }} />
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ marginTop: 24 }}>
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
