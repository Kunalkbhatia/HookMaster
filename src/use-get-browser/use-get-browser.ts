import { useState, useEffect } from "react";

export function useGetBrowser(): string | null {
  const [browserName, setBrowserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setBrowserName(navigator.userAgent);
    }
  }, []);

  return browserName;
}
