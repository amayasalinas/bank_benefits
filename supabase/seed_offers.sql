-- ELISEO V2 — Seed inicial de ofertas (idempotente).
-- Ofertas de arranque para que la pantalla Ofertas no quede vacía.
-- ⚠️ Son demo con vigencias jun-ago 2026: el pipeline de curación
-- (PRD §11, doble fuente + SLA 7 días) debe reemplazarlas/validarlas.
INSERT INTO offers (id, bank_id, title, description, category, valid_until, url, confidence) VALUES
  ('00000000-0000-4000-8000-000000000001', 'bancolombia', '20% en restaurantes aliados', 'Descuento pagando con tarjetas Bancolombia en restaurantes seleccionados.', 'restaurantes', '2026-06-30', 'https://www.bancolombia.com/personas/promociones', 'probable'),
  ('00000000-0000-4000-8000-000000000002', 'davivienda', '3 cuotas sin interés en tecnología', 'Difiere tus compras de tecnología a 3 meses sin interés.', 'general', '2026-07-15', 'https://www.davivienda.com/wps/portal/personas/nuevo', 'accion'),
  ('00000000-0000-4000-8000-000000000003', 'nu', 'Cashback directo, sin letra pequeña', 'Devolución directa a tu saldo en todas las compras.', 'cashback', NULL, 'https://nu.com.co/', 'confirmado'),
  ('00000000-0000-4000-8000-000000000004', 'bbva', '15% en combustible', 'Devolución especial en estaciones de servicio aliadas.', 'combustible', '2026-08-01', 'https://www.bbva.com.co/personas/promociones.html', 'probable'),
  ('00000000-0000-4000-8000-000000000005', 'colpatria', 'Millas dobles en compras internacionales', 'Acumula el doble de millas — clientes seleccionados, revisa elegibilidad.', 'viajes', '2026-07-31', 'https://www.scotiabankcolpatria.com/promociones', 'probable'),
  ('00000000-0000-4000-8000-000000000006', 'davivienda', '10% en supermercados', 'Descuento en cadenas aliadas los fines de semana.', 'supermercados', '2026-06-28', 'https://www.davivienda.com/wps/portal/personas/nuevo', 'confirmado')
ON CONFLICT (id) DO NOTHING;
