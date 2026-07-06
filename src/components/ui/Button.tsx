import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  asChild = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-180 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
  
  const variantStyles = {
    primary: 'bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-warm-sm)] hover:bg-[var(--color-brand-primary-hover)]',
    secondary: 'border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] text-[var(--color-brand-primary)] shadow-sm hover:bg-[var(--color-bg-soft)]',
    gold: 'bg-[var(--color-brand-accent)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-hover)]',
    danger: 'bg-[var(--color-danger)] text-[var(--color-text-inverse)] hover:bg-[#C9632D]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)]',
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 py-2 text-sm',
    lg: 'h-10 px-5 text-sm',
  };

  const buttonClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(buttonClassName, children.props.className),
    });
  }

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
};
