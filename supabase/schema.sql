-- ============================================================
-- ELISEO - Esquema de base de datos en Supabase
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TABLAS DE CATÁLOGO ─────────────────────────────────────

-- Tabla de bancos (catálogo)
CREATE TABLE IF NOT EXISTS public.bancos (
  id                TEXT PRIMARY KEY,
  nombre            TEXT NOT NULL,
  nombre_corto      TEXT NOT NULL,
  programa_fidelidad TEXT DEFAULT '',
  es_digital        BOOLEAN DEFAULT FALSE,
  website           TEXT DEFAULT '',
  color_logo        TEXT DEFAULT '#000000',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de tarjetas (catálogo)
CREATE TABLE IF NOT EXISTS public.tarjetas (
  id                TEXT PRIMARY KEY,
  banco_id          TEXT NOT NULL REFERENCES public.bancos(id) ON DELETE CASCADE,
  nombre            TEXT NOT NULL,
  franquicia        TEXT NOT NULL,
  tipo              TEXT NOT NULL DEFAULT 'credito',
  nivel             TEXT NOT NULL DEFAULT 'classic',
  sin_cuota_manejo  BOOLEAN DEFAULT FALSE,
  nota_cuota_manejo TEXT DEFAULT '',
  gradiente         TEXT DEFAULT '',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de beneficios por tarjeta (catálogo)
CREATE TABLE IF NOT EXISTS public.beneficios_tarjetas (
  id                TEXT PRIMARY KEY,
  tarjeta_id        TEXT NOT NULL REFERENCES public.tarjetas(id) ON DELETE CASCADE,
  categoria         TEXT NOT NULL,
  titulo            TEXT NOT NULL,
  descripcion       TEXT DEFAULT '',
  valor             NUMERIC,
  tipo_valor        TEXT NOT NULL,
  condiciones       TEXT DEFAULT '',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de beneficios por franquicia (catálogo)
CREATE TABLE IF NOT EXISTS public.beneficios_franquicias (
  id                TEXT DEFAULT gen_random_uuid()::TEXT PRIMARY KEY,
  franquicia        TEXT NOT NULL,
  nivel_minimo      TEXT NOT NULL,
  categoria         TEXT NOT NULL,
  titulo            TEXT NOT NULL,
  descripcion       TEXT DEFAULT '',
  valor             NUMERIC,
  tipo_valor        TEXT NOT NULL,
  condiciones       TEXT DEFAULT '',
  aplica_colombia   BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TABLAS DE USUARIO ─────────────────────────────────────

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

-- Catálogo
CREATE INDEX IF NOT EXISTS idx_tarjetas_banco_id ON public.tarjetas(banco_id);
CREATE INDEX IF NOT EXISTS idx_beneficios_tarjetas_tarjeta_id ON public.beneficios_tarjetas(tarjeta_id);
CREATE INDEX IF NOT EXISTS idx_beneficios_franquicias_franquicia ON public.beneficios_franquicias(franquicia);

-- Usuario
CREATE INDEX IF NOT EXISTS idx_user_cards_user_id ON public.user_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cards_card_id ON public.user_cards(card_id);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON public.promotions(is_active, valid_until);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

-- Catálogo: lectura pública (datos no sensibles)
ALTER TABLE public.bancos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarjetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficios_tarjetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficios_franquicias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read bancos" ON public.bancos;
CREATE POLICY "Public read bancos"
  ON public.bancos FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public read tarjetas" ON public.tarjetas;
CREATE POLICY "Public read tarjetas"
  ON public.tarjetas FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public read beneficios_tarjetas" ON public.beneficios_tarjetas;
CREATE POLICY "Public read beneficios_tarjetas"
  ON public.beneficios_tarjetas FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public read beneficios_franquicias" ON public.beneficios_franquicias;
CREATE POLICY "Public read beneficios_franquicias"
  ON public.beneficios_franquicias FOR SELECT
  USING (true);

-- Usuario
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
  ('bbva', 'bbva-aqua', 'Puntos dobles en restaurantes', 'Cada martes obtén el doble de Puntos BBVA en restaurantes aliados con tu tarjeta Aqua o Infinite.', 'x2 puntos', 'restaurantes', '2026-06-30', 'https://www.bbva.com.co', true),
  ('bbva', 'bbva-aqua', 'Puntos dobles en cines', 'Cada jueves obtén el doble de Puntos BBVA en cines aliados con tu tarjeta BBVA.', 'x2 puntos', 'entretenimiento', '2026-06-30', 'https://www.bbva.com.co', true),
  ('itau', 'itau-tdevuelve', '3% cashback en supermercados', '3% de devolución en tus compras en supermercados con la Visa TDevuelve de Itaú.', '3% cashback', 'supermercados', NULL, 'https://banco.itau.co', true),
  ('avvillas', 'av-carroya', '10% cashback en gasolina', 'Obtén hasta $500.000/mes en cashback sobre combustible con la Tarjeta CarroYa de AV Villas.', '10% cashback', 'combustible', NULL, 'https://www.avvillas.com.co', true),
  ('avvillas', 'av-boomerang', '5% cashback Boomerang', 'Con la Tarjeta Boomerang obtén 5% de cashback en restaurantes, moda y entretenimiento.', '5% cashback', 'restaurantes', NULL, 'https://www.avvillas.com.co', true),
  ('colpatria', 'col-cencosud', '10% devolución Cencosud', 'Con la Tarjeta Cencosud obtén 10% de devolución en Jumbo, Metro, Easy y más.', '10% back', 'supermercados', NULL, 'https://www.scotiabankcolpatria.com', true),
  ('colpatria', 'col-pricesmart', '4% en PriceSmart', 'Con la Visa PriceSmart de Colpatria obtén 4% de cashback en todas tus compras en PriceSmart.', '4% cashback', 'supermercados', NULL, 'https://www.scotiabankcolpatria.com', true),
  ('colpatria', 'col-one-cashback', '5% cashback suscripciones', 'Con One Cashback Amex de Colpatria obtén 5% de devolución en pagos recurrentes y suscripciones.', '5% cashback', 'streaming', NULL, 'https://www.scotiabankcolpatria.com', true),
  ('lulobank', 'lulo-pro', '30% cashback streaming Lulo Pro', 'Con Lulo Pro obtén 30% de cashback en tus suscripciones de Netflix, Spotify, Disney+ y más.', '30% cashback', 'streaming', NULL, 'https://www.lulobank.com', true),
  ('rappicard', 'rappi-card', '5% en Rappi Travel', '5% de cashback en vuelos, hoteles y alquileres en Rappi Travel.', '5% cashback', 'viajes', NULL, 'https://rappicard.co', true),
  ('bancolombia', NULL, 'Millas LATAM Pass', 'Con la Visa Avianca LifeMiles de Bancolombia acumula millas en todas tus compras para volar.', 'Millas LifeMiles', 'viajes', NULL, 'https://www.bancolombia.com', true),
  ('davivienda', 'dav-gzero', 'G-Zero sin cuota + cashback', 'La G-Zero de Davivienda tiene 0% cuota de manejo permanente y 1% cashback en suscripciones.', '1% + $0 cuota', 'streaming', NULL, 'https://www.davivienda.com', true)
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
