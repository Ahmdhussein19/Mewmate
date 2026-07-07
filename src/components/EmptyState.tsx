import React from 'react';
import Image from 'next/image';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '/logos/1.svg', title, description }) => {
  const isImageIcon = icon.startsWith('/');

  return (
    <div className="text-center py-10 px-6 text-[var(--color-text-secondary)]">
      <div className="mb-2 flex justify-center">
        {isImageIcon ? (
          <Image
            src={icon}
            alt=""
            aria-hidden="true"
            width={280}
            height={190}
            unoptimized
            style={{ width: 'auto' }}
            className="h-[190px] w-auto bg-transparent"
          />
        ) : (
          <span className="text-[150px] leading-none">{icon}</span>
        )}
      </div>
      <h2 className="font-display font-semibold text-[var(--color-brand-primary)] text-2xl mb-1.5">
        {title}
      </h2>
      <p className="text-sm leading-[1.5] max-w-[290px] mx-auto mb-5">{description}</p>
    </div>
  );
};
