import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // fixed: was SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase URL or Service Key. Running in degraded mode without DB connection.');
}

// We use service key for backend admin tasks like inserting contact messages
export const supabase = createClient(
  supabaseUrl || 'http://localhost',
  supabaseServiceKey || 'dummy_key'
);
