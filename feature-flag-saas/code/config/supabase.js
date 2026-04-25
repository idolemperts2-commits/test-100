const { createClient } = require('@supabase/supabase-js');

// Load from environment variables or .env files
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

module.exports = createClient(supabaseUrl, supabaseKey);