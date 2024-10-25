export function clamp(value: number, min?: number, max?: number) {
  if (min === undefined && max === undefined) {
    return value;
  }

  if (min !== undefined && max === undefined) {
    return Math.max(min, value);
  }

  if (min === undefined && max !== undefined) {
    return Math.min(max, value);
  }

  return Math.min(max!, Math.max(min!, value));
}
