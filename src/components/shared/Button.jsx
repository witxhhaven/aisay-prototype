import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.98]',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.98]',
    ghost: 'text-slate-600 hover:bg-slate-100 active:scale-[0.98]',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
