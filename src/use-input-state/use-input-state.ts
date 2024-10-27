import { useState } from "react";

export function getInputChangeHandler<T>(setValue: (value: null | undefined | T | ((current: T) => T)) => void) {
  return (value: null | undefined | React.ChangeEvent<any> | T | ((current: T) => T)) => {
    if (!value) {
      setValue(value as T);
    } else if (typeof value === "function") {
      setValue(value);
    } else if (typeof value === "object" && "nativeEvent" in value) {
      const { currentTarget } = value;

      if (currentTarget.type === "checkbox") {
        setValue((currentTarget as any).checked as any);
      } else {
        setValue(currentTarget.value as any);
      }
    } else {
      setValue(value);
    }
  };
}

export function useInputState<T>(intialValue: T) {
  const [value, setValue] = useState<T>(intialValue);
  return [value, getInputChangeHandler<T>(setValue as any)] as [
    value: T,
    (value: null | undefined | T | React.ChangeEvent<any>) => void,
  ];
}
