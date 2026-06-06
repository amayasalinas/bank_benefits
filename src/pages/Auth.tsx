import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          setError('Correo o contrasena incorrectos.')
        } else {
          navigate('/dashboard', { replace: true })
        }
      } else {
        if (password.length < 6) {
          setError('La contrasena debe tener al menos 6 caracteres.')
          setLoading(false)
          return
        }
        const { error } = await signUp(email, password)
        if (error) {
          setError('No se pudo crear la cuenta. Intenta con otro correo.')
        } else {
          setConfirmationSent(true)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="eliseo-card p-8 max-w-sm w-full text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-mint-50 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-mint-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Revisa tu correo</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enviamos un enlace de confirmacion a <strong>{email}</strong>. Haz clic en el para activar tu cuenta.
          </p>
          <button
            onClick={() => {
              setConfirmationSent(false)
              setIsLogin(true)
            }}
            className="eliseo-btn-secondary w-full"
          >
            Volver a iniciar sesion
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Volver</span>
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-eliseo flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-black text-2xl">E</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin ? 'Ingresa a tu billetera inteligente' : 'Empieza a maximizar tus tarjetas'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-11"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contrasena"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="eliseo-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Cargando...'
                : isLogin
                  ? 'Iniciar sesion'
                  : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? 'No tienes cuenta?' : 'Ya tienes cuenta?'}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-eliseo-500 font-semibold hover:text-eliseo-600 transition-colors"
            >
              {isLogin ? 'Registrate' : 'Inicia sesion'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
