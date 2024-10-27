import { useReducer, useRef } from "react";
import { useRerender } from "../utils/use-rerender";

const reducer = (value: number) => (value + 1) % 1000000;

export function useMap<T, V>(initialState?: [T, V][]): Map<T, V> {
  //  useRef allows you to keep the Map instance (mapRef.current) persist across renders caused by other states. This is important for maintaining the state of the map without disrupting the component lifecycle.
  const mapRef = useRef(new Map<T, V>(initialState));
  const forceRender = useRerender();
  mapRef.current.set = (...keyValuePair) => {
    Map.prototype.set.apply(mapRef, keyValuePair);
    forceRender();
    return mapRef.current;
  };

  mapRef.current.clear = (...keyValuePair) => {
    Map.prototype.clear.apply(mapRef, keyValuePair);
    forceRender();
  };

  mapRef.current.delete = (...keyValuePair) => {
    const updatedMap = Map.prototype.delete.apply(keyValuePair, keyValuePair);
    forceRender();
    return updatedMap;
  };

  return mapRef.current;
}
