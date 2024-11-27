import { useState } from "react";
import { clamp } from "../utils/clamp";

const DEFAULT_OPTIONS = {
  min: -Infinity,
  max: Infinity,
};

export function useCounter(
  intialValue: number = 0,
  options?: Partial<{
    min: number;
    max: number;
  }>,
) {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options };
  const [count, setCount] = useState(clamp(intialValue, min, max));

  const increment = () => setCount((current) => clamp(current + 1, min, max));
  const incrementBy = (value: number) => setCount((current) => clamp(current + value, min, max));
  const decrement = () => setCount((current) => clamp(current - 1, min, max));
  const decrementBy = (value: number) => setCount((current) => clamp(current - value, min, max));
  const set = (value: number) => setCount(clamp(value, min, max));
  const reset = () => setCount(clamp(intialValue, min, max));

  return [count, { increment, incrementBy, decrement, decrementBy, set, reset }] as const;
}
