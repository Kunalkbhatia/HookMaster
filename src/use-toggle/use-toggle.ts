import { useState } from "react";

export function useToggle(initialState: boolean = false) {
  const [state, setState] = useState(initialState);

  const toggle = (value?: boolean) => {
    if (typeof value === "boolean") {
      setState(value);
    } else {
      setState((current) => !current);
    }
  };

  return [state, toggle] as [boolean, (value?: boolean) => void];
}
