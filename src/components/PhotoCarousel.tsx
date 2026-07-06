'use client';

import { useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

type PhotoCarouselProps = {
  photos: string[];
  alt: string;
};

export function PhotoCarousel({ photos, alt }: PhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasPhotos = photos.length > 0;

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const nextIndex = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), photos.length - 1));
  };

  const scrollToPhoto = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: 'smooth',
    });
  };

  if (!hasPhotos) {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-soft)] p-6 text-center shadow-[var(--shadow-md)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-card)] text-[var(--color-text-muted)] shadow-[var(--shadow-sm)]">
          <ImageIcon size={24} />
        </div>
        <div className="mt-3 font-display text-lg font-semibold text-[var(--color-brand-primary)]">
          No photos yet
        </div>
        <p className="mt-1 max-w-[220px] text-sm leading-[1.45] text-[var(--color-text-secondary)]">
          Contact the owner using the details below.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)] shadow-[var(--shadow-md)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${alt} photos`}
      >
        {photos.map((photo, index) => (
          <div key={`${photo}-${index}`} className="relative aspect-square w-full shrink-0 snap-center">
            <img
              src={photo}
              alt={`${alt} photo ${index + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <div className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">
            {activeIndex + 1}/{photos.length}
          </div>
          <div className="mt-3 flex justify-center gap-1.5">
            {photos.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show photo ${index + 1}`}
                onClick={() => scrollToPhoto(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index
                    ? 'w-5 bg-[var(--color-brand-primary)]'
                    : 'w-1.5 bg-[var(--color-border-strong)]'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
