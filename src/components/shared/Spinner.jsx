import { Loader2 } from 'lucide-react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <Loader2 className={`animate-spin text-slate-400 ${sizes[size]} ${className}`} />
  );
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Spinner size="xl" />
    </div>
  );
}
