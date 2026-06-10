/**
 * Comercios y promos del recomendador — Fase 1: constantes front.
 * ⚠️ Las PROMOS son DEMO con fecha de revisión: van con conf 'warn' (Probable)
 * mientras no exista la tabla merchant_promos con el pipeline de validación
 * (PRD §11: doble fuente, SLA ≤7 días). Revisar/eliminar antes de cualquier
 * lanzamiento público. Última revisión: 2026-06-09.
 */
import type { MerchantView, PromoView } from '../types/view'

export const MERCHANTS: MerchantView[] = [
  { id: 'crepes',    name: 'Crepes & Waffles', cat: 'restaurantes',    typical: 85_000,    glyph: 'utensils' },
  { id: 'exito',     name: 'Éxito',            cat: 'supermercados',   typical: 220_000,   glyph: 'cart' },
  { id: 'avianca',   name: 'Avianca',          cat: 'viajes',          typical: 1_850_000, glyph: 'plane' },
  { id: 'terpel',    name: 'Terpel',           cat: 'combustible',     typical: 180_000,   glyph: 'fuel' },
  { id: 'netflix',   name: 'Netflix',          cat: 'streaming',       typical: 44_900,    glyph: 'tv' },
  { id: 'cine',      name: 'Cine Colombia',    cat: 'entretenimiento', typical: 38_000,    glyph: 'ticket' },
  { id: 'falabella', name: 'Falabella',        cat: 'moda',            typical: 160_000,   glyph: 'shirt' },
  { id: 'rappi',     name: 'Rappi',            cat: 'restaurantes',    typical: 55_000,    glyph: 'utensils' },
  { id: 'amazon',    name: 'Amazon',           cat: 'general',         typical: 120_000,   glyph: 'wrench' },
  { id: 'farmatodo', name: 'Farmatodo',        cat: 'general',         typical: 70_000,    glyph: 'wrench' },
]

export const PROMOS: PromoView[] = [
  {
    id: 'p1', merchantId: 'crepes', bankId: 'bancolombia',
    boost: 3.0, conf: 'warn',
    note: 'Martes y miércoles: acumulación 4x en restaurantes — confírmalo en tu app',
    validDays: 5,
  },
  {
    id: 'p2', merchantId: 'exito', bankId: 'davivienda',
    boost: 1.5, conf: 'warn',
    note: 'Fin de semana: descuento en supermercados — confírmalo en tu app',
    validDays: 4,
  },
  {
    id: 'p3', merchantId: 'avianca', bankId: 'bancolombia',
    boost: 1.2, conf: 'warn',
    note: 'Compra de tiquetes: acumulación bonus + seguro de viaje',
    validDays: 20,
  },
  {
    id: 'p4', merchantId: 'netflix', bankId: 'nu',
    boost: 0.5, conf: 'warn',
    note: 'Cashback extra en suscripciones de streaming este mes',
    validDays: 12,
  },
]
