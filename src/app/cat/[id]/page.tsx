'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Cat } from '@/types/cat';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QRCodeComponent } from '@/components/QRCode';
import { Download, Eye, AlertTriangle } from 'lucide-react';
import { finderURL, getOwnedCat, markFound, placeholderPhoto, startLostMode, timeAgo } from '@/lib/supabase/data';

export default function CatDetail() {
  const router = useRouter();
  const params = useParams();
  const catId = params.id as string;
  const [cat, setCat] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCat = async () => {
      setIsLoading(true);
      setError('');
      try {
        setCat(await getOwnedCat(catId));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load this cat.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCat();
  }, [catId]);

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `mewmate-qr-${catId}.png`;
      a.click();
    }
  };

  const handleStartLostMode = async () => {
    if (!cat) return;
    await startLostMode(cat);
    router.push(`/cat/${catId}/lost`);
  };

  const handleMarkFound = async () => {
    if (!cat) return;
    await markFound(cat.id);
    setCat(await getOwnedCat(cat.id));
  };

  const handlePreviewFinder = () => {
    if (cat) router.push(`/cat/${cat.tagCode || cat.id}/finder`);
  };

  const handleEdit = () => {
    router.push(`/cat/${catId}/edit`);
  };

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
        <p className="text-[var(--color-text-secondary)]">{error || 'Cat not found'}</p>
      </div>
    );
  }

  const photo = cat.photos?.[0] || placeholderPhoto();

  return (
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] relative flex flex-col">
      <Header title={cat.name} showBack onBack={() => router.back()} showLogo={false} />

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-4">
          {cat.isLost && (
            <div className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)] rounded-[var(--radius-lg)] p-3 flex items-center gap-2.5 mb-3.5">
              <span className="text-xl">🚨</span>
              <div>
                <div className="text-sm font-bold text-[#8F3E20]">
                  Lost mode is ON{cat.lost?.since ? ` · ${timeAgo(cat.lost.since)}` : ''}
                </div>
                <div className="text-xs text-[#8F3E20]">Finder page shows an urgent alert.</div>
              </div>
            </div>
          )}

          <img
            src={photo}
            alt={cat.name}
            className="w-full aspect-square object-cover rounded-[var(--radius-2xl)] bg-[var(--color-bg-soft)] shadow-[var(--shadow-md)]"
          />

          <h1 className="font-display font-bold text-[32px] text-[var(--color-brand-primary)] leading-[1] mt-4 mb-2">
            {cat.name}
          </h1>

          {cat.isLost ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--color-danger-soft)] text-[#8F3E20]">
              ● Lost mode
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--color-success-soft)] text-[var(--color-brand-primary)]">
              ● Safe at home
            </span>
          )}

          <div className="grid grid-cols-2 gap-2.5 mt-3.5">
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
            {cat.personality && (
              <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3 col-span-2">
                <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                  Personality
                </div>
                <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                  {cat.personality}
                </div>
              </div>
            )}
            {cat.vetContact && (
              <div className="bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] p-2.5 px-3 col-span-2">
                <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                  Vet
                </div>
                <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-semibold">
                  {cat.vetContact}
                </div>
              </div>
            )}
          </div>

          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mt-6 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            QR safety tag
          </div>

          <Card className="border-2 border-[var(--color-brand-accent)] p-5 text-center mt-2">
            <QRCodeComponent value={finderURL(cat)} />
            <div className="text-xs text-[var(--color-text-muted)] mt-2.5 break-all">
              {finderURL(cat)}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-[1.4]">
              Print once. Edit the profile anytime — the tag keeps working.
            </p>
            <div className="flex gap-2.5 mt-3.5">
              <Button size="sm" className="flex-1" onClick={handleDownloadQR}>
                <Download size={16} />
                Download PNG
              </Button>
              <Button size="sm" variant="secondary" className="flex-1" onClick={handlePreviewFinder}>
                <Eye size={16} />
                Preview finder
              </Button>
            </div>
          </Card>

          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mt-6 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            Lost mode
          </div>

          {cat.isLost ? (
            <div className="flex flex-col gap-2.5">
              <Button fullWidth variant="danger" onClick={() => router.push(`/cat/${catId}/lost`)}>
                Manage Lost Mode
              </Button>
              <Button
                fullWidth
                variant="secondary"
                className="border-[var(--color-success)] text-[var(--color-success)]"
                onClick={handleMarkFound}
              >
                ✓ Mark as found (turn off)
              </Button>
            </div>
          ) : (
            <>
              <Button variant="danger" onClick={handleStartLostMode}>
                <AlertTriangle size={20} />
                Report {cat.name} as lost
              </Button>
              <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-[1.4]">
                Turns the finder page into an urgent missing-cat alert with reward and last-seen location.
              </p>
            </>
          )}

          <div className="flex flex-col gap-2.5 mt-5">
            <Button onClick={handleEdit}>
              Edit profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
