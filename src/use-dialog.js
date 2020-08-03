import React, {useRef, useEffect} from 'react';

export function useDialog({
  state: [open, setOpen],
  modal = true,
  onCancel = null,
  onClose = null
}) {
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

    const handleClose = (evt) => {
      setOpen(false);
      if (onClose) {
        onClose(evt);
      }
    };

    const handleCancel = (evt) => {
      if (onCancel) {
        onCancel(evt);
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleClose);
    };
  }, [ref, onCancel, onClose, setOpen]);

  return {
    dialogProps: {ref}
  };
}

export const Dialog = ({state, modal, onClose, onCancel, ...otherProps}) => {
  const {dialogProps} = useDialog({
    state,
    modal,
    onClose,
    onCancel
  });

  return <dialog {...dialogProps} {...otherProps} />;
};
