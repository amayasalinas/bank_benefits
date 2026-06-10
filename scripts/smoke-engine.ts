/**
 * Prueba de humo del motor v2 (Fase 2): toWalletView + recommend con los mocks.
 * Ejecutar: npx tsx scripts/smoke-engine.ts
 */
import { mockBanks, mockCards, mockBenefits, initialWallet } from '../src/mocks/fixtures'
import { toWalletViews } from '../src/lib/walletView'
import { recommend, whyText } from '../src/lib/recommend'
import { MERCHANTS, PROMOS } from '../src/data/merchants'
import type { UserCardJoined } from '../src/hooks/useUserCards'

const joined: UserCardJoined[] = initialWallet.map((uc) => {
  const card = mockCards.find((c) => c.id === uc.card_id)!
  const bank = mockBanks.find((b) => b.id === card.bank_id)!
  return {
    ...uc,
    user_id: 'mock-user-1',
    created_at: '2026-01-15T00:00:00.000Z',
    card: { ...card, bank },
    benefits: mockBenefits.filter((b) => b.card_id === uc.card_id),
  }
})

const wallet = toWalletViews(joined)

console.log('── Billetera (view-model) ──')
for (const c of wallet) {
  console.log(`${c.issuer} ${c.product} [${c.reward}] veoYear=${c.veoYear} hasData=${c.hasData} fee=${c.feeMonth}`)
  console.log('   rates:', JSON.stringify(c.rates))
  console.log('   perks:', c.perks.length, '| conf:', JSON.stringify(c.conf))
}

console.log('\n── Recomendaciones por comercio ──')
for (const m of MERCHANTS) {
  const ranked = recommend(m, wallet, PROMOS)
  const top = ranked[0]
  console.log(`${m.name} (${m.cat}, típico $${m.typical.toLocaleString('es-CO')}):`)
  console.log(`   → ${top.card.issuer} ${top.card.product} | ${top.rate.toFixed(1)}% | ahorra $${Math.round(top.saving).toLocaleString('es-CO')} | conf=${top.conf}${top.promo ? ' | PROMO: ' + top.promo.note : ''}`)
  console.log(`   why: ${whyText(top, ranked[1])}`)
}

// Bifurcación rotativo: la Amex pasa a rotativo y debe caer al final
const rotWallet = wallet.map((c) => (c.id === 'ban-amex-platinum' ? { ...c, paymentProfile: 'rotativo' as const } : c))
const cine = MERCHANTS.find((m) => m.id === 'cine')!
const rankedRot = recommend(cine, rotWallet, PROMOS)
console.log('\n── Bifurcación rotativo (Amex rotativa, Cine Colombia) ──')
rankedRot.forEach((r, i) => console.log(`   ${i + 1}. ${r.card.product} rate=${r.rate.toFixed(1)}% rotativo=${r.isRotativo}`))
if (!rankedRot[rankedRot.length - 1].isRotativo) {
  console.error('❌ FALLO: la tarjeta rotativa no quedó al final')
  process.exit(1)
}
console.log('\n✅ Smoke test del motor OK')
