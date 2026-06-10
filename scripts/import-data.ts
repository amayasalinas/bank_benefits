/**
 * Script de importación de CSVs a Supabase
 *
 * Uso: npx tsx scripts/import-data.ts
 *
 * Requisitos:
 *   - Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_SERVICE_KEY
 *     (o SUPABASE_URL y SUPABASE_SERVICE_KEY)
 *   - Las tablas bancos, tarjetas, beneficios_tarjetas, beneficios_franquicias
 *     deben existir (ejecutar supabase/schema.sql primero)
 *
 * El script es idempotente: usa upsert para no duplicar datos.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ── Config ────────────────────────────────────────────────────
const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  ''
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  ''

if (!supabaseUrl || !supabaseKey) {
  console.error('Falta SUPABASE_URL y/o SUPABASE_SERVICE_KEY en las variables de entorno.')
  console.error('Puedes cargarlas desde .env.local: npx dotenv -e .env.local -- npx tsx scripts/import-data.ts')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ── CSV Parser (semicolon-separated) ──────────────────────────
function parseCSV(filePath: string): Record<string, string>[] {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(';').map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = line.split(';')
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = (values[i] || '').trim()
    })
    return row
  })
}

// ── Data directory ────────────────────────────────────────────
const DATA_DIR = resolve(__dirname, '..', 'datos-eliseo')

// ── Gradients map (from banks.ts, needed for tarjetas) ────────
const CARD_GRADIENTS: Record<string, string> = {
  'ban-mc-classic': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'ban-mc-gold': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  'ban-mc-platinum': 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
  'ban-mc-black': 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  'ban-visa-classic': 'linear-gradient(135deg, #1A1F71 0%, #2E37A4 100%)',
  'ban-visa-gold': 'linear-gradient(135deg, #D4A019 0%, #F5D547 100%)',
  'ban-visa-platinum': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'ban-visa-infinite': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'ban-amex-gold': 'linear-gradient(135deg, #C6A04F 0%, #E8D5A3 50%, #B8912F 100%)',
  'ban-amex-platinum': 'linear-gradient(135deg, #2C2C2C 0%, #4A4A4A 50%, #2C2C2C 100%)',
  'ban-debit': 'linear-gradient(135deg, #FFCC00 0%, #E6B800 100%)',
  'dav-mc-classic': 'linear-gradient(135deg, #E30613 0%, #A30009 100%)',
  'dav-mc-gold': 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
  'dav-mc-black': 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
  'dav-gzero': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'dav-visa-signature': 'linear-gradient(135deg, #232526 0%, #414345 50%, #1A1F71 100%)',
  'dav-diners': 'linear-gradient(135deg, #004A97 0%, #1565C0 100%)',
  'dav-debit': 'linear-gradient(135deg, #E30613 0%, #FF6B6B 100%)',
  'bbva-aqua': 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
  'bbva-coral': 'linear-gradient(135deg, #f7797d 0%, #FBD786 50%, #C6FFDD 100%)',
  'bbva-visa-platinum': 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  'bbva-visa-infinite': 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
  'bbva-blue-diamond': 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  'bbva-mc-black': 'linear-gradient(135deg, #1c1c1c 0%, #3d3d3d 100%)',
  'bbva-debit': 'linear-gradient(135deg, #004481 0%, #0066C5 100%)',
  'bog-classic': 'linear-gradient(135deg, #E5202E 0%, #A00018 100%)',
  'bog-platinum': 'linear-gradient(135deg, #536976 0%, #292E49 100%)',
  'bog-infinite': 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
  'bog-latam-classic': 'linear-gradient(135deg, #C00E1A 0%, #FF3333 100%)',
  'bog-latam-platinum': 'linear-gradient(135deg, #870000 0%, #190A05 100%)',
  'bog-latam-signature': 'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
  'pop-visa-classic': 'linear-gradient(135deg, #003087 0%, #0050CC 100%)',
  'pop-visa-gold': 'linear-gradient(135deg, #B8860B 0%, #FFD700 100%)',
  'pop-visa-signature': 'linear-gradient(135deg, #003087 0%, #001A4D 100%)',
  'pop-mc-black': 'linear-gradient(135deg, #0f0f0f 0%, #2d2d2d 100%)',
  'col-one-cashback': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'col-one-classic-visa': 'linear-gradient(135deg, #EC1C24 0%, #9B0018 100%)',
  'col-one-gold': 'linear-gradient(135deg, #c6a84b 0%, #ffd89b 100%)',
  'col-one-black-amex': 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
  'col-lifemiles': 'linear-gradient(135deg, #E40000 0%, #000000 100%)',
  'col-cencosud': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  'col-pricesmart': 'linear-gradient(135deg, #005B8E 0%, #0088CC 100%)',
  'itau-tdevuelve': 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
  'itau-visa-classic': 'linear-gradient(135deg, #EC7000 0%, #FF9A3C 100%)',
  'itau-visa-platinum': 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  'itau-mc-black': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  'itau-visa-infinite': 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
  'occ-visa-classic': 'linear-gradient(135deg, #0053A0 0%, #0077CC 100%)',
  'occ-latam-platinum': 'linear-gradient(135deg, #870000 0%, #190A05 100%)',
  'occ-latam-signature': 'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
  'occ-mc-black': 'linear-gradient(135deg, #1c1c1c 0%, #3d3d3d 100%)',
  'av-classic': 'linear-gradient(135deg, #009E3A 0%, #00C850 100%)',
  'av-gold': 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
  'av-boomerang': 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
  'av-carroya': 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)',
  'av-lifemiles': 'linear-gradient(135deg, #E40000 0%, #000000 100%)',
  'av-debit': 'linear-gradient(135deg, #009E3A 0%, #005C22 100%)',
  'nu-credit': 'linear-gradient(135deg, #820AD1 0%, #5D0096 100%)',
  'nu-control': 'linear-gradient(135deg, #5D0096 0%, #9B59B6 100%)',
  'lulo-debit': 'linear-gradient(135deg, #00C28B 0%, #008F65 100%)',
  'lulo-credit': 'linear-gradient(135deg, #007955 0%, #00C28B 100%)',
  'lulo-pro': 'linear-gradient(135deg, #1a1a2e 0%, #00C28B 100%)',
  'rappi-card': 'linear-gradient(135deg, #FF441F 0%, #CC2200 100%)',
  'nequi-debit': 'linear-gradient(135deg, #7B2FBE 0%, #A855F7 100%)',
}

// ── Import functions ──────────────────────────────────────────

async function importBancos() {
  console.log('Importando bancos...')
  const rows = parseCSV(resolve(DATA_DIR, '1_BANCOS.csv'))
  const data = rows.map(r => ({
    id: r.id,
    nombre: r.nombre,
    nombre_corto: r.nombre_corto,
    programa_fidelidad: r.programa_fidelidad || '',
    es_digital: r.es_digital === 'Sí',
    website: r.website || '',
    color_logo: r.color_logo || '#000000',
  }))

  const { error } = await supabase
    .from('bancos')
    .upsert(data, { onConflict: 'id' })

  if (error) throw new Error(`Error importando bancos: ${error.message}`)
  console.log(`  ${data.length} bancos importados.`)
}

async function importTarjetas() {
  console.log('Importando tarjetas...')
  const rows = parseCSV(resolve(DATA_DIR, '2_TARJETAS.csv'))
  const data = rows.map(r => ({
    id: r.id,
    banco_id: r.banco_id,
    nombre: r.nombre_tarjeta,
    franquicia: r.franquicia,
    tipo: r.tipo === 'credito' ? 'credit' : 'debit',
    nivel: r.nivel,
    sin_cuota_manejo: r.sin_cuota_manejo === 'Sí',
    nota_cuota_manejo: r.nota_cuota_manejo || '',
    gradiente: CARD_GRADIENTS[r.id] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  }))

  const { error } = await supabase
    .from('tarjetas')
    .upsert(data, { onConflict: 'id' })

  if (error) throw new Error(`Error importando tarjetas: ${error.message}`)
  console.log(`  ${data.length} tarjetas importadas.`)
}

async function importBeneficiosTarjetas() {
  console.log('Importando beneficios de tarjetas...')
  const rows = parseCSV(resolve(DATA_DIR, '3_BENEFICIOS_TARJETAS.csv'))
  const data = rows.map(r => ({
    id: r.id,
    tarjeta_id: r.tarjeta_id,
    categoria: r.categoria,
    titulo: r.titulo_beneficio,
    descripcion: r.descripcion || '',
    valor: r.valor_numerico ? parseFloat(r.valor_numerico) : null,
    tipo_valor: r.tipo_valor,
    condiciones: r.condiciones || '',
  }))

  const { error } = await supabase
    .from('beneficios_tarjetas')
    .upsert(data, { onConflict: 'id' })

  if (error) throw new Error(`Error importando beneficios_tarjetas: ${error.message}`)
  console.log(`  ${data.length} beneficios importados.`)
}

async function importBeneficiosFranquicias() {
  console.log('Importando beneficios de franquicias...')
  const rows = parseCSV(resolve(DATA_DIR, '4_BENEFICIOS_FRANQUICIAS.csv'))

  // Generate IDs since the CSV has empty IDs
  const data = rows.map((r, idx) => ({
    id: `bf-${r.franquicia?.toLowerCase()}-${r.nivel_minimo}-${idx + 1}`,
    franquicia: r.franquicia,
    nivel_minimo: r.nivel_minimo,
    categoria: r.categoria,
    titulo: r.titulo_beneficio,
    descripcion: r.descripcion || '',
    valor: r.valor_numerico ? parseFloat(r.valor_numerico) : null,
    tipo_valor: r.tipo_valor,
    condiciones: r.condiciones || '',
    aplica_colombia: r.aplica_colombia === 'Sí',
  }))

  const { error } = await supabase
    .from('beneficios_franquicias')
    .upsert(data, { onConflict: 'id' })

  if (error) throw new Error(`Error importando beneficios_franquicias: ${error.message}`)
  console.log(`  ${data.length} beneficios de franquicia importados.`)
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
  console.log('=== ELISEO - Importación de datos ===')
  console.log(`Supabase URL: ${supabaseUrl}`)
  console.log('')

  try {
    await importBancos()
    await importTarjetas()
    await importBeneficiosTarjetas()
    await importBeneficiosFranquicias()
    console.log('')
    console.log('Importación completada exitosamente.')
  } catch (err) {
    console.error('Error durante la importación:', err)
    process.exit(1)
  }
}

main()
