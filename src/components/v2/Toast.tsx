import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import Icon from './Icon'

interface ToastContextType {
  showToast: (msg: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

/** Provider del toast v2. Renderizarlo DENTRO del shell .app (usa position:absolute). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((m: string) => {
    setMsg(m)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {msg && (
        <div className="toast pop-in" role="status">
          <Icon name="checkCircle" size={18} style={{ color: 'var(--hero-accent)' }} />
          <span>{msg}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
