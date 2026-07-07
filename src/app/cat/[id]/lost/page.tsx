'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Cat } from '@/types/cat';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Image as ImageIcon, Share2, Eye, CheckCircle, MapPin } from 'lucide-react';
import { formatDate, getOwnedCat, markFound, placeholderPhoto, timeAgo, updateLostReport } from '@/lib/supabase/data';

export default function LostMode() {
  const router = useRouter();
  const params = useParams();
  const catId = params.id as string;
  const [cat, setCat] = useState<Cat | null>(null);

  const [formData, setFormData] = useState({
    lastSeen: '',
    lastSeenWhen: '',
    reward: '',
    extraNote: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCat = async () => {
      setIsLoading(true);
      setError('');
      try {
        const loadedCat = await getOwnedCat(catId);
        setCat(loadedCat);
        setFormData({
          lastSeen: loadedCat?.lost?.lastSeen || '',
          lastSeenWhen: loadedCat?.lost?.lastSeenWhen || '',
          reward: loadedCat?.lost?.reward || '',
          extraNote: loadedCat?.lost?.extraNote || '',
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load lost mode.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCat();
  }, [catId]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">Loading...</p>
      </div>
    );
  }

  if (!cat || !cat.isLost) {
    return (
      <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">{error || 'Lost Mode not active'}</p>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateLostReport(cat, formData);
      setCat(await getOwnedCat(cat.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save lost details.');
    }
  };

  const handleMarkFound = async () => {
    await markFound(cat.id);
    router.push(`/cat/${catId}`);
  };

  const handleGeneratePoster = () => {
    router.push(`/cat/${catId}/poster`);
  };

  const handleShare = () => {
    const text = `LOST CAT: ${cat.name}\n\n${formData.lastSeen ? `Last seen: ${formData.lastSeen}\n` : ''}${formData.reward ? `Reward: ${formData.reward}\n` : ''}If found, please contact via WhatsApp: ${cat.ownerWhatsApp}\n\nPlease help spread the word!`;
    
    if (navigator.share) {
      navigator.share({
        title: `Lost Cat: ${cat.name}`,
        text,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const handlePreviewFinder = () => {
    router.push(`/cat/${cat.tagCode || cat.id}/finder`);
  };

  const photo = cat.photos?.[0] || placeholderPhoto();

  return (
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] relative flex flex-col">
      <Header title="Lost Mode" showBack onBack={() => router.back()} showLogo={false} />

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-4">
          <div className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)] rounded-[var(--radius-lg)] p-3 flex items-center gap-2.5 mb-3.5">
            <span className="text-2xl">🚨</span>
            <div>
              <div className="text-sm font-bold text-[#8F3E20]">
                {cat.name} is in Lost Mode
              </div>
              <div className="text-xs text-[#8F3E20]">
                Active since {formatDate(cat.lost!.since)} · {timeAgo(cat.lost!.since)}
              </div>
            </div>
          </div>

          {cat.neighborhood && (
            <div className="mb-3.5 flex items-center gap-2.5 rounded-[var(--radius-lg)] border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-3 text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-brand-primary)]">
                <MapPin size={17} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-text-muted)]">
                  Owner neighborhood
                </div>
                <div className="text-sm font-medium text-[var(--color-text-primary)]">
                  {cat.neighborhood}
                </div>
              </div>
            </div>
          )}

          <img
            src={photo}
            alt={cat.name}
            className="w-full aspect-square object-cover rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)] shadow-[var(--shadow-md)]"
          />

          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mt-5 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            Missing details
          </div>

          <Input
            label="Last seen — location"
            value={formData.lastSeen}
            onChange={e => handleInputChange('lastSeen', e.target.value)}
            placeholder="e.g. Near Road 9, Maadi"
          />

          <Input
            label="Last seen — when"
            value={formData.lastSeenWhen}
            onChange={e => handleInputChange('lastSeenWhen', e.target.value)}
            placeholder="e.g. Today ~6pm"
          />

          <Input
            label="Reward (optional)"
            value={formData.reward}
            onChange={e => handleInputChange('reward', e.target.value)}
            placeholder="e.g. 1000 EGP"
          />

          <Textarea
            label="Extra note for finders"
            value={formData.extraNote}
            onChange={e => handleInputChange('extraNote', e.target.value)}
            placeholder="e.g. Do not chase — she gets scared. Call and wait."
          />

          {error && <p className="mb-3 text-sm font-semibold text-[var(--color-danger)]">{error}</p>}
          <Button onClick={handleSave} className="mt-2">
            Save lost details
          </Button>

          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mt-6 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            Share & recover
          </div>

          <Button variant="danger" onClick={handleGeneratePoster}>
            <ImageIcon size={20} />
            Generate lost poster
          </Button>

          <Button variant="secondary" className="mt-2.5" onClick={handleShare}>
            <Share2 size={20} />
            Share alert (WhatsApp / groups)
          </Button>

          <Button variant="secondary" className="mt-2.5" onClick={handlePreviewFinder}>
            <Eye size={20} />
            Preview finder page
          </Button>

          <Button
            variant="secondary"
            className="mt-2.5 border-[var(--color-success)] text-[var(--color-success)]"
            onClick={handleMarkFound}
          >
            <CheckCircle size={20} />
            Mark as found — turn off Lost Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
