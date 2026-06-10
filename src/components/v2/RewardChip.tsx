/** Tipo de recompensa principal de una tarjeta en la UI v2 */
export type RewardKind = 'millas' | 'cashback' | 'puntos'

export const REWARD_LABEL: Record<RewardKind, string> = {
  millas: 'en millas',
  cashback: 'de cashback',
  puntos: 'en puntos',
}

const CHIP_LABEL: Record<RewardKind, string> = { millas: 'Millas', cashback: 'Cashback', puntos: 'Puntos' }

export default function RewardChip({ reward }: { reward: RewardKind }) {
  return (
    <span className="mono" style={{
      fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '3px 7px', borderRadius: 6, background: 'rgba(255,255,255,0.14)',
      color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.18)',
    }}>{CHIP_LABEL[reward] ?? reward}</span>
  )
}
