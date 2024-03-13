import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = 'https://jjnuklkikeyiewupvvbw.supabase.co';
const supabaseAPIKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbnVrbGtpa2V5aWV3dXB2dmJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTk0Mjk1NiwiZXhwIjoyMDI1NTE4OTU2fQ.eP72m0fQcTfBHHbBorB_mj9E5zRykCMDA_ctgBrJvKE';


export const supabase = createClient(supabaseUrl, supabaseAPIKey);



