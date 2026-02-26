import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qcaubrbwrrigwavhfxhd.supabase.co'
const supabaseAnonKey = 'sb_publishable_iYVxmzwQlnzA-9ehmNEnUw_DVWg1vzD'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
