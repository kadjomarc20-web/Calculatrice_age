import { motion, useReducedMotion } from "framer-motion";
import { pluralize } from "../lib/format";
import { AnimatedNumber } from "./AnimatedNumber";

export function AgeResultView({ result }) {
  const reduceMotion = useReducedMotion();
  const { years, months, days, totalDays, daysUntilNextBirthday } = result;

  const rows = [
    { value: years, label: pluralize(years, "an") },
    { value: months, label: "mois" },
    { value: days, label: pluralize(days, "jour") },
  ];

  const stampText =
    daysUntilNextBirthday === 0
      ? "Anniversaire : c'est aujourd'hui"
      : `Prochain anniversaire dans ${daysUntilNextBirthday} ${pluralize(daysUntilNextBirthday, "jour")}`;

  return (
    <section aria-labelledby="result-title" className="flex flex-col gap-8">
      <h2 id="result-title" className="font-mono text-xs uppercase tracking-[0.2em]">
        Âge constaté
      </h2>

      <p className="sr-only">
        Vous avez {years} {pluralize(years, "an")}, {months} mois et {days}{" "}
        {pluralize(days, "jour")}. {stampText}. Soit {totalDays} jours vécus.
      </p>

      <div aria-hidden="true">
        {rows.map((row, index) => (
          <div key={row.label} className="relative py-2">
            <motion.span
              className="absolute inset-x-0 top-0 h-px origin-left bg-ink"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            />
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[clamp(5rem,20vw,12rem)] leading-[0.85] font-light tabular-nums">
                <AnimatedNumber value={row.value} delay={index * 0.12} />
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.2em]">
                {row.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <motion.p
        aria-hidden="true"
        className="w-fit -rotate-2 border-2 border-stamp px-4 py-2 font-mono text-sm font-medium uppercase tracking-[0.15em] text-stamp"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.4, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ delay: 0.7, duration: 0.25 }}
      >
        {stampText}
      </motion.p>

      <p aria-hidden="true" className="font-mono text-sm">
        Soit {totalDays.toLocaleString("fr-FR")} jours vécus.
      </p>
    </section>
  );
}