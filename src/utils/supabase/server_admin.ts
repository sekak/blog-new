import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_SERVER_SUPABASE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Access auth admin api
export const adminAuthClient = supabase.auth.admin