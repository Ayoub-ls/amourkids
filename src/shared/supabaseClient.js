import { createClient } from "@supabase/supabase-js";

/*
  Reads the Supabase project URL and public (anon) key from your .env file.
  Vite:  VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY   (import.meta.env)
  If you're on Create React App instead, change the two lines below to:
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  and prefix your .env variables with REACT_APP_ instead of VITE_.
*/
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file (see .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
