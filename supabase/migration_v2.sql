-- ════════════════════════════════════════════════════════════════════
-- ELISEO V2 — Migración aditiva (diseño verde bosque, jun 2026)
-- Idempotente: se puede ejecutar varias veces sin efecto adicional.
-- NO modifica ni borra nada existente: solo agrega columnas y una tabla.
-- Ejecutar en: Supabase Dashboard → SQL Editor → Run.
-- ════════════════════════════════════════════════════════════════════

-- 1. Cuota de manejo mensual en COP (fee_note sigue siendo la nota humana).
--    La usa el view-model para el VEO neto y la recomendación de cancelar.
ALTER TABLE cards ADD COLUMN IF NOT EXISTS fee_month NUMERIC;

-- 2. Perfil de pago por tarjeta del usuario (PRD §8.2: bifurcación
--    totalero/rotativo del recomendador). Default cubre filas existentes.
ALTER TABLE cards_user ADD COLUMN IF NOT EXISTS payment_profile TEXT
  NOT NULL DEFAULT 'totalero'
  CHECK (payment_profile IN ('totalero', 'rotativo'));

-- 3. Nivel de confianza (PRD §9 Flujo 3) y URL saliente de ofertas.
--    El front ya los lee como campos opcionales.
ALTER TABLE benefits ADD COLUMN IF NOT EXISTS confidence TEXT
  CHECK (confidence IN ('confirmado', 'probable', 'accion'));
ALTER TABLE offers ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE offers ADD COLUMN IF NOT EXISTS confidence TEXT
  CHECK (confidence IN ('confirmado', 'probable', 'accion'));

-- 4. Destacados ("Mejores del mercado") — curaduría con CTA de afiliado.
--    Esquema alineado al contrato del front (FeaturedCard en database.ts).
CREATE TABLE IF NOT EXISTS featured_cards (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,        -- etiqueta: "La mejor para viajeros"
  highlight TEXT NOT NULL,     -- gancho de valor en una línea
  apply_url TEXT NOT NULL,     -- CTA de afiliado (rastreable)
  rank INT NOT NULL DEFAULT 0
);

ALTER TABLE featured_cards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "featured_cards_read" ON featured_cards;
CREATE POLICY "featured_cards_read" ON featured_cards FOR SELECT USING (true);

-- Seed inicial (3 destacados sobre tarjetas reales del catálogo).
INSERT INTO featured_cards (id, card_id, reason, highlight, apply_url, rank) VALUES
  ('feat-millas',   'col-lifemiles',     'Para viajeros',  'Acumula LifeMiles en cada compra + beneficios Avianca', 'https://www.scotiabankcolpatria.com/tarjetas-de-credito/avianca-lifemiles', 1),
  ('feat-sincuota', 'nu-credit',         'Sin cuota',      '$0 cuota de manejo y control total desde la app',       'https://nu.com.co/tarjeta-de-credito/', 2),
  ('feat-cashback', 'col-one-cashback',  'Cashback fuerte','Devolución directa en todas tus compras',               'https://www.scotiabankcolpatria.com/tarjetas-de-credito', 3)
ON CONFLICT (id) DO NOTHING;
