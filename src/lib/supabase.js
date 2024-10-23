import { createClient } from '@supabase/supabase-js'

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON)

export default supabase;