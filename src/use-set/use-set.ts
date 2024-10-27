import { useRef } from "react";
import { useRerender } from "../utils/use-rerender";

export function useSet<T>(values?: T[]): Set<T> {
  const setRef = useRef(new Set(values));
  const forceRender = useRerender();

  setRef.current.add = (...args) => {
    const res = Set.prototype.add.apply(setRef.current, args);
    forceRender();

    return res;
  };

  setRef.current.clear = (...args) => {
    Set.prototype.clear.apply(setRef.current, args);
    forceRender();
  };

  setRef.current.delete = (...args) => {
    const res = Set.prototype.delete.apply(setRef.current, args);
    forceRender();

    return res;
  };

  return setRef.current;
}
