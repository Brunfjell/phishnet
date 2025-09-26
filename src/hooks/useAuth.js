import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useAuthStore } from "../stores/authStore";

export function useAuth() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return { user };
}
