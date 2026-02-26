import { Link } from 'react-router-dom'
import { CreditCard, Sparkles, TrendingUp, Shield, ChevronRight, Star } from 'lucide-react'
import { BANKS } from '../data/banks'

const FEATURES = [
  {
    icon: CreditCard,
    title: 'Centraliza tus tarjetas',
    description: 'Gestiona todas tus tarjetas de crédito y débito en un solo lugar.',
    color: 'bg-eliseo-50 text-eliseo-600',
  },
  {
    icon: Sparkles,
    title: 'Recomendaciones inteligentes',
    description: 'Descubre qué tarjeta te da más beneficios según dónde vayas a gastar.',
    color: 'bg-mint-50 text-mint-600',
  },
  {
    icon: TrendingUp,
    title: 'Maximiza tus puntos',
    description: 'Nunca pierdas puntos o millas. Aprovecha cada compra al máximo.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: 'Conoce tus beneficios',
    description: 'Accede a información detallada sobre seguros, salas VIP y más.',
    color: 'bg-coral-50 text-coral-500',
  },
]

const STEPS = [
  { num: '1', title: 'Agrega tus tarjetas', desc: 'Selecciona tu banco y elige tus tarjetas. Sin conectar cuentas.' },
  { num: '2', title: 'Explora beneficios', desc: 'Ve en detalle todos los beneficios: cashback, puntos, salas VIP y más.' },
  { num: '3', title: 'Gasta inteligente', desc: 'Consulta qué tarjeta usar según la categoría de tu compra.' },
]

export default function Landing() {
  const digitalBanks = BANKS.filter(b => b.is_digital)
  const traditionalBanks = BANKS.filter(b => !b.is_digital)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 glass border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-eliseo flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-base">E</span>
            </div>
            <span className="font-black text-gray-900 text-lg tracking-tight">ELISEO</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-sm font-semibold text-eliseo-600 hover:text-eliseo-700 transition-colors">
              Iniciar sesión
            </Link>
            <Link to="/auth?mode=register" className="eliseo-btn-primary text-sm py-2 px-4 hidden sm:block">
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-eliseo-600 via-eliseo-500 to-mint-500">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Star size={14} className="text-yellow-300 fill-yellow-300" />
            <span className="text-white/90 text-xs font-medium">+12 bancos colombianos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Descubre el potencial
            <br />
            <span className="text-yellow-300">de tus tarjetas</span>
          </h1>

          <p className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            La guía inteligente de beneficios de tarjetas en Colombia. Cashback, puntos, salas VIP y mucho más.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/auth?mode=register" className="bg-white text-eliseo-600 font-bold py-3.5 px-8 rounded-xl hover:bg-eliseo-50 transition-all duration-200 active:scale-95 shadow-lg text-base">
              Empezar gratis →
            </Link>
            <Link to="/auth" className="border-2 border-white/40 text-white font-semibold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-all duration-200 text-base">
              Ya tengo cuenta
            </Link>
          </div>

          {/* Floating cards preview */}
          <div className="mt-16 flex justify-center gap-4 overflow-hidden">
            {[
              { g: 'linear-gradient(135deg, #5B4CF5 0%, #4A3DE3 100%)', label: 'Bancolombia Infinite' },
              { g: 'linear-gradient(135deg, #820AD1 0%, #5D0096 100%)', label: 'Nu Crédito' },
              { g: 'linear-gradient(135deg, #E30613 0%, #A30009 100%)', label: 'Davivienda' },
            ].map((c, i) => (
              <div
                key={i}
                className="hidden sm:block w-52 h-[122px] rounded-2xl shadow-2xl relative overflow-hidden flex-shrink-0"
                style={{
                  background: c.g,
                  transform: `rotate(${i === 0 ? -6 : i === 2 ? 6 : 0}deg) translateY(${i === 1 ? '-12px' : '0px'})`,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <div className="text-white/90 text-xs font-bold">{c.label.split(' ')[0]}</div>
                    <div className="w-7 h-5 rounded bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-80" />
                  </div>
                  <div className="text-white/70 font-mono text-xs">•••• •••• ••••</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banks logos */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Bancos y fintechs soportados
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {BANKS.map(bank => (
              <div
                key={bank.id}
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 hover:border-eliseo-200 transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: bank.logo_color }}
                >
                  {bank.logo_text}
                </div>
                <span className="text-sm font-medium text-gray-700">{bank.short_name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-3">
          Todo lo que necesitas
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-md mx-auto">
          Herramientas pensadas para sacarle el máximo provecho a tus plásticos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="eliseo-card p-6 hover:shadow-card-hover transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-eliseo-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-eliseo flex items-center justify-center mx-auto mb-4 shadow-card">
                  <span className="text-white font-black text-xl">{s.num}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-eliseo-600 to-mint-500">
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Empieza a usar ELISEO hoy
          </h2>
          <p className="text-white/80 mb-8">
            Gratuito. Sin conectar tus cuentas. Sin complicaciones.
          </p>
          <Link
            to="/auth?mode=register"
            className="inline-flex items-center gap-2 bg-white text-eliseo-600 font-bold py-3.5 px-8 rounded-xl hover:bg-eliseo-50 transition-all shadow-lg"
          >
            Crear cuenta gratis
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-eliseo flex items-center justify-center">
            <span className="text-white font-black text-xs">E</span>
          </div>
          <span className="font-black text-gray-900">ELISEO</span>
        </div>
        <p className="text-gray-400 text-xs">
          © 2026 ELISEO · Maximiza tus beneficios en Colombia
        </p>
        <p className="text-gray-300 text-xs mt-1">
          No nos conectamos directamente con entidades financieras. Información con fines educativos.
        </p>
      </footer>
    </div>
  )
}
