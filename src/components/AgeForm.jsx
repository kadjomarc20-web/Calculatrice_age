import { MIN_YEAR } from "../lib/validateBirthDate";
import { DateField } from "./DateField";

const ERROR_MESSAGES = {
  empty: "Renseignez le jour, le mois et l'année.",
  invalid: "Cette date n'existe pas au calendrier.",
  future: "Cette date est dans le futur.",
  tooOld: `L'année doit être ${MIN_YEAR} ou plus récente.`,
};

export function AgeForm({
  fields,
  referenceDate,
  error,
  onFieldChange,
  onReferenceDateChange,
  onSubmit,
  onReset,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };
  const errorId = error ? "birth-error" : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 font-mono text-xs uppercase tracking-[0.2em]">
          Date de naissance
        </legend>
        <div className="grid grid-cols-[1fr_1fr_1.8fr] gap-6">
          <DateField
            id="birth-day"
            label="Jour"
            autoComplete="bday-day"
            placeholder="15"
            maxLength={2}
            value={fields.day}
            invalid={error !== null}
            describedBy={errorId}
            onChange={(value) => onFieldChange("day", value)}
          />
          <DateField
            id="birth-month"
            label="Mois"
            autoComplete="bday-month"
            placeholder="05"
            maxLength={2}
            value={fields.month}
            invalid={error !== null}
            describedBy={errorId}
            onChange={(value) => onFieldChange("month", value)}
          />
          <DateField
            id="birth-year"
            label="Année"
            autoComplete="bday-year"
            placeholder="1998"
            maxLength={4}
            value={fields.year}
            invalid={error !== null}
            describedBy={errorId}
            onChange={(value) => onFieldChange("year", value)}
          />
        </div>
        {error && (
          <p id="birth-error" role="alert" className="font-mono text-sm text-stamp">
            <span className="font-medium">Erreur —</span> {ERROR_MESSAGES[error]}
          </p>
        )}
      </fieldset>

      <details className="font-mono text-sm">
        <summary className="cursor-pointer underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
          Calculer à une autre date
        </summary>
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="reference-date" className="text-xs uppercase tracking-[0.2em]">
            Date de référence
          </label>
          <input
            id="reference-date"
            type="date"
            value={referenceDate}
            onChange={(event) => onReferenceDateChange(event.target.value)}
            className="w-fit border-b-2 border-ink bg-transparent py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          />
        </div>
      </details>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-ink px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:bg-stamp focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Établir l'âge
        </button>
        <button
          type="button"
          onClick={onReset}
          className="border-2 border-ink px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Effacer
        </button>
      </div>
    </form>
  );
}