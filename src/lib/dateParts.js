export const MS_PER_DAY = 86_400_000;

// month = 0 résout en décembre de l'année précédente.
export const daysInMonth = (year, month) =>
  new Date(Date.UTC(year, month, 0)).getUTCDate();

export const toUtcMs = ({ year, month, day }) => Date.UTC(year, month - 1, day);

export const todayParts = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
};

export const parseIsoDate = (iso) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
};