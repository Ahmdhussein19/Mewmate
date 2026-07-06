import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-[var(--color-bg-card)] border border-[var(--color-border-soft)] rounded-[var(--radius-xl)] p-4 shadow-[var(--shadow-sm)] ${onClick ? 'cursor-pointer transition-all active:scale-[0.99]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
