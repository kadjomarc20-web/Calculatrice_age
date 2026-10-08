export function EmptyResult() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em]">Âge constaté</p>
      <div>
        {["ans", "mois", "jours"].map((label) => (
          <div key={label} className="flex items-baseline justify-between border-t border-ink/30 py-2">
            <span className="font-display text-[clamp(5rem,20vw,12rem)] leading-[0.85] font-light text-ink/20">
              —
            </span>
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-ink/50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}