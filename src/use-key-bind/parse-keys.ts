export type KeyboardModifiers = {
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  mod: boolean;
  shift: boolean;
  plus: boolean;
};

export type KeyBind = KeyboardModifiers & {
  key?: string;
};

type CheckKeyBindMatch = (event: KeyboardEvent) => boolean;

export function parseKeyBind(keybind: string): KeyBind {
  const keys = keybind
    .toLowerCase()
    .split("+")
    .map((part) => part.trim());

  const modifiers: KeyboardModifiers = {
    alt: keys.includes("alt"),
    ctrl: keys.includes("ctrl"),
    meta: keys.includes("meta"),
    mod: keys.includes("mod"),
    shift: keys.includes("shift"),
    plus: keys.includes("[plus]"),
  };

  const reservedKeys = ["alt", "ctrl", "meta", "shift", "mod"];

  const freeKey = keys.find((key) => !reservedKeys.includes(key));

  return {
    ...modifiers,
    key: freeKey === "[plus]" ? "+" : freeKey,
  };
}

function isExactKeyBind(keybind: KeyBind, event: KeyboardEvent): boolean {
  const { alt, ctrl, meta, mod, shift, key } = keybind;
  const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey } = event;

  if (alt !== altKey) {
    return false;
  }

  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false;
    }
  } else {
    if (ctrl !== ctrlKey) {
      return false;
    }
    if (meta !== metaKey) {
      return false;
    }
  }
  if (shift !== shiftKey) {
    return false;
  }

  if (
    key &&
    (pressedKey.toLowerCase() === key.toLowerCase() ||
      event.code.replace("Key", "").toLowerCase() === key.toLowerCase())
  ) {
    return true;
  }

  return false;
}

export function getKeyBindMatcher(keybind: string): CheckKeyBindMatch {
  return (event) => isExactKeyBind(parseKeyBind(keybind), event);
}

export interface KeyBindItemOptions {
  preventDefault?: boolean;
}

type KeyBindItem = [string, (event: any) => void, KeyBindItemOptions?];

export function getKeyBindHandler(keybinds: KeyBindItem[]) {
  return (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
    const _event = "nativeEvent" in event ? event.nativeEvent : event;
    keybinds.forEach(([keybind, handler, options = { preventDefault: true }]) => {
      if (getKeyBindMatcher(keybind)(_event)) {
        if (options.preventDefault) {
          event.preventDefault();
        }

        handler(_event);
      }
    });
  };
}
