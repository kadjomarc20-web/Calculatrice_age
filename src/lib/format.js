export const pluralize = (count, singular, plural = `${singular}s`) =>
  count < 2 ? singular : plural;