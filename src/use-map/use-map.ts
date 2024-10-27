import { useReducer, useRef } from "react";
import { useRerender } from "../utils/use-rerender";

const reducer = (value: number) => (value + 1) % 1000000;

export function useMap<T, V>(initialState?: [T, V][]): Map<T, V> {
  //  useRef allows you to keep the Map instance (mapRef.current) persist across renders caused by other states. This is important for maintaining the state of the map without disrupting the component lifecycle.
  const mapRef = useRef(new Map<T, V>(initialState));
  const forceRender = useRerender();

  // Overriding set method of map(mapRef.current)
  mapRef.current.set = (...keyValuePair) => {
    // IMPORTANT: We must use Map.prototype.set.apply() instead of mapRef.current.set()
    // to avoid infinite recursion. If we called mapRef.current.set() directly,
    // it would call this same overridden method again, creating an infinite loop.
    // By using Map.prototype.set.apply(), we bypass the override and call the original
    // Map implementation directly.
    Map.prototype.set.apply(mapRef.current, keyValuePair);
    forceRender();
    return mapRef.current;
  };

  mapRef.current.clear = (...keyValuePair) => {
    Map.prototype.clear.apply(mapRef.current, keyValuePair);
    forceRender();
  };

  mapRef.current.delete = (...keyValuePair) => {
    const updatedMap = Map.prototype.delete.apply(mapRef.current, keyValuePair);
    forceRender();
    return updatedMap;
  };

  return mapRef.current;
}
