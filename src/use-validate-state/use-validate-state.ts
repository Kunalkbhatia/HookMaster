import { useState } from "react";

export function useValidateState<T>(
  initialValue: T,
  validation: (value: T) => boolean,
  initialValidationState?: boolean,
) {
  const [value, setValue] = useState<T>(initialValue);
  const [valid, setValid] = useState<boolean>(
    typeof initialValidationState === "boolean" ? initialValidationState : validation(initialValue),
  );

  const onChange = (value: T) => {
    if (validation(value)) {
      setValid(true);
    } else {
      setValid(false);
    }

    setValue(value);
  };

  return [{ value, valid }, onChange];
}
