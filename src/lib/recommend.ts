/**
 * Motor de recomendación v2 (PRD §8.2) — determinista, normalizado a COP.
 * Ranking de tarjetas de la billetera para un comercio dado, con:
 * - tasa base por categoría (tabla VE ya aplicada en walletView)
 * - overlay de promos vigentes por comercio×tarjeta
 * - bifurcación totalero/rotativo: a un rotativo el interés le domina;
 *   sus tarjetas se rankean al final y la UI muestra la advertencia.
 */
import type { MerchantView, PromoView, RankedCard, RewardGoal, WalletCardView } from '../types/view'
import { COP } from './format'

/**
 * goal (opcional): meta del usuario (UP del PRD §8.2). SOLO desempata cuando
 * dos tarjetas quedan a <5% de ahorro de diferencia — nunca altera el ahorro
 * mostrado ni promueve una tarjeta claramente inferior.
 */
export function recommend(
  merchant: MerchantView,
  wallet: WalletCardView[],
  promos: PromoView[],
  goal?: RewardGoal
): RankedCard[] {
  const ranked: RankedCard[] = wallet.map((card) => {
    const baseRate = card.rates[merchant.cat] ?? card.rates.general ?? 0
    const promo = promos.find(
      (p) =>
        p.merchantId === merchant.id &&
        p.bankId === card.bankId &&
        (!p.cardNameIncludes || card.product.toLowerCase().includes(p.cardNameIncludes.toLowerCase()))
    ) ?? null
    const isRotativo = card.paymentProfile === 'rotativo'
    const rate = baseRate + (promo ? promo.boost : 0)
    const saving = merchant.typical * (rate / 100)
    const conf = promo ? promo.conf : (card.conf[merchant.cat] ?? card.conf.default ?? 'warn')
    return { card, baseRate, rate, saving, promo, conf, reward: card.reward, isRotativo }
  })

  // Totaleros por ahorro desc; rotativos siempre al final (el interés EA
  // se come cualquier recompensa — recomendarles millas es malpráctica).
  return ranked.sort((a, b) => {
    if (a.isRotativo !== b.isRotativo) return a.isRotativo ? 1 : -1
    const diff = b.saving - a.saving
    // Empate práctico (<5% de diferencia): gana la que va con la meta del usuario
    const base = Math.max(a.saving, b.saving)
    if (goal && goal !== 'explorar' && base > 0 && Math.abs(diff) / base < 0.05) {
      const aMatch = a.reward === goal ? 1 : 0
      const bMatch = b.reward === goal ? 1 : 0
      if (aMatch !== bMatch) return bMatch - aMatch
    }
    return diff
  })
}

/** El "por qué en pesos" legible de la recomendación. */
export function whyText(top: RankedCard, runnerUp: RankedCard | undefined): string {
  if (!runnerUp || runnerUp.saving <= 0) {
    return `${top.rate.toFixed(1)}% efectivo en esta categoría.`
  }
  const diff = top.saving - runnerUp.saving
  return `${top.rate.toFixed(1)}% vs ${runnerUp.rate.toFixed(1)}% de tu ${runnerUp.card.issuer}. Ganas ${COP(diff)} más en esta compra.`
}
