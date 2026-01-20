export function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 rounded-lg border transition-colors
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 hover:border-slate-400'}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function TextArea({
  label,
  error,
  className = '',
  maxLength,
  value,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`
          w-full px-3 py-2 rounded-lg border transition-colors min-h-[200px] resize-y
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 hover:border-slate-400'}
        `}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      <div className="flex justify-between mt-1">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {maxLength && (
          <p className="text-sm text-slate-400 ml-auto">
            {value?.length || 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
