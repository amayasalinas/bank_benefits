-- ============================================================
-- ELISEO - Esquema de base de datos en Supabase
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TABLAS ──────────────────────────────────────────────────

-- Tabla de user_cards (tarjetas del usuario)
CREATE TABLE IF NOT EXISTS public.user_cards (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id     TEXT NOT NULL,
  nickname    TEXT DEFAULT '',
  last_four   TEXT DEFAULT '',
  is_primary  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de promotions (ofertas dinámicas)
CREATE TABLE IF NOT EXISTS public.promotions (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  bank_id        TEXT,
  card_id        TEXT,
  title          TEXT NOT NULL,
  description    TEXT,
  discount_value TEXT,
  category       TEXT,
  valid_from     DATE,
  valid_until    DATE,
  url            TEXT DEFAULT '',
  is_active      BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de user_preferences (preferencias de usuario)
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id           UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notifications     BOOLEAN DEFAULT TRUE,
  preferred_categories TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ÍNDICES ─────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_user_cards_user_id ON public.user_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cards_card_id ON public.user_cards(card_id);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON public.promotions(is_active, valid_until);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Políticas user_cards (solo el dueño puede ver/editar/borrar)
DROP POLICY IF EXISTS "Users can view own cards" ON public.user_cards;
CREATE POLICY "Users can view own cards"
  ON public.user_cards FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own cards" ON public.user_cards;
CREATE POLICY "Users can insert own cards"
  ON public.user_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cards" ON public.user_cards;
CREATE POLICY "Users can update own cards"
  ON public.user_cards FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own cards" ON public.user_cards;
CREATE POLICY "Users can delete own cards"
  ON public.user_cards FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas promotions (todos pueden leer ofertas activas)
DROP POLICY IF EXISTS "Anyone can read active promotions" ON public.promotions;
CREATE POLICY "Anyone can read active promotions"
  ON public.promotions FOR SELECT
  USING (is_active = TRUE);

-- Políticas user_preferences
DROP POLICY IF EXISTS "Users can manage own preferences" ON public.user_preferences;
CREATE POLICY "Users can manage own preferences"
  ON public.user_preferences FOR ALL
  USING (auth.uid() = user_id);

-- ─── DATOS INICIALES (Ofertas de ejemplo) ────────────────────

INSERT INTO public.promotions (bank_id, card_id, title, description, discount_value, category, valid_until, url, is_active) VALUES
  ('bbva', 'bbva-aqua', 'Puntos dobles en restaurantes', 'Cada martes obtén el doble de Puntos BBVA en restaurantes aliados.', 'x2 puntos', 'restaurantes', '2026-06-30', 'https://www.bbva.com.co', true),
  ('bbva', 'bbva-aqua', 'Puntos dobles en cines', 'Cada jueves obtén el doble de Puntos BBVA en cines aliados.', 'x2 puntos', 'entretenimiento', '2026-06-30', 'https://www.bbva.com.co', true),
  ('itau', 'itau-tdevuelve', '3% cashback en supermercados', '3% de devolución en supermercados con la Visa TDevuelve.', '3% cashback', 'supermercados', NULL, 'https://banco.itau.co', true),
  ('avvillas', 'av-carroya', '10% cashback en gasolina', 'Hasta $500.000/mes en cashback sobre combustible con CarroYa.', '10% cashback', 'combustible', NULL, 'https://www.avvillas.com.co', true),
  ('colpatria', 'col-cencosud', '10% devolución Cencosud', '10% de devolución en Jumbo, Metro, Easy y más.', '10% back', 'supermercados', NULL, 'https://www.scotiabankcolpatria.com', true),
  ('lulobank', 'lulo-pro', '30% cashback streaming Lulo Pro', 'Con Lulo Pro obtén 30% de cashback en suscripciones digitales.', '30% cashback', 'streaming', NULL, 'https://www.lulobank.com', true),
  ('rappicard', 'rappi-card', '5% en Rappi Travel', '5% de cashback en vuelos, hoteles y alquileres en Rappi Travel.', '5% cashback', 'viajes', NULL, 'https://rappicard.co', true)
ON CONFLICT DO NOTHING;

-- ─── FUNCIÓN: Auto-crear preferencias al registrarse ─────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
