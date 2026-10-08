import { daysInMonth, toUtcMs } from "./dateParts";

export const MIN_YEAR = 1900;

const fail = (error) => ({ ok: false, error });

/**
 * Erreurs possibles : "empty" | "invalid" | "future" | "tooOld"
 * @param {{day: string, month: string, year: string}} fields
 * @param {{year: number, month: number, day: number}} reference
 */
export function validateBirthDate(fields, reference) {
  const { day, month, year } = fields;
  if (!day || !month || !year) return fail("empty");
  if (![day, month, year].every((part) => /^\d+$/.test(part))) return fail("invalid");

  const parts = {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };

  if (parts.month < 1 || parts.month > 12) return fail("invalid");
  if (parts.year < MIN_YEAR) return fail("tooOld");
  if (parts.day < 1 || parts.day > daysInMonth(parts.year, parts.month)) {
    return fail("invalid");
  }
  if (toUtcMs(parts) > toUtcMs(reference)) return fail("future");

  return { ok: true, value: parts };
}