'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Cat } from '@/types/cat';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { X, Trash2 } from 'lucide-react';
import { deleteCat, getOwnedCat, updateCat } from '@/lib/supabase/data';

export default function EditCat() {
  const router = useRouter();
  const params = useParams();
  const catId = params.id as string;
  const [cat, setCat] = useState<Cat | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    color: '',
    city: '',
    personality: '',
    vetContact: '',
    medicalNotes: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const loadCat = async () => {
      setIsLoading(true);
      setSubmitError('');
      try {
        const loadedCat = await getOwnedCat(catId);
        setCat(loadedCat);
        if (loadedCat) {
          setFormData({
            name: loadedCat.name || '',
            breed: loadedCat.breed || '',
            age: loadedCat.age || '',
            color: loadedCat.color || '',
            city: loadedCat.city || '',
            personality: loadedCat.personality || '',
            vetContact: loadedCat.vetContact || '',
            medicalNotes: loadedCat.medicalNotes || '',
          });
          setPhotos(loadedCat.photos || []);
        }
      } catch (e) {
        setSubmitError(e instanceof Error ? e.message : 'Could not load this cat.');
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

  if (!cat) {
    return (
      <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">{submitError || 'Cat not found'}</p>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        
        if (photos.length < 4) {
          setPhotos(prev => [...prev, dataUrl]);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePhotoRemove = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleMakeMain = (index: number) => {
    if (index === 0) return;
    const [photo] = photos.splice(index, 1);
    setPhotos([photo, ...photos]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateCat(catId, formData, photos, cat);
      router.push(`/cat/${catId}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not save changes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Delete this cat? The QR tag will stop working and all data is removed. This can\'t be undone.')) {
      try {
        await deleteCat(catId, cat);
        router.push('/home');
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Could not delete this cat.');
      }
    }
  };

  return (
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-[var(--color-bg-page)] relative flex flex-col">
      <Header title="Edit profile" showBack onBack={() => router.back()} showLogo={false} />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pb-8">
        <div className="p-4">
          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            Photos
          </div>

          <div className="flex gap-2.5 flex-wrap mb-1">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-[78px] h-[78px] rounded-[var(--radius-lg)] object-cover border border-[var(--color-border-soft)] cursor-pointer"
                  onClick={() => handleMakeMain(index)}
                />
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 text-[10px] font-bold bg-[var(--color-brand-accent)] text-[var(--color-brand-primary)] px-1.5 py-0.5 rounded-full">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handlePhotoRemove(index)}
                  aria-label="Remove photo"
                  className="absolute -top-1.5 -right-1.5 w-5.5 h-5.5 rounded-full bg-[var(--color-danger)] text-white border-2 border-[var(--color-bg-card)] text-xs flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {photos.length < 4 && (
              <label className="w-[78px] h-[78px] rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] text-[28px] flex items-center justify-center cursor-pointer">
                ＋
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoAdd} />
              </label>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] leading-[1.4]">
            Up to 4. First photo shows on the finder page, tag & poster. Tap a photo to make it the main one.
          </p>

          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mt-5.5 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            The basics
            <span className="text-[11px] font-bold text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-full ml-1.5">
              public
            </span>
          </div>

          <Input
            label="Name"
            required
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            error={errors.name}
            placeholder="e.g. Simba"
          />

          <div className="flex gap-2.5">
            <Input
              label="Breed"
              value={formData.breed}
              onChange={e => handleInputChange('breed', e.target.value)}
              placeholder="Baladi / DSH"
              className="flex-1"
            />
            <Input
              label="Age"
              value={formData.age}
              onChange={e => handleInputChange('age', e.target.value)}
              placeholder="2 yrs"
              className="flex-1"
            />
          </div>

          <Input
            label="Color / markings"
            value={formData.color}
            onChange={e => handleInputChange('color', e.target.value)}
            placeholder="Ginger with white chest"
          />

          <Input
            label="City"
            value={formData.city}
            onChange={e => handleInputChange('city', e.target.value)}
            placeholder="Cairo"
          />

          <Textarea
            label="Personality / behavior"
            value={formData.personality}
            onChange={e => handleInputChange('personality', e.target.value)}
            placeholder="Shy with strangers, may hide. Answers to name."
            hint={<span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-full ml-1.5">public</span>}
          />

          <div className="font-display font-semibold text-base text-[var(--color-brand-primary)] mt-5.5 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--color-brand-accent)] rounded-sm" />
            Vet & medical
            <span className="text-[11px] font-bold text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-full ml-1.5">
              mixed
            </span>
          </div>

          <Input
            label="Vet clinic / number"
            value={formData.vetContact}
            onChange={e => handleInputChange('vetContact', e.target.value)}
            placeholder="e.g. Maadi Vet — 01xxxxxxxxx"
          />

          <Textarea
            label="Medical notes"
            value={formData.medicalNotes}
            onChange={e => handleInputChange('medicalNotes', e.target.value)}
            placeholder="Allergies, medication, chronic conditions..."
            hint="Private by default."
          />

          <Button
            type="button"
            variant="ghost"
            fullWidth
            className="border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-brand-primary)] hover:bg-[var(--color-success-soft)]"
            onClick={() => router.push(`/owner?next=/cat/${catId}/edit`)}
          >
            Edit owner details
          </Button>

          <div className="flex flex-col gap-2.5 mt-5">
            {submitError && <p className="text-sm font-semibold text-[var(--color-danger)]">{submitError}</p>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full border border-[var(--color-danger)] bg-[var(--color-bg-card)] text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] hover:text-[#8F3E20]"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
              Delete this cat
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
