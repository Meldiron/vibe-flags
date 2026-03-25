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

### With `<vibe-toolbar>`

Use the web component toolbar alongside React hooks — they share the same `flagStore`, so toggling a flag in the toolbar updates any component subscribed with `useFlag`:

```tsx
import '@vibe-flags/core'; // registers <vibe-toolbar> and friends
import { useFlag } from '@vibe-flags/core/react';

function App() {
  const showBanner = useFlag({ key: 'showBanner', type: 'boolean', default: true });

  return (
    <>
      {showBanner && <div className="banner">Welcome to the beta!</div>}

      {/* @ts-expect-error — custom element */}
      <vibe-toolbar />
    </>
  );
}
```

## TypeScript

All types are exported from `@vibe-flags/core`:

```ts
import type { FlagConfig, FlagValue } from '@vibe-flags/core';
```
