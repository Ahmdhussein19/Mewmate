import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({ label, error = false, hint, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`w-full h-12 px-4 rounded-[var(--radius-lg)] border bg-[var(--color-bg-card)] text-[var(--color-text-primary)] text-base transition-all duration-180 ease-standard focus:outline-none ${
          error
            ? 'border-[var(--color-danger)] focus:shadow-[0_0_0_4px_rgba(224,122,63,0.14)]'
            : 'border-[var(--color-border-strong)] focus:border-[var(--color-brand-primary)] focus:shadow-[0_0_0_4px_rgba(31,77,52,0.12)]'
        } ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-[1.4]">{hint}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  hint?: string | React.ReactNode;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error = false, hint, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={`w-full min-h-[78px] px-4 py-3 rounded-[var(--radius-lg)] border bg-[var(--color-bg-card)] text-[var(--color-text-primary)] text-base leading-[1.5] resize-y transition-all duration-180 ease-standard focus:outline-none ${
          error
            ? 'border-[var(--color-danger)] focus:shadow-[0_0_0_4px_rgba(224,122,63,0.14)]'
            : 'border-[var(--color-border-strong)] focus:border-[var(--color-brand-primary)] focus:shadow-[0_0_0_4px_rgba(31,77,52,0.12)]'
        } ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-[1.4]">{hint}</p>}
    </div>
  );
};
