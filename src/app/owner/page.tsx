'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { OwnerDetailsForm } from '@/components/OwnerDetailsForm';
import type { OwnerProfile } from '@/types/cat';
import { getOwnerProfile, saveOwnerProfile } from '@/lib/supabase/data';

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/home';
  return value;
}

export default function OwnerPage() {
  const router = useRouter();
  const [ownerProfile, setOwnerProfile] = useState<OwnerProfile>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const nextPath = useMemo(() => {
    if (typeof window === 'undefined') return '/home';
    return safeNextPath(new URLSearchParams(window.location.search).get('next'));
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadOwnerProfile() {
      setIsLoading(true);
      setError('');
      try {
        const profile = await getOwnerProfile();
        if (!ignore) setOwnerProfile(profile);
      } catch (loadError) {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : 'Could not load owner details.');
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadOwnerProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = async (profile: OwnerProfile) => {
    setIsSubmitting(true);
    setError('');
    try {
      await saveOwnerProfile(profile);
      router.push(nextPath);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save owner details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[430px] min-h-dvh mx-auto bg-[var(--color-bg-page)] relative flex flex-col">
      <Header title="Owner details" showBack onBack={() => router.back()} showLogo={false} />

      <main className="flex flex-1 items-center overflow-y-auto p-4">
        {isLoading ? (
          <p className="w-full py-10 text-center text-sm text-[var(--color-text-secondary)]">Loading...</p>
        ) : (
          <OwnerDetailsForm
            initialValue={ownerProfile}
            isSubmitting={isSubmitting}
            error={error}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
}
