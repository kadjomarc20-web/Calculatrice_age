import { useCallback, useState } from "react";
import { calculateAge } from "../lib/calculateAge";
import { parseIsoDate, todayParts } from "../lib/dateParts";
import { validateBirthDate } from "../lib/validateBirthDate";

const EMPTY_FIELDS = { day: "", month: "", year: "" };

export function useAgeCalculator() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [referenceDate, setReferenceDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const setField = useCallback((name, value) => {
    setFields((previous) => ({ ...previous, [name]: value.replace(/\D/g, "") }));
  }, []);

  const submit = useCallback(() => {
    const reference = parseIsoDate(referenceDate) ?? todayParts();
    const validation = validateBirthDate(fields, reference);

    if (!validation.ok) {
      setResult(null);
      setError(validation.error);
      return;
    }
    setError(null);
    setResult(calculateAge(validation.value, reference));
  }, [fields, referenceDate]);

  const reset = useCallback(() => {
    setFields(EMPTY_FIELDS);
    setReferenceDate("");
    setResult(null);
    setError(null);
  }, []);

  return { fields, referenceDate, result, error, setField, setReferenceDate, submit, reset };
}