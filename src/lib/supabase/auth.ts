import { isSupabaseConfigured, supabase } from './client';

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
}

function credentials(email: string, password: string) {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    throw new Error('Enter your email address.');
  }

  if (!password) {
    throw new Error('Enter your password.');
  }

  return {
    email: normalizedEmail,
    password,
  };
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signInWithEmail(email: string, password: string) {
  assertConfigured();
  const { error } = await supabase.auth.signInWithPassword(credentials(email, password));
  if (error) throw error;
}

export async function signUpWithEmail(email: string, password: string) {
  assertConfigured();
  const { error } = await supabase.auth.signUp(credentials(email, password));
  if (error) throw error;
}

export async function signOut() {
  assertConfigured();
  await supabase.auth.signOut();
}
