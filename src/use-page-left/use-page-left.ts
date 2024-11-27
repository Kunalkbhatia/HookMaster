import { useEffect } from "react";

export function usePageLeft(onPageLeft: () => void) {
  useEffect(() => {
    document.documentElement.addEventListener("mouseleave", onPageLeft);
    return () => document.documentElement.removeEventListener("mouseleave", onPageLeft);
  }, []);
}
