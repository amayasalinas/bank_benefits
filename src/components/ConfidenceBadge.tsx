import type { ConfidenceLevel } from '../types/database'

interface ConfidenceConfig {
  label: string
  emoji: string
  /** Texto y fondo (Tailwind). */
  className: string
  /** Microcopy para tooltip / aria. */
  hint: string
}

const CONFIG: Record<ConfidenceLevel, ConfidenceConfig> = {
  confirmado: {
    label: 'Confirmado',
    emoji: '🟢',
    className: 'bg-mint-50 text-mint-600',
    hint: 'Beneficio verificado: aplica seguro a tu tarjeta.',
  },
  probable: {
    label: 'Probable',
    emoji: '🟡',
    className: 'bg-amber-50 text-amber-600',
    hint: 'Depende de tu segmento o elegibilidad. Confírmalo en tu app antes de pagar.',
  },
  accion: {
    label: 'Requiere acción',
    emoji: '🔵',
    className: 'bg-eliseo-50 text-eliseo-600',
    hint: 'Necesitas inscribirte o diferir para obtener el beneficio.',
  },
}

interface ConfidenceBadgeProps {
  level: ConfidenceLevel
  /** Compacto = solo emoji + label corto. */
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Insignia de nivel de confianza (PRD v2 — Parte VIII).
 * Nunca se muestra un ahorro sin su nivel de confianza.
 */
export default function ConfidenceBadge({ level, size = 'sm', className = '' }: ConfidenceBadgeProps) {
  const cfg = CONFIG[level]
  const pad = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
  return (
    <span
      title={cfg.hint}
      aria-label={`Nivel de confianza: ${cfg.label}. ${cfg.hint}`}
      className={`inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap ${cfg.className} ${pad} ${className}`}
    >
      <span aria-hidden>{cfg.emoji}</span>
      {cfg.label}
    </span>
  )
}
