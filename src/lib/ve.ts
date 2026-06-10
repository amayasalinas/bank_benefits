/**
 * Tabla VE (Valor Efectivo) — PRD v3 §8.2.
 * Traduce puntos/millas a % efectivo en COP para que el recomendador compare
 * cashback vs millas vs puntos en la misma unidad.
 *
 * VE_moneda = ValorRedención × p_red × (1 − breakage)
 * % efectivo por cada 1x de multiplicador = VE_unidad / COP de gasto que gana 1 unidad.
 *
 * Valores de referencia (jun 2026, fuentes en PRD v3 §18):
 * - Puntos Colombia: ~$7 COP/punto, acumulación 1 punto/$700 → 1.0% bruto por x.
 * - LifeMiles: redención en vuelos ~$43–65 COP/milla; piso no aéreo $15–25.
 *   Default CONSERVADOR (usuario sin historial de redención): piso no aéreo
 *   con p_red castigado. Si el usuario declara que redime en vuelos, subirá
 *   al valor aéreo (calibración pendiente con datos del piloto).
 */

/** % efectivo por cada 1x de multiplicador, ya castigado por p_red/breakage. */
const PROGRAM_RATE_PER_X: Array<{ match: string; ratePerX: number }> = [
  // $7/punto × p_red 0.85 / $700 de gasto por punto
  { match: 'puntos colombia', ratePerX: 0.85 },
  // Piso no aéreo ~$20/milla × p_red 0.8 / ~$4.000 de gasto por milla (1 milla/USD)
  { match: 'lifemiles', ratePerX: 0.6 },
  { match: 'aadvantage', ratePerX: 0.6 },
  // Programas bancarios genéricos: redención típica baja, conservador
  { match: 'davipuntos', ratePerX: 0.6 },
  { match: 'puntos bbva', ratePerX: 0.6 },
  { match: 'one rewards', ratePerX: 0.6 },
]

/** % efectivo por 1x para un programa de lealtad (o texto que lo contenga). */
export function ratePerMultiplier(programOrName: string | null | undefined): number {
  if (!programOrName) return 0.5
  const k = programOrName.toLowerCase()
  const hit = PROGRAM_RATE_PER_X.find((p) => k.includes(p.match))
  return hit ? hit.ratePerX : 0.5
}

/**
 * Perfil de gasto mensual default (COP) para estimar el VEO anual de una tarjeta
 * cuando aún no conocemos el gasto real del usuario. Suma ≈ $2.5M/mes — el piso
 * del ICP "Optimizador" (PRD §3). Se reemplazará por gasto declarado/real.
 */
import type { BenefitCategory } from '../types/database'

export const DEFAULT_SPEND_MONTH: Partial<Record<BenefitCategory, number>> = {
  supermercados: 600_000,
  general: 720_000,
  restaurantes: 400_000,
  viajes: 250_000,
  combustible: 200_000,
  moda: 150_000,
  entretenimiento: 120_000,
  streaming: 60_000,
}

/**
 * VEO anual estimado en COP: recompensas sobre el perfil de gasto default,
 * menos la cuota de manejo si se conoce. Etiquetar SIEMPRE como "estimado".
 */
export function estimateVeoYear(
  rates: Partial<Record<BenefitCategory, number>>,
  feeMonth: number | null
): number {
  let rewardMonth = 0
  for (const [cat, spend] of Object.entries(DEFAULT_SPEND_MONTH) as [BenefitCategory, number][]) {
    const r = rates[cat] ?? rates.general ?? 0
    rewardMonth += spend * (r / 100)
  }
  const net = (rewardMonth - (feeMonth ?? 0)) * 12
  return Math.max(0, Math.round(net))
}
