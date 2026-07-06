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
    <header className="sticky top-0 z-[200] bg-[var(--color-bg-page)] relative flex min-h-[calc(128px+env(safe-area-inset-top))] items-center gap-2.5 px-3.5 pb-3 pt-[calc(16px+env(safe-area-inset-top))] border-b border-[var(--color-border-soft)]">
      {showBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-8.5 h-8.5 flex items-center justify-center rounded-full text-[var(--color-brand-primary)] hover:bg-[var(--color-bg-soft)] transition-colors"
        >
          <ChevronLeft size={26} />
        </button>
      )}
      {showLogo && (
        <Image
          src="/logos/1.svg" 
          alt="MewMate" 
          width={220}
          height={60}
          unoptimized
          className="absolute left-1/2 top-1/2 h-24 w-auto -translate-x-1/2 -translate-y-1/2 bg-transparent"
        />
      )}
      {title && !showLogo && (
        <h1 className="font-display font-bold text-xl text-[var(--color-brand-primary)] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h1>
      )}
      <div className="flex-1" />
    </header>
  );
};
