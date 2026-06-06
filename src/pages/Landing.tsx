import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Compass, Tag, ArrowRight, Sparkles } from 'lucide-react'

const features = [
  {
    icon: CreditCard,
    title: 'Tu billetera inteligente',
    description: 'Agrega tus tarjetas y descubre todos los beneficios que ya tienes.',
  },
  {
    icon: Compass,
    title: 'Recomendador en tiempo real',
    description: 'Selecciona una categoria y te decimos cual tarjeta usar para maximizar tu compra.',
  },
  {
    icon: Tag,
    title: 'Ofertas actualizadas',
    description: 'Encuentra descuentos y promociones activas de todos los bancos en un solo lugar.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12">
        <div className="absolute inset-0 bg-gradient-eliseo opacity-5" />
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-eliseo-50 text-eliseo-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={16} />
              Maximiza tus tarjetas
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              Saca el maximo provecho de{' '}
              <span className="bg-gradient-eliseo gradient-text">tus tarjetas</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Eliseo te dice cual tarjeta usar en cada compra para que nunca pierdas un beneficio.
            </p>
            <Link
              to="/auth"
              className="eliseo-btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Comenzar gratis
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="eliseo-card p-5 flex gap-4 items-start"
            >
              <div className="w-11 h-11 rounded-xl bg-eliseo-50 flex items-center justify-center flex-shrink-0">
                <feature.icon size={22} className="text-eliseo-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8 text-center">
        <p className="text-xs text-gray-400">
          Eliseo no almacena numeros de tarjeta ni datos sensibles.
        </p>
      </footer>
    </div>
  )
}
