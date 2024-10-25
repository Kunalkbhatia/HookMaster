import { useCallback, useState } from "react";

export function useDisclose(initialState = false, callbackFns?: { onOpen?: () => void; onClose?: () => void }) {
  const [opened, setOpened] = useState(initialState);
  const { onOpen, onClose } = callbackFns || {};

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    opened ? close() : open();
  }, [close, open, opened]);

  return [opened, { open, close, toggle }] as const;
}
