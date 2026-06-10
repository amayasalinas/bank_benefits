import type { ReactNode } from 'react'

/** Nivel de confianza en la UI v2 ('ok'=Confirmado, 'warn'=Probable, 'info'=Acción) */
export type ConfLevel = 'ok' | 'warn' | 'info'

export const CONF_META: Record<ConfLevel, { cls: string; label: string }> = {
  ok:   { cls: 'conf-ok',   label: 'Confirmado' },
  warn: { cls: 'conf-warn', label: 'Probable' },
  info: { cls: 'conf-info', label: 'Acción' },
}

export default function ConfidenceBadge({ level = 'ok', children }: { level?: ConfLevel; children?: ReactNode }) {
  const m = CONF_META[level] ?? CONF_META.ok
  return (
    <span className={'conf ' + m.cls}>
      <span className="dot" />{children || m.label}
    </span>
  )
}
