import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akvwqlplfkvhyvzvrjlf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdndxbHBsZmt2aHl2enZyamxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMzgxMzIsImV4cCI6MjA4OTYxNDEzMn0.DSO3oGxQh1O8-n9_TSZkcMPdw_tacvs75zWawCuFcok';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
