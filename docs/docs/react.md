# React

`@vibe-flags/core` ships a dedicated React integration under `@vibe-flags/core/react`.

## Installation

```bash
npm install @vibe-flags/core
```

React 18 or 19 is required as a peer dependency.

## `useFlag()`

`useFlag` is a React hook that reads the current value of a feature flag and re-renders the component whenever the flag changes.

### Signature

```ts
// Subscribe to an already-registered flag by key
useFlag(key: string): FlagValue | undefined

// Register a flag from config and subscribe
useFlag(config: FlagConfig): FlagValue
```

### Boolean flag

```tsx
import { useFlag } from '@vibe-flags/core/react';
import { flagStore } from '@vibe-flags/core';

// Register once (e.g. at app startup, or via <vibe-flag-boolean>)
flagStore.register({ key: 'darkMode', type: 'boolean', default: false });

function App() {
  const darkMode = useFlag('darkMode');

  return (
    <div style={{ background: darkMode ? '#1a1a1a' : '#fff' }}>
      Dark mode is {darkMode ? 'on' : 'off'}
    </div>
  );
}
```

### Register from config

Pass a `FlagConfig` object directly to `useFlag` — the flag will be registered automatically on mount:

```tsx
import { useFlag } from '@vibe-flags/core/react';

function ThemePicker() {
  const theme = useFlag({
    key: 'theme',
    type: 'select',
    options: ['light', 'dark', 'auto'],
    default: 'light',
  });

  return <p>Current theme: {theme}</p>;
}
```

## `VibeFlagsToolbar`

`VibeFlagsToolbar` is a React component that renders the Vibe Flags floating toolbar. It wraps the `<vibe-toolbar>` custom element and handles registration automatically.

Place it once, anywhere in your component tree:

```tsx
import { useFlag, VibeFlagsToolbar } from '@vibe-flags/core/react';

function App() {
  const showBanner = useFlag({ key: 'showBanner', type: 'boolean', default: true });

  return (
    <>
      {showBanner && <div className="banner">Welcome to the beta!</div>}
      <VibeFlagsToolbar />
    </>
  );
}
```

The toolbar automatically discovers all registered flags and provides:
- Toggle switches for boolean flags
- Dropdown selectors for select flags

No props are required.

## TypeScript

All types are exported from `@vibe-flags/core`:

```ts
import type { FlagConfig, FlagValue } from '@vibe-flags/core';
```
