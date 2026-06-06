/**
 * Datos mock para desarrollo del front sin Supabase.
 * Solo se usan cuando VITE_USE_MOCKS === 'true' (ver src/lib/dataSource.ts).
 * Respetan los tipos de src/types/database.ts (el "contrato" con la BD).
 * Subconjunto curado y realista del catálogo en datos-eliseo/*.csv.
 */
import type { Bank, Card, Benefit, Offer } from '../types/database'

export const MOCK_USER = {
  id: 'mock-user-1',
  email: 'sebastian@eliseo.app',
}

export const mockBanks: Bank[] = [
  {
    id: 'bancolombia',
    name: 'Bancolombia',
    short_name: 'Bancolombia',
    loyalty_program: 'Puntos Colombia',
    is_digital: false,
    website: 'https://www.bancolombia.com',
    logo_color: '#FFCC00',
    cards_url: 'https://www.bancolombia.com/tarjetas-de-credito',
  },
  {
    id: 'davivienda',
    name: 'Davivienda',
    short_name: 'Davivienda',
    loyalty_program: 'DaviPuntos',
    is_digital: false,
    website: 'https://www.davivienda.com',
    logo_color: '#E30613',
    cards_url: 'https://www.davivienda.com/personas/tarjetas-de-credito',
  },
  {
    id: 'bbva',
    name: 'BBVA Colombia',
    short_name: 'BBVA',
    loyalty_program: 'Puntos BBVA',
    is_digital: false,
    website: 'https://www.bbva.com.co',
    logo_color: '#004481',
    cards_url: 'https://www.bbva.com.co/personas/productos/tarjetas',
  },
  {
    id: 'colpatria',
    name: 'Scotiabank Colpatria',
    short_name: 'Colpatria',
    loyalty_program: 'One Rewards',
    is_digital: false,
    website: 'https://www.scotiabankcolpatria.com',
    logo_color: '#EC1C24',
    cards_url: 'https://www.scotiabankcolpatria.com/tarjetas',
  },
  {
    id: 'nu',
    name: 'Nu Colombia',
    short_name: 'Nu',
    loyalty_program: null,
    is_digital: true,
    website: 'https://nu.com.co',
    logo_color: '#820AD1',
    cards_url: 'https://nu.com.co/tarjeta-de-credito/',
  },
  {
    id: 'nequi',
    name: 'Nequi',
    short_name: 'Nequi',
    loyalty_program: null,
    is_digital: true,
    website: 'https://www.nequi.com.co',
    logo_color: '#2D0A54',
    cards_url: 'https://www.nequi.com.co/tarjeta-debito/',
  },
]

export const mockCards: Card[] = [
  {
    id: 'ban-amex-platinum',
    bank_id: 'bancolombia',
    name: 'American Express Platinum',
    franchise: 'Amex',
    type: 'credito',
    tier: 'platinum',
    no_annual_fee: false,
    fee_note: 'Cuota premium según perfil',
    bank_url: 'https://www.bancolombia.com/tarjetas-de-credito',
    franchise_benefits_url: 'https://www.americanexpress.com/es-co/',
  },
  {
    id: 'ban-mc-black',
    bank_id: 'bancolombia',
    name: 'Mastercard Black',
    franchise: 'Mastercard',
    type: 'credito',
    tier: 'black',
    no_annual_fee: false,
    fee_note: 'Cuota premium',
    bank_url: 'https://www.bancolombia.com/tarjetas-de-credito',
    franchise_benefits_url: 'https://www.mastercard.com.co/es-co/consumidores/beneficios.html',
  },
  {
    id: 'ban-visa-gold',
    bank_id: 'bancolombia',
    name: 'Visa Gold',
    franchise: 'Visa',
    type: 'credito',
    tier: 'gold',
    no_annual_fee: false,
    fee_note: 'Cuota según nivel de gasto',
    bank_url: 'https://www.bancolombia.com/tarjetas-de-credito',
    franchise_benefits_url: 'https://www.visa.com.co/',
  },
  {
    id: 'dav-visa-signature',
    bank_id: 'davivienda',
    name: 'Visa Signature',
    franchise: 'Visa',
    type: 'credito',
    tier: 'signature',
    no_annual_fee: false,
    fee_note: 'Gratis primer año',
    bank_url: 'https://www.davivienda.com/personas/tarjetas-de-credito',
    franchise_benefits_url: 'https://www.visa.com.co/',
  },
  {
    id: 'dav-mc-gold',
    bank_id: 'davivienda',
    name: 'Mastercard Gold',
    franchise: 'Mastercard',
    type: 'credito',
    tier: 'gold',
    no_annual_fee: false,
    fee_note: 'Cuota según nivel de gasto',
    bank_url: 'https://www.davivienda.com/personas/tarjetas-de-credito',
    franchise_benefits_url: 'https://www.mastercard.com.co/es-co/consumidores/beneficios.html',
  },
  {
    id: 'bbva-visa-infinite',
    bank_id: 'bbva',
    name: 'Visa Infinite',
    franchise: 'Visa',
    type: 'credito',
    tier: 'infinite',
    no_annual_fee: false,
    fee_note: 'Cuota premium',
    bank_url: 'https://www.bbva.com.co/personas/productos/tarjetas',
    franchise_benefits_url: 'https://www.visa.com.co/',
  },
  {
    id: 'col-visa-platinum',
    bank_id: 'colpatria',
    name: 'Visa Platinum',
    franchise: 'Visa',
    type: 'credito',
    tier: 'platinum',
    no_annual_fee: false,
    fee_note: 'Cuota según perfil',
    bank_url: 'https://www.scotiabankcolpatria.com/tarjetas',
    franchise_benefits_url: 'https://www.visa.com.co/',
  },
  {
    id: 'nu-mc',
    bank_id: 'nu',
    name: 'Tarjeta Nu',
    franchise: 'Mastercard',
    type: 'credito',
    tier: 'cashback',
    no_annual_fee: true,
    fee_note: null,
    bank_url: 'https://nu.com.co/tarjeta-de-credito/',
    franchise_benefits_url: 'https://www.mastercard.com.co/es-co/consumidores/beneficios.html',
  },
  {
    id: 'nequi-visa',
    bank_id: 'nequi',
    name: 'Tarjeta Débito Nequi',
    franchise: 'Visa',
    type: 'debito',
    tier: 'digital',
    no_annual_fee: true,
    fee_note: null,
    bank_url: 'https://www.nequi.com.co/tarjeta-debito/',
    franchise_benefits_url: null,
  },
]

const benefit = (
  id: string,
  card_id: string,
  bank_id: string,
  card_name: string,
  category: Benefit['category'],
  title: string,
  description: string,
  value_type: Benefit['value_type'],
  value_label: string,
  numeric_value: number | null = null,
  conditions: string | null = null
): Benefit => ({
  id,
  card_id,
  bank_id,
  card_name,
  category,
  title,
  description,
  numeric_value,
  value_type,
  value_label,
  conditions,
  source: null,
  status: 'verificado',
})

export const mockBenefits: Benefit[] = [
  // Amex Platinum (Bancolombia)
  benefit('m1', 'ban-amex-platinum', 'bancolombia', 'American Express Platinum', 'viajes', 'Priority Pass', 'Acceso ilimitado a +1.200 salas VIP en aeropuertos', 'lounge_access', 'Acceso ilimitado', 1, 'Titular y acompañante'),
  benefit('m2', 'ban-amex-platinum', 'bancolombia', 'American Express Platinum', 'seguros', 'Seguro de viaje', 'Cobertura médica hasta USD 1.000.000 en el exterior', 'fixed_benefit', 'Incluido', null, 'Viajes pagados con la tarjeta'),
  benefit('m3', 'ban-amex-platinum', 'bancolombia', 'American Express Platinum', 'entretenimiento', '2x1 en cines', 'Dos entradas por el precio de una en cines aliados', 'discount_percent', '50% dcto', 50, 'Cines aliados, una vez por semana'),
  benefit('m4', 'ban-amex-platinum', 'bancolombia', 'American Express Platinum', 'puntos', 'Puntos Colombia', 'Acumulación premium en todas tus compras', 'points_multiplier', 'x2 puntos', 2, 'Todas las compras'),
  benefit('m5', 'ban-amex-platinum', 'bancolombia', 'American Express Platinum', 'restaurantes', 'Amex Dining', 'Beneficios y reservas en restaurantes seleccionados', 'discount_percent', '15% dcto', 15, 'Restaurantes aliados'),
  // Davivienda Visa Signature
  benefit('m6', 'dav-visa-signature', 'davivienda', 'Visa Signature', 'viajes', 'Salas VIP LoungeKey', '6 ingresos al año a salas VIP', 'lounge_access', '6 visitas/año', 1, 'Titular'),
  benefit('m7', 'dav-visa-signature', 'davivienda', 'Visa Signature', 'cashback', 'Cashback compras', 'Devolución sobre compras en comercios aliados', 'cashback_percent', '3% cashback', 3, 'Comercios aliados'),
  benefit('m8', 'dav-visa-signature', 'davivienda', 'Visa Signature', 'supermercados', 'Descuento mercados', 'Descuento en cadenas de supermercados', 'discount_percent', '8% dcto', 8, 'Martes y jueves'),
  // Nu
  benefit('m9', 'nu-mc', 'nu', 'Tarjeta Nu', 'cashback', 'Cashback Nu', 'Devolución diaria que genera rendimientos', 'cashback_percent', 'Hasta 5%', 5, 'Comercios seleccionados'),
  benefit('m10', 'nu-mc', 'nu', 'Tarjeta Nu', 'streaming', 'Suscripciones', 'Sin cuota de manejo en tus pagos de streaming', 'fixed_benefit', 'Sin cuota', null, null),
  benefit('m11', 'nu-mc', 'nu', 'Tarjeta Nu', 'general', 'Cero cuota de manejo', 'Tarjeta sin costo de manejo mensual', 'fixed_benefit', '$0 cuota', null, null),
  // BBVA Visa Infinite (catálogo)
  benefit('m12', 'bbva-visa-infinite', 'bbva', 'Visa Infinite', 'viajes', 'Salas VIP', 'Acceso a salas VIP con Visa Infinite', 'lounge_access', 'Acceso', 1, 'Titular'),
  benefit('m13', 'bbva-visa-infinite', 'bbva', 'Visa Infinite', 'combustible', 'Cashback gasolina', 'Devolución en estaciones de servicio', 'cashback_percent', '4% cashback', 4, 'EDS aliadas'),
  // Mastercard Black (catálogo)
  benefit('m14', 'ban-mc-black', 'bancolombia', 'Mastercard Black', 'viajes', 'Priority Pass', 'Acceso ilimitado a +850 salas VIP', 'lounge_access', 'Ilimitado', 1, 'Titular y acompañante'),
  benefit('m15', 'ban-mc-black', 'bancolombia', 'Mastercard Black', 'puntos', 'Puntos Colombia', 'Acumulación premium de puntos', 'points_multiplier', 'x2 puntos', 2, 'Todas las compras'),
]

/** Ofertas activas. Fechas futuras relativas a mediados de 2026. */
export const mockOffers: Offer[] = [
  { id: 'o1', bank_id: 'bancolombia', title: '20% en restaurantes', description: 'Descuento en restaurantes aliados pagando con tarjetas Bancolombia.', category: 'restaurantes', valid_until: '2026-06-30' },
  { id: 'o2', bank_id: 'davivienda', title: '3 cuotas sin interés', description: 'Difiere tus compras de tecnología a 3 meses sin interés.', category: 'general', valid_until: '2026-07-15' },
  { id: 'o3', bank_id: 'nu', title: 'Cashback doble en streaming', description: 'Duplica tu cashback en suscripciones de streaming este mes.', category: 'streaming', valid_until: '2026-06-20' },
  { id: 'o4', bank_id: 'bbva', title: '15% en combustible', description: 'Devolución especial en estaciones de servicio aliadas.', category: 'combustible', valid_until: '2026-08-01' },
  { id: 'o5', bank_id: 'colpatria', title: 'Millas dobles', description: 'Acumula el doble de millas en compras internacionales.', category: 'viajes', valid_until: null },
  { id: 'o6', bank_id: 'davivienda', title: '10% en supermercados', description: 'Descuento en cadenas de supermercados los fines de semana.', category: 'supermercados', valid_until: '2026-06-12' },
]

/** Tarjetas iniciales en la cartera del usuario mock (referencias al catálogo). */
export const initialWallet: Array<{
  id: string
  card_id: string
  nickname: string | null
  last_four: string | null
  is_primary: boolean
}> = [
  { id: 'uc-1', card_id: 'ban-amex-platinum', nickname: 'Amex Platino', last_four: '1234', is_primary: true },
  { id: 'uc-2', card_id: 'dav-visa-signature', nickname: null, last_four: '5678', is_primary: false },
  { id: 'uc-3', card_id: 'nu-mc', nickname: 'Nu morada', last_four: '9012', is_primary: false },
]
