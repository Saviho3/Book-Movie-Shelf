import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rxyeyusxhkhgmcishevv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWV5dXN4aGtoZ21jaXNoZXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTQwNjksImV4cCI6MjA2MjM5MDA2OX0.2bGJS8GEPxQeFWL4ZV7qiQHNGI66P63InLxJrFkI7Bo'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase