import asyncstorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const EXPO_PUBLIC_SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY || "";

export const supabase = createClient(SUPABASE_URL, EXPO_PUBLIC_SUPABASE_KEY, {
  auth: {
    storage: asyncstorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
