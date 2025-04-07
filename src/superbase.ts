import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yrxblocxxfzkxspbzqlp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeGJsb2N4eGZ6a3hzcGJ6cWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MDk1MDcsImV4cCI6MjA1NDQ4NTUwN30.OP69BSyuhPYHZqAHta9NZ8e8xdwUvQvJyxLhFZmQoQs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
