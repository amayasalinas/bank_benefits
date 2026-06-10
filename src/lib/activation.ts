/**
 * Flags de activación del usuario (patrón MaxRewards pantalla 24).
 * Viven en localStorage por usuario — cero cambios de esquema. Si el usuario
 * cambia de dispositivo solo pierde el progreso visual del checklist.
 */
import type { WalletCardView } from '../types/view'

export interface ActivationFlags {
  firstQuery?: boolean
  offersVisited?: boolean
}

const keyFor = (userId: string) => `eliseo.activation.${userId}`

export function getActivationFlags(userId: string): ActivationFlags {
  try {
    return JSON.parse(localStorage.getItem(keyFor(userId)) ?? '{}') as ActivationFlags
  } catch {
    return {}
  }
}

export function setActivationFlag(userId: string, flag: keyof ActivationFlags): void {
  try {
    const flags = getActivationFlags(userId)
    if (flags[flag]) return
    localStorage.setItem(keyFor(userId), JSON.stringify({ ...flags, [flag]: true }))
  } catch {
    /* localStorage no disponible: el checklist simplemente no progresa */
  }
}

export interface ActivationStep {
  id: string
  title: string
  detail?: string
  done: boolean
  /** Ruta del CTA cuando es el siguiente paso pendiente */
  to?: string
  cta?: string
}

export function getActivationSteps(wallet: WalletCardView[], flags: ActivationFlags): ActivationStep[] {
  return [
    { id: 'account', title: 'Crea tu cuenta', done: true },
    {
      id: 'first-card', title: 'Agrega tu primera tarjeta',
      detail: 'Solo banco y modelo — nunca el número completo',
      done: wallet.length >= 1, to: '/add-card?onboarding=1', cta: 'Agregar tarjeta',
    },
    {
      id: 'second-card', title: 'Agrega la segunda',
      detail: 'Comparar entre tus tarjetas es donde está la magia',
      done: wallet.length >= 2, to: '/add-card', cta: 'Agregar otra',
    },
    {
      id: 'first-query', title: 'Haz tu primera consulta',
      detail: 'Dinos dónde vas a pagar y te decimos con cuál',
      done: !!flags.firstQuery, to: '/recommender', cta: 'Probar',
    },
    {
      id: 'offers', title: 'Revisa las ofertas vigentes',
      detail: 'Promociones de todos los bancos en un solo lugar',
      done: !!flags.offersVisited, to: '/offers', cta: 'Ver ofertas',
    },
  ]
}
