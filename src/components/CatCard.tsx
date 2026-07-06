import React from 'react';
import { Cat } from '@/types/cat';
import { Card } from './ui/Card';
import { ChevronRight } from 'lucide-react';

interface CatCardProps {
  cat: Cat;
  onClick: () => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onClick }) => {
  const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#F2E3C6"/><text x="60" y="74" font-size="52" text-anchor="middle">🐱</text></svg>'
  );
  const photo = cat.photos?.[0] || placeholder;

  return (
    <Card
      onClick={onClick}
      className={`cat-card flex gap-3.5 items-center mb-3.5 ${cat.isLost ? 'border-[var(--color-danger)] shadow-[0_0_0_1px_var(--color-danger),var(--shadow-sm)]' : ''}`}
    >
      <img
        src={photo}
        alt={cat.name}
        className="w-[66px] h-[66px] rounded-full object-cover bg-[var(--color-bg-soft)] flex-shrink-0 border-2 border-[var(--color-border-soft)]"
      />
      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-xl text-[var(--color-brand-primary)] leading-[1.1]">
          {cat.name || 'Unnamed'}
        </div>
        <div className="text-sm text-[var(--color-text-secondary)] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
          {[cat.breed, cat.color, cat.city].filter(Boolean).join(' · ') || 'Tap to add details'}
        </div>
        <div className="mt-1.5">
          {cat.isLost ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--color-danger-soft)] text-[#8F3E20]">
              ● Lost mode
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--color-success-soft)] text-[var(--color-brand-primary)]">
              ● Safe
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="text-[var(--color-text-muted)] text-xl" />
    </Card>
  );
};
