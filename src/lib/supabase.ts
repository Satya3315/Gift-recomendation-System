import { createClient } from '@supabase/supabase-js';

// Check for environment variables before creating client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;