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
useFlag(key: string): VibeFlagsValue | undefined

// Register a flag from config and subscribe
useFlag(config: VibeFlagsConfig): VibeFlagsValue
```

### Boolean flag

```tsx
import { useFlag } from '@vibe-flags/core/react';
import { vibeFlagsStore } from '@vibe-flags/core';

// Register once (e.g. at app startup, or via <vibe-flags-boolean>)
vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', default: false });

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

Pass a `VibeFlagsConfig` object directly to `useFlag` — the flag will be registered automatically on mount:

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

`VibeFlagsToolbar` is a React component that renders the Vibe Flags floating toolbar. It wraps the `<vibe-flags-toolbar>` custom element and handles registration automatically.

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

## `VibeFlagsBoolean`

React wrapper for `<vibe-flags-boolean>`. Self-registers the flag and renders children when the flag value matches `value`. If `value` is omitted, children are shown whenever the flag is truthy.

```tsx
import { VibeFlagsBoolean } from '@vibe-flags/core/react';

function App() {
  return (
    <>
      <VibeFlagsBoolean name="darkMode" description="Dark Mode" value="true">
        <style>{`body { background: #1a1a1a; color: #fff; }`}</style>
      </VibeFlagsBoolean>
      <VibeFlagsBoolean name="darkMode" value="false">
        <style>{`body { background: #fff; color: #111; }`}</style>
      </VibeFlagsBoolean>
    </>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Unique flag key |
| `description` | `string` | `""` | Label shown in toolbar |
| `value` | `string` | `""` | Expected value to show children |
| `default` | `boolean` | `false` | Initial value |

## `VibeFlagsSelect` and `VibeFlagsOption`

React wrappers for `<vibe-flags-select>` and `<vibe-flags-option>`. Only the active option's children are rendered.

```tsx
import { VibeFlagsSelect, VibeFlagsOption } from '@vibe-flags/core/react';

function App() {
  return (
    <VibeFlagsSelect name="theme" description="Color theme" default="light">
      <VibeFlagsOption value="light">
        <style>{`:root { --bg: #fff; --text: #111; }`}</style>
      </VibeFlagsOption>
      <VibeFlagsOption value="dark">
        <style>{`:root { --bg: #111; --text: #fff; }`}</style>
      </VibeFlagsOption>
    </VibeFlagsSelect>
  );
}
```

**`VibeFlagsSelect` props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Unique flag key |
| `description` | `string` | `""` | Label shown in toolbar |
| `default` | `string` | first option | Default selection |

**`VibeFlagsOption` props:**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Option identifier — children shown when this is active |

## TypeScript

All types are exported from `@vibe-flags/core`:

```ts
import type { VibeFlagsConfig, VibeFlagsValue } from '@vibe-flags/core';
```
