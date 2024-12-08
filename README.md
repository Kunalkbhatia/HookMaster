## Introduction
Welcome to the official guide for installing and using the `hook-master-react` library. This library offers a collection of reusable, well-tested React hooks to streamline your development process.

## Prerequisites
Ensure you have the following installed on your system before proceeding:

  - Node.js: Version 14 or higher.
  - npm: Version 6 or higher.
  - yarn: Version 1.22 or higher (if using yarn).

## Installation

You can install the hook-master-react package using either `npm` or `yarn`.

### Usin npm
```
npm install hook-master-react
```
### Usin yarn
```
yarn add hook-master-react
```


### Importing hooks
```tsx
import { useToggle } from 'hook-master-react';

function App() {
  const [state, toggle] = useToggle();

  return (
    <div>
      <p>{state ? 'ON' : 'OFF'}</p>
      <button onClick={() => toggle()}>Toggle</button>
    </div>
  );
}

```

## Repository Links

- Source Code: Access the [source code](https://github.com/Kunalkbhatia/HookMaste) and contribute to the project.

- Documentation: View the [documentation](https://github.com/Kunalkbhatia/HookMasterDev) if you want to edit the documentation.

## Feedback and Contributions

We welcome contributions! If you encounter issues or have feature requests, feel free to open an issue in the source code repository.
Although our hooks in the library are well-tested, we are still looking to add more tests to ensure even more robust functionality. If you're interested, feel free to add tests for any of the hooks.

