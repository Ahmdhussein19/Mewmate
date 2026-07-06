'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Cat } from '@/types/cat';
import { Header } from '@/components/Header';
import { CatCard } from '@/components/CatCard';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus } from 'lucide-react';
import { getCurrentUser, signInWithEmail, signOut, signUpWithEmail } from '@/lib/supabase/auth';
import { listCats } from '@/lib/supabase/data';

type AuthMode = 'sign-in' | 'sign-up';

export default function Home() {
  const router = useRouter();
  const [cats, setCats] = useState<Cat[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<AuthMode>('sign-in');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadHome = async () => {
    setIsLoading(true);
    setError('');
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(Boolean(user));
      setCats(user ? await listCats() : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load your cats.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function loadInitialHome() {
      try {
        const user = await getCurrentUser();
        if (ignore) return;
        setIsAuthenticated(Boolean(user));
        setCats(user ? await listCats() : []);
      } catch (e) {
        if (!ignore) setError(e instanceof Error ? e.message : 'Could not load your cats.');
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialHome();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddCat = () => {
    router.push('/add');
  };

  const handleCatClick = (catId: string) => {
    router.push(`/cat/${catId}`);
  };

  const lostCats = cats.filter(c => c.isLost);

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get('email') || '');
    const submittedPassword = String(formData.get('password') || '');

    setIsSubmitting(true);
    setError('');
    try {
      if (authMode === 'sign-in') await signInWithEmail(submittedEmail, submittedPassword);
      else await signUpWithEmail(submittedEmail, submittedPassword);
      await loadHome();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchAuthMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setError('');
  };

  const handleSignOut = async () => {
    await signOut();
    setCats([]);
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full max-w-[430px] min-h-dvh mx-auto bg-[var(--color-bg-page)] relative flex flex-col overflow-hidden">
      <Header showLogo />

      <div className={`flex-1 overflow-y-auto ${isAuthenticated ? 'pb-[calc(128px+env(safe-area-inset-bottom))]' : ''}`}>
        <div className={`p-4 ${!isLoading && !isAuthenticated ? 'flex min-h-full items-center' : ''}`}>
          {isLoading ? (
            <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">Loading...</p>
          ) : !isAuthenticated ? (
            <div className="w-full rounded-[var(--radius-xl)] border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4 shadow-[var(--shadow-sm)]">
              <h1 className="text-center font-display text-2xl font-bold text-[var(--color-brand-primary)]">
                {authMode === 'sign-in' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mx-auto mt-2 max-w-[320px] text-center text-sm leading-[1.5] text-[var(--color-text-secondary)]">
                {authMode === 'sign-in'
                  ? 'Access your cat profiles, QR tags, and recovery contacts.'
                  : 'Set up a secure account to manage your cats and keep every QR tag connected.'}
              </p>
              <form className="mt-5" onSubmit={handleAuth}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete={authMode === 'sign-in' ? 'current-password' : 'new-password'}
                  required
                  minLength={6}
                  hint={authMode === 'sign-up' ? 'Use at least 6 characters.' : undefined}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                {error && <p className="mb-3 text-sm font-semibold text-[var(--color-danger)]">{error}</p>}
                <div className="flex flex-col gap-2.5">
                  <Button fullWidth type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? authMode === 'sign-in' ? 'Signing in...' : 'Creating account...'
                      : authMode === 'sign-in' ? 'Sign in' : 'Create account'}
                  </Button>
                  <p className="text-center text-sm text-[var(--color-text-secondary)]">
                    {authMode === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                      type="button"
                      className="font-bold text-[var(--color-brand-primary)] underline-offset-4 hover:underline"
                      onClick={() => switchAuthMode(authMode === 'sign-in' ? 'sign-up' : 'sign-in')}
                    >
                      {authMode === 'sign-in' ? 'Create one' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          ) : !cats.length ? (
            <EmptyState
              icon="/logos/1.svg"
              title="No cats yet"
              description="Add your cat and get a QR safety tag. If they ever get lost, whoever finds them can reach you in one tap."
            />
          ) : (
            <>
              {lostCats.length > 0 && (
                <div className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)] rounded-[var(--radius-lg)] p-3 flex items-center gap-2.5 mb-3.5">
                  <span className="text-xl">🚨</span>
                  <div className="text-sm font-bold text-[#8F3E20]">
                    {lostCats.length} cat{lostCats.length > 1 ? 's' : ''} in Lost Mode
                  </div>
                </div>
              )}

              <div className="text-sm text-[var(--color-text-secondary)] mb-3.5 font-semibold">
                {cats.length} {cats.length === 1 ? 'cat' : 'cats'} protected
              </div>

              {cats.map(cat => (
                <CatCard key={cat.id} cat={cat} onClick={() => handleCatClick(cat.id)} />
              ))}
              <Button
                fullWidth
                variant="secondary"
                className="mt-2 hover:bg-[var(--color-success-soft)]"
                onClick={() => router.push('/owner')}
              >
                Owner details
              </Button>
              <Button
                fullWidth
                variant="ghost"
                className="mt-2 border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] hover:bg-[var(--color-danger-soft)] hover:text-[#8F3E20]"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="absolute bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[150] max-w-[398px] w-[calc(100%-32px)]">
          <Button fullWidth onClick={handleAddCat}>
            <Plus size={20} />
            Add a cat
          </Button>
        </div>
      )}
    </div>
  );
}
