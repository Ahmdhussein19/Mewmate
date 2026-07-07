import React from 'react';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack, showLogo = true }) => {
  return (
    <header className="sticky top-0 z-[200] relative flex h-[calc(64px+env(safe-area-inset-top))] shrink-0 items-center gap-3 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-page)] px-4 pb-2.5 pt-[calc(10px+env(safe-area-inset-top))]">
      {showBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-bg-soft)]"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {showLogo && (
        <Image
          src="/logos/1.svg" 
          alt="MewMate" 
          width={220}
          height={60}
          unoptimized
          style={{ width: 'auto' }}
          className="absolute left-1/2 top-[calc(50%+env(safe-area-inset-top)/2)] h-12 w-auto -translate-x-1/2 -translate-y-1/2 bg-transparent"
        />
      )}
      {title && !showLogo && (
        <h1 className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-display text-xl font-bold tracking-normal text-[var(--color-brand-primary)]">
          {title}
        </h1>
      )}
      <div className="flex-1" />
    </header>
  );
};
