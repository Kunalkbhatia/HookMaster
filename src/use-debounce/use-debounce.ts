import { useCallback, useEffect, useRef, useState } from "react";

export function useDebounce<T = any>(initialValue: T, delay: number) {
  const [value, setValue] = useState(initialValue);
  const timerRef = useRef<number | null>(null);

  useEffect(() => clearTimeout(timerRef.current!), []);

  const debouncedSetValue = useCallback((newValue: React.SetStateAction<T>) => {
    clearTimeout(timerRef.current!);

    timerRef.current = window.setTimeout(() => {
      setValue(newValue);
    }, delay);
  }, []);

  return [value, debouncedSetValue];
}
