import { supabase } from "../utils/supabaseClient";

export async function fetchCampaigns() {
  const { data, error } = await supabase.from("campaigns").select("*");
  if (error) throw error;
  return data;
}
