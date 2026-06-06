import { createClient } from '@supabase/supabase-js'

// Credenciales por defecto (anon/publishable key, protegida por RLS) para que
// Vercel y GitHub Pages funcionen sin configurar variables de entorno, como antes.
// Si se definen VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY, tienen prioridad.
// En modo mock (VITE_USE_MOCKS) este cliente nunca se llama.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) || 'https://qcaubrbwrrigwavhfxhd.supabase.co'
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'sb_publishable_iYVxmzwQlnzA-9ehmNEnUw_DVWg1vzD'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
