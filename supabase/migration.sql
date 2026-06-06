-- ============================================
-- ELISEO - Database Migration
-- ============================================

-- 1. BANKS
CREATE TABLE IF NOT EXISTS banks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  loyalty_program TEXT,
  is_digital BOOLEAN NOT NULL DEFAULT false,
  website TEXT NOT NULL,
  logo_color TEXT NOT NULL DEFAULT '#6366f1',
  cards_url TEXT
);

-- 2. CARDS
CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,
  bank_id TEXT NOT NULL REFERENCES banks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  franchise TEXT NOT NULL CHECK (franchise IN ('Visa', 'Mastercard', 'Amex', 'Diners')),
  type TEXT NOT NULL CHECK (type IN ('credito', 'debito')),
  tier TEXT NOT NULL CHECK (tier IN ('classic','standard','gold','platinum','signature','black','infinite','digital','cashback','premium')),
  no_annual_fee BOOLEAN NOT NULL DEFAULT false,
  fee_note TEXT,
  bank_url TEXT,
  franchise_benefits_url TEXT
);

-- 3. BENEFITS
CREATE TABLE IF NOT EXISTS benefits (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  bank_id TEXT NOT NULL REFERENCES banks(id) ON DELETE CASCADE,
  card_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('general','cashback','puntos','viajes','restaurantes','entretenimiento','supermercados','combustible','streaming','moda','seguros')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  numeric_value NUMERIC,
  value_type TEXT NOT NULL CHECK (value_type IN ('cashback_percent','points_multiplier','lounge_access','discount_percent','fixed_benefit')),
  value_label TEXT NOT NULL,
  conditions TEXT,
  source TEXT,
  status TEXT DEFAULT 'Verificar'
);

-- 4. FRANCHISE BENEFITS
CREATE TABLE IF NOT EXISTS franchise_benefits (
  id SERIAL PRIMARY KEY,
  franchise TEXT NOT NULL CHECK (franchise IN ('Visa', 'Mastercard', 'Amex', 'Diners')),
  min_tier TEXT NOT NULL,
  applies_higher_tiers BOOLEAN NOT NULL DEFAULT true,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  numeric_value NUMERIC,
  value_type TEXT NOT NULL,
  value_label TEXT NOT NULL,
  conditions TEXT,
  applies_colombia BOOLEAN NOT NULL DEFAULT true,
  source_url TEXT
);

-- 5. CARDS_USER (user wallet)
CREATE TABLE IF NOT EXISTS cards_user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  nickname TEXT,
  last_four TEXT CHECK (last_four IS NULL OR length(last_four) = 4),
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, card_id)
);

-- 6. OFFERS
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id TEXT NOT NULL REFERENCES banks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  valid_until TIMESTAMPTZ
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_cards_bank ON cards(bank_id);
CREATE INDEX IF NOT EXISTS idx_benefits_card ON benefits(card_id);
CREATE INDEX IF NOT EXISTS idx_benefits_category ON benefits(category);
CREATE INDEX IF NOT EXISTS idx_cards_user_user ON cards_user(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_user_card ON cards_user(card_id);
CREATE INDEX IF NOT EXISTS idx_offers_bank ON offers(bank_id);
CREATE INDEX IF NOT EXISTS idx_offers_valid ON offers(valid_until);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Banks, cards, benefits, franchise_benefits, offers: public read
ALTER TABLE banks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "banks_read" ON banks FOR SELECT USING (true);

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cards_read" ON cards FOR SELECT USING (true);

ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "benefits_read" ON benefits FOR SELECT USING (true);

ALTER TABLE franchise_benefits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "franchise_benefits_read" ON franchise_benefits FOR SELECT USING (true);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "offers_read" ON offers FOR SELECT USING (true);

-- cards_user: users can only CRUD their own records
ALTER TABLE cards_user ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cards_user_select" ON cards_user
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cards_user_insert" ON cards_user
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cards_user_update" ON cards_user
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "cards_user_delete" ON cards_user
  FOR DELETE USING (auth.uid() = user_id);
