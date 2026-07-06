'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { OwnerProfile } from '@/types/cat';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type OwnerDetailsFormProps = {
  initialValue: OwnerProfile;
  isSubmitting?: boolean;
  submitLabel?: string;
  error?: string;
  onSubmit: (profile: OwnerProfile) => void | Promise<void>;
};

export function OwnerDetailsForm({
  initialValue,
  isSubmitting = false,
  submitLabel = 'Save owner details',
  error,
  onSubmit,
}: OwnerDetailsFormProps) {
  const [formData, setFormData] = useState<OwnerProfile>(initialValue);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const updateField = (field: keyof OwnerProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, boolean> = {};
    if (!formData.whatsapp?.trim()) nextErrors.whatsapp = true;

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4 shadow-[var(--shadow-sm)]">
        <h1 className="text-center font-display text-2xl font-bold text-[var(--color-brand-primary)]">
          Owner details
        </h1>
        <p className="mx-auto mt-2 max-w-[320px] text-center text-sm leading-[1.5] text-[var(--color-text-secondary)]">
          Set this once. Every cat profile and QR finder page will use the same contact details.
        </p>

        <div className="mt-5">
          <Input
            label="Display name"
            value={formData.displayName || ''}
            onChange={event => updateField('displayName', event.target.value)}
            placeholder="Your name"
          />
          <Input
            label="WhatsApp number"
            required
            type="tel"
            inputMode="tel"
            value={formData.whatsapp || ''}
            onChange={event => updateField('whatsapp', event.target.value)}
            error={fieldErrors.whatsapp}
            placeholder="01xxxxxxxxx"
            hint="Egyptian numbers auto-format for WhatsApp (+20)."
          />
          <Input
            label="Phone (call)"
            type="tel"
            inputMode="tel"
            value={formData.phone || ''}
            onChange={event => updateField('phone', event.target.value)}
            placeholder="01xxxxxxxxx"
          />
          <Input
            label="Emergency contact name"
            value={formData.emergencyName || ''}
            onChange={event => updateField('emergencyName', event.target.value)}
            placeholder="e.g. Sara (sister)"
          />
          <Input
            label="Emergency contact number"
            type="tel"
            inputMode="tel"
            value={formData.emergencyPhone || ''}
            onChange={event => updateField('emergencyPhone', event.target.value)}
            placeholder="01xxxxxxxxx"
          />
          <Input
            label="Neighborhood"
            value={formData.neighborhood || ''}
            onChange={event => updateField('neighborhood', event.target.value)}
            placeholder="Maadi"
          />
          <Input
            label="Home address"
            value={formData.homeAddress || ''}
            onChange={event => updateField('homeAddress', event.target.value)}
            placeholder="Never shown to finders"
            hint="Hidden from the public finder page."
          />
        </div>

        {error && <p className="mb-3 text-sm font-semibold text-[var(--color-danger)]">{error}</p>}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
