import { useEffect } from "react";
import { getKeyBindHandler, getKeyBindMatcher, KeyBindItemOptions } from "./parse-keys";

export type { KeyBindItemOptions };
export { getKeyBindHandler };

export type KeyBindItem = [string, (event: KeyboardEvent) => void, KeyBindItemOptions?];

function shouldFireEvent(event: KeyboardEvent, tagsToIgnore: string[], triggerOnContentEditable = false) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
  }

  return true;
}

export function useKeyBind(
  keybinds: KeyBindItem[],
  tagsToIgnore: string[] = ["INPUT", "TEXTAREA", "SELECT"],
  triggerOnContentEditable = false,
) {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      keybinds.forEach(([keybind, handler, options = { preventDefault: true }]) => {
        if (getKeyBindMatcher(keybind)(event) && shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)) {
          if (options.preventDefault) {
            event.preventDefault();
          }

          handler(event);
        }
      });
    };

    document.documentElement.addEventListener("keydown", keydownListener);
    return () => document.documentElement.removeEventListener("keydown", keydownListener);
  }, [keybinds]);
}
