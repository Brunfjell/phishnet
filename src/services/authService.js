import { supabase } from "../utils/supabaseClient";

export async function signIn({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp({ email, password }) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/update-password`, 
  });
}

export async function updatePassword(newPassword) {
  return supabase.auth.updateUser({ password: newPassword });
}
