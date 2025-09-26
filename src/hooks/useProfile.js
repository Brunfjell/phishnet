import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useAuthStore } from "../stores/authStore";

export function useProfile() {
  const { user, profile, setProfile } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [user, setProfile]);

  return { profile };
}
