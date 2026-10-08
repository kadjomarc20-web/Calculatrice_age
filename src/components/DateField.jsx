export function DateField({
  id,
  label,
  autoComplete,
  placeholder,
  maxLength,
  value,
  invalid,
  describedBy,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.2em]">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border-0 border-b-2 border-ink bg-transparent pb-1 font-display text-5xl placeholder:text-ink/30 aria-invalid:border-stamp focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      />
    </div>
  );
}