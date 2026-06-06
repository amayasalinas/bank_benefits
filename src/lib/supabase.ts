import { createClient } from '@supabase/supabase-js'

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// En modo mock el cliente nunca se usa (los hooks y dataSource cortocircuitan),
// así que no exigimos credenciales y evitamos romper el arranque local.
if (!useMocks && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env variables')
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321',
  supabaseAnonKey || 'mock-anon-key'
)
