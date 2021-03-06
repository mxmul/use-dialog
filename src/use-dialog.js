import React, {useRef, useEffect} from 'react';

export function useDialog({state: [open, setOpen], modal = true}) {
  const ref = useRef(null);

  /**
   * Sync the native <dialog> element with the open / closed state.
   */
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const dialog = ref.current;
    if (open && !dialog.open) {
      if (modal) {
        dialog.showModal();
      } else {
        dialog.show();
      }
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, ref]);

  /**
   * Native <dialog> may be closed when the user hits ESC, or submits a
   * form with method="dialog". Update the state to be closed when this
   * happens.
   */
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const dialog = ref.current;

    const hide = () => {
      setOpen(false);
    };

    dialog.addEventListener('close', hide);
    return () => {
      dialog.removeEventListener('close', hide);
    };
  }, [ref, setOpen]);

  return {
    dialogProps: {ref}
  };
}

export const Dialog = ({state, modal, ...otherProps}) => {
  const {dialogProps} = useDialog({
    state,
    modal
  });

  return <dialog {...dialogProps} {...otherProps} />;
};
