import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://smyowokinmmgmemhoqtl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteW93b2tpbm1tZ21lbWhvcXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzI4OTAsImV4cCI6MjA1NDYwODg5MH0.jw3YkX_zoze3hMl2U6ZLfT_Ss2dydPCR9_RQymYbFJ0";
export const supabase = createClient(supabaseUrl, supabaseKey);
