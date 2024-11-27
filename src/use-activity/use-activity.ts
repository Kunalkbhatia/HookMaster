import { useEffect, useRef, useState } from "react";

const DEFAULT_EVENTS: (keyof DocumentEventMap)[] = ["keypress", "mousemove", "touchmove", "click", "scroll"];
const DEFAULT_OPTIONS = {
  events: DEFAULT_EVENTS,
  initialState: true,
};

export function useActivity(
  timeout: number,
  options?: Partial<{ events: (keyof DocumentEventMap)[]; initialState: boolean }>,
) {
  const { events, initialState } = { ...DEFAULT_OPTIONS, ...options };
  const [activity, setActivity] = useState<boolean>(initialState);
  const timer = useRef<number>();

  useEffect(() => {
    const handleEvents = () => {
      setActivity(false);

      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        setActivity(true);
      }, timeout);
    };

    events.forEach((event) => document.addEventListener(event, handleEvents));

    // Start the timer immediately instead of waiting for the first event to happen
    timer.current = window.setTimeout(() => {
      setActivity(true);
    }, timeout);

    return () => {
      events.forEach((event) => document.removeEventListener(event, handleEvents));
    };
  }, [timeout]);

  return activity;
}
