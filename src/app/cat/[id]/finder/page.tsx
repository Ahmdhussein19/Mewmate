'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Cat } from '@/types/cat';
import { formatDate, getFinderCat, telLink, timeAgo, whatsappLink } from '@/lib/supabase/data';
import { Button } from '@/components/ui/Button';
import { PhotoCarousel } from '@/components/PhotoCarousel';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function FinderPage() {
  const router = useRouter();
  const params = useParams();
  const tagCode = params.id as string;
  const [cat, setCat] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadFinderProfile() {
      setIsLoading(true);
      setError('');
      try {
        const nextCat = await getFinderCat(tagCode);
        if (!ignore) setCat(nextCat);
      } catch (e) {
        if (!ignore) setError(e instanceof Error ? e.message : 'Could not load this cat profile.');
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadFinderProfile();
    return () => {
      ignore = true;
    };
  }, [tagCode]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">Loading...</p>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] flex items-center justify-center">
        <p className="px-6 text-center text-[var(--color-text-secondary)]">
          {error || 'Cat not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] relative flex flex-col">
      {cat.isLost && cat.lost ? (
        <div className="bg-[var(--color-danger-soft)] border-b border-[var(--color-danger)] text-[#8F3E20] text-center py-5.5 px-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.06em] uppercase">
            <span className="text-lg leading-none">🚨</span>
            Missing cat
          </div>
          <h1 className="font-display font-bold text-[30px] mt-1">
            {cat.name}
          </h1>
          <div className="mt-2 text-xs font-semibold">
            Active since {formatDate(cat.lost.since)} · {timeAgo(cat.lost.since)}
            {cat.lost.lastSeen ? ` · Last seen: ${cat.lost.lastSeen}` : ''}
          </div>
          {cat.lost.reward && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[var(--color-bg-card)] border border-[var(--color-danger)] px-3.5 py-1.5 rounded-full font-bold text-sm">
              Reward: {cat.lost.reward}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] text-center py-5.5 px-4">
          <div className="text-xs font-bold tracking-[0.06em] uppercase opacity-90">
            FOUND A CAT?
          </div>
          <h1 className="font-display font-bold text-[30px] mt-1">
            {cat.name}
          </h1>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-4">
          <PhotoCarousel photos={cat.photos || []} alt={cat.name} />

          {cat.isLost && cat.lost && (
            <>
              {cat.lost.lastSeen && (
                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
                  <MapPin size={18} className="text-[var(--color-danger)]" />
                  <span className="font-semibold">Last seen: {cat.lost.lastSeen}</span>
                </div>
              )}
              {cat.lost.lastSeenWhen && (
                <div className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {cat.lost.lastSeenWhen}
                </div>
              )}
              {cat.lost.extraNote && (
                <div className="mt-3 p-3 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)]">
                  {cat.lost.extraNote}
                </div>
              )}
            </>
          )}

          <div className="mt-4 space-y-2">
            <a
              href={whatsappLink(cat.ownerWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full bg-[var(--color-bg-card)] border border-[var(--color-border-strong)] rounded-[var(--radius-lg)] p-3.5 px-4 cursor-pointer hover:bg-[var(--color-bg-soft)] transition-colors no-underline text-[var(--color-text-primary)]"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-success-soft)] text-[var(--color-brand-primary)] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-[var(--color-brand-primary)]">
                  WhatsApp
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {cat.ownerWhatsApp}
                </div>
              </div>
            </a>

            {cat.ownerPhone && (
              <a
                href={telLink(cat.ownerPhone)}
                className="flex items-center gap-3 w-full bg-[var(--color-bg-card)] border border-[var(--color-border-strong)] rounded-[var(--radius-lg)] p-3.5 px-4 cursor-pointer hover:bg-[var(--color-bg-soft)] transition-colors no-underline text-[var(--color-text-primary)]"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[var(--color-brand-primary)]">
                    Call
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">
                    {cat.ownerPhone}
                  </div>
                </div>
              </a>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="font-display font-semibold text-base text-[var(--color-brand-primary)]">
              About {cat.name}
            </h2>

            <div className="grid grid-cols-2 gap-2.5">
              {cat.breed && (
                <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3">
                  <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                    Breed
                  </div>
                  <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                    {cat.breed}
                  </div>
                </div>
              )}
              {cat.color && (
                <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3">
                  <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                    Color
                  </div>
                  <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                    {cat.color}
                  </div>
                </div>
              )}
              {cat.age && (
                <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3">
                  <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                    Age
                  </div>
                  <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                    {cat.age}
                  </div>
                </div>
              )}
              {cat.city && (
                <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3">
                  <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                    City
                  </div>
                  <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                    {cat.city}
                  </div>
                </div>
              )}
            </div>

            {cat.personality && (
              <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3">
                <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                  Personality
                </div>
                <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                  {cat.personality}
                </div>
              </div>
            )}
          </div>

          {cat.emergencyName && (
            <div className="mt-6">
              <h2 className="font-display font-semibold text-base text-[var(--color-brand-primary)] mb-3">
                Emergency Contact
              </h2>
              <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-3">
                <div className="font-semibold text-sm text-[var(--color-text-primary)]">
                  {cat.emergencyName}
                </div>
                {cat.emergencyPhone && (
                  <a
                    href={telLink(cat.emergencyPhone)}
                    className="text-sm text-[var(--color-brand-primary)] mt-1 block"
                  >
                    {cat.emergencyPhone}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Button variant="secondary" fullWidth onClick={() => router.back()}>
              Close preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
