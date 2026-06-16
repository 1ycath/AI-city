import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase 未配置：请在 .env.local 中设置 VITE_SUPABASE_URL 与 VITE_SUPABASE_PUBLISHABLE_KEY',
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '');
