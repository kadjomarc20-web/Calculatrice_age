import { MS_PER_DAY, daysInMonth, toUtcMs } from "./dateParts";

const clampedDate = (year, month, day) =>
  Date.UTC(year, month - 1, Math.min(day, daysInMonth(year, month)));

const anchorAfterMonths = (birth, months) => {
  const index = birth.year * 12 + (birth.month - 1) + months;
  return clampedDate(Math.floor(index / 12), (index % 12) + 1, birth.day);
};

const daysUntilNextBirthday = (birth, reference) => {
  const referenceMs = toUtcMs(reference);
  let next = clampedDate(reference.year, birth.month, birth.day);
  if (next < referenceMs) {
    next = clampedDate(reference.year + 1, birth.month, birth.day);
  }
  return Math.round((next - referenceMs) / MS_PER_DAY);
};

/**
 * Suppose des dates valides et birth <= reference (voir validateBirthDate).
 * @param {{year: number, month: number, day: number}} birth
 * @param {{year: number, month: number, day: number}} reference
 * @returns {{years: number, months: number, days: number, totalDays: number, daysUntilNextBirthday: number}}
 */
export function calculateAge(birth, reference) {
  const referenceMs = toUtcMs(reference);

  let wholeMonths =
    (reference.year - birth.year) * 12 + (reference.month - birth.month);
  if (anchorAfterMonths(birth, wholeMonths) > referenceMs) wholeMonths -= 1;

  const anchorMs = anchorAfterMonths(birth, wholeMonths);

  return {
    years: Math.floor(wholeMonths / 12),
    months: wholeMonths % 12,
    days: Math.round((referenceMs - anchorMs) / MS_PER_DAY),
    totalDays: Math.round((referenceMs - toUtcMs(birth)) / MS_PER_DAY),
    daysUntilNextBirthday: daysUntilNextBirthday(birth, reference),
  };
}