
# use-dialog

[![npm](https://img.shields.io/npm/v/use-dialog.svg)](https://www.npmjs.com/package/use-dialog) ![Node.js Package](https://github.com/mxmul/use-dialog/workflows/Node.js%20Package/badge.svg) [![bundlephobia](https://badgen.net/bundlephobia/minzip/use-dialog)](https://bundlephobia.com/result?p=use-dialog) ![MIT license](https://badgen.now.sh/badge/license/MIT)

A tiny library for using native `<dialog>` elements in React.

## Installation

```
npm i use-dialog
```

## Example

```jsx
import React, { useState } from "react";
import { Dialog } from "use-dialog";

export default function App() {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return (
    <>
      <Dialog state={[open, setOpen]}>
        <p>Hello, world!</p>
        <button onClick={hide}>Hide</button>
      </Dialog>

      <button onClick={show}>Show</button>
    </>
  );
}
```

[Demo](https://codesandbox.io/s/use-dialog-s9nmf)

## Usage

### `<Dialog>`

| Prop Name | Description |
|-----------|-------------|
| state | A boolean state variable and setter pair, as returned by `useState()`. This represents the open / closed state of the modal. |
| modal | Optional. Should the dialog be a modal? (default: true) |
| onClose | Optional. Fires when the modal is closed. |
| onCancel |  Optional. Fires when the modal is cancelled. |

All unknown props are passed along to the underlying `<dialog>` element.

### `useDialog`

Accepts an object with the same props as above. Returns props to be spread into a native `<dialog>` element.

E.g:

```jsx
const dialogProps = useDialog({ state: [open, setOpen] });
<dialog {...dialogProps}>Sup!</dialog>
```

## Polyfill

Include this polyfill to provide support for browsers without `<dialog>` element.

[dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill)
