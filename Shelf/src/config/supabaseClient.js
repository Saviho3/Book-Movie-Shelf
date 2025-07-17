import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// IMPORTANT: Set VITE_SUPABASE_URL and VITE_SUPABASE_KEY in your .env file (do NOT commit .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase