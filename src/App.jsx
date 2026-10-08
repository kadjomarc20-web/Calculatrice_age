import { AgeForm } from "./components/AgeForm";
import { AgeResultView } from "./components/AgeResultView";
import { EmptyResult } from "./components/EmptyResult";
import { useAgeCalculator } from "./hooks/useAgeCalculator";
import { useTheme } from "./contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const { theme, handleThemeSwitch } = useTheme();
  const {
    fields,
    referenceDate,
    result,
    error,
    setField,
    setReferenceDate,
    submit,
    reset,
  } = useAgeCalculator();

  return (
    <main className="mx-auto grid min-h-dvh max-w-6xl gap-12 px-6 py-10 md:grid-cols-[5fr_7fr] md:gap-16 md:px-10 md:py-16">
      <div className="flex flex-col justify-between gap-12">
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em]">
              Calculatrice d'Âge
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[0.9] font-light md:text-7xl">
              Quel âge
              <br />
              avez-vous
              <br />
              <em className="text-stamp">exactement ?</em>
            </h1>
          </div>
          <button
            type="button"
            onClick={handleThemeSwitch}
            aria-label={
              theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"
            }
            title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            className="inline-flex size-10 items-center justify-center 
            hover:cursor-pointer  border-ink transition-all 
            transform duration-300 ease-in-out hover:scale-125 
            focus-visible:outline-2 focus-visible:outline-offset-4
            focus-visible:outline-ink"
          >
            {theme === "dark" ? (
              <Sun aria-hidden="true" size={18} strokeWidth={1.75} />
            ) : (
              <Moon aria-hidden="true" size={18} strokeWidth={1.75} />
            )}
          </button>
        </header>

        <AgeForm
          fields={fields}
          referenceDate={referenceDate}
          error={error}
          onFieldChange={setField}
          onReferenceDateChange={setReferenceDate}
          onSubmit={submit}
          onReset={reset}
        />
      </div>

      <div aria-live="polite" className="md:border-l md:border-ink md:pl-16">
        {result ? <AgeResultView result={result} /> : <EmptyResult />}
      </div>
    </main>
  );
}