# Vibe Flags

**Feature flags for the browser — zero config, no backend, no auth.**

Drop one script tag in. Toggle flags from a floating toolbar. Flags persist across page reloads. Works anywhere HTML runs.

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flags-boolean name="new-hero" description="New hero section" value="true">
  <section>✨ New hero</section>
</vibe-flags-boolean>

<vibe-flags-boolean name="new-hero" value="false">
  <section>Old hero</section>
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

A flag button appears in the bottom-right corner. Click it to open the sidebar and toggle your flags. That's it.

---

## Why Vibe Flags?

Most feature flag tools need a dashboard, an API key, and a network request. Vibe Flags doesn't.

It's designed for how AI agents and vibe coders ship — fast iteration, no ceremony. Wrap content in a tag, toggle it from the browser, move on.

- **Zero config** — one script tag, no setup
- **No backend** — runs entirely in the browser, flags stored in `localStorage`
- **Toolbar included** — floating UI to toggle any flag at runtime
- **Persistent** — flag state survives page reloads and browser restarts
- **AI-native** — HTML-first API that LLMs write correctly on first try
- **Tiny** — no runtime dependencies beyond Lit

---

## Installation

### CDN (recommended for quick start)

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>
```

### npm

```bash
npm install @vibe-flags/core
```

```ts
import '@vibe-flags/core';
// or import specific components:
import { VibeFlagsBoolean, VibeFlagsSelect, VibeFlagsToolbar } from '@vibe-flags/core';
```

---

## Components

### `<vibe-flags-boolean>`

On/off feature flag. Renders its children only when the flag matches `value`.

```html
<!-- Show content when flag is ON -->
<vibe-flags-boolean name="dark-mode" description="Dark Mode" value="true">
  <style>body { background: #111; color: #fff; }</style>
</vibe-flags-boolean>

<!-- Show content when flag is OFF -->
<vibe-flags-boolean name="dark-mode" value="false">
  <style>body { background: #fff; color: #111; }</style>
</vibe-flags-boolean>
```

**Attributes**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | — | Unique flag key |
| `description` | `string` | — | Label shown in toolbar |
| `value` | `"true"` \| `"false"` | — | Which state should render children |
| `default` | `boolean` | `false` | Initial value before user sets anything |

---

### `<vibe-flags-select>`

Multi-option flag. Only the matching `<vibe-flags-option>` renders its children.

```html
<vibe-flags-select name="theme" description="Color theme" default="dark">
  <vibe-flags-option value="light">
    <style>:root { --bg: #fff; --text: #111; }</style>
  </vibe-flags-option>
  <vibe-flags-option value="dark">
    <style>:root { --bg: #111; --text: #fff; }</style>
  </vibe-flags-option>
  <vibe-flags-option value="auto">
    <style>:root { color-scheme: light dark; }</style>
  </vibe-flags-option>
</vibe-flags-select>
```

**Attributes**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | — | Unique flag key |
| `description` | `string` | — | Label shown in toolbar |
| `default` | `string` | first option | Default selection |

---

### `<vibe-flags-option>`

A single branch inside `<vibe-flags-select>`. Children render only when this option is active.

| Attribute | Type | Description |
|-----------|------|-------------|
| `value` | `string` | Option identifier |

---

### `<vibe-flags-toolbar>`

Floating button + slide-out sidebar. Automatically lists all registered flags with live controls.

```html
<!-- Place once, anywhere in the page -->
<vibe-flags-toolbar></vibe-flags-toolbar>
```

No attributes required. The toolbar discovers all flags on the page automatically.

---

## JavaScript API

For programmatic access, use `vibeFlagsStore`:

```ts
import { vibeFlagsStore } from '@vibe-flags/core';

// Register a flag manually
vibeFlagsStore.register({ key: 'beta', type: 'boolean', default: false });
vibeFlagsStore.register({ key: 'layout', type: 'select', options: ['grid', 'list'] });

// Read a value
vibeFlagsStore.get('beta');    // false
vibeFlagsStore.get('layout');  // 'grid'

// Set a value (validates, persists, fires change event)
vibeFlagsStore.set('beta', true);
vibeFlagsStore.set('layout', 'list');

// Get everything
vibeFlagsStore.getAll(); // { beta: true, layout: 'list' }

// Reset all to defaults
vibeFlagsStore.reset();
```

### Listening for changes

```ts
window.addEventListener('vibe-flags-changed', (e) => {
  const { key, state } = (e as CustomEvent).detail;
  console.log(`Flag changed: ${key}`, state);
});
```

---

## Examples

### A/B test two designs

```html
<vibe-flags-select name="hero" description="Hero variant">
  <vibe-flags-option value="a">
    <h1>Control: Simple headline</h1>
  </vibe-flags-option>
  <vibe-flags-option value="b">
    <h1>Variant: Bold, punchy headline with emoji 🚀</h1>
  </vibe-flags-option>
</vibe-flags-select>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

### Progressive rollout with defaults

```html
<!-- Default off — enable in toolbar to preview -->
<vibe-flags-boolean name="checkout-v2" description="New checkout flow" value="true">
  <section id="checkout-new">...</section>
</vibe-flags-boolean>

<vibe-flags-boolean name="checkout-v2" value="false">
  <section id="checkout-old">...</section>
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

### Use with AI agents

Vibe Flags is designed to be easy for LLMs to use. The HTML-first API is intuitive without any documentation:

```html
<!-- An LLM can generate this correctly on first try -->
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flags-boolean name="feature-x" description="Feature X" value="true">
  <!-- new content -->
</vibe-flags-boolean>

<vibe-flags-boolean name="feature-x" value="false">
  <!-- old content -->
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

---

## React

`@vibe-flags/core` includes a React integration under the `@vibe-flags/core/react` sub-path.

### `useVibeFlags()`

Subscribe to a feature flag value. Re-renders automatically when the flag changes.

```tsx
import { useVibeFlags } from '@vibe-flags/core/react';

function App() {
  const darkMode = useVibeFlags({ key: 'darkMode', type: 'boolean', default: false });
  return <div style={{ background: darkMode ? '#1a1a1a' : '#fff' }}>Hello</div>;
}
```

Pass a `VibeFlagsConfig` to auto-register the flag on mount, or pass a `key` string to subscribe to an already-registered flag.

### `VibeFlagsToolbar`

A React component that renders the floating toolbar. No props required.

```tsx
import { VibeFlagsToolbar } from '@vibe-flags/core/react';

function App() {
  return <VibeFlagsToolbar />;
}
```

### `VibeFlagsBoolean`

React wrapper for `<vibe-flags-boolean>`. Renders children when the flag value matches `value`.

```tsx
import { VibeFlagsBoolean } from '@vibe-flags/core/react';

<VibeFlagsBoolean name="darkMode" description="Dark Mode" value="true">
  <style>{`body { background: #1a1a1a; color: #fff; }`}</style>
</VibeFlagsBoolean>
```

### `VibeFlagsSelect` and `VibeFlagsOption`

React wrappers for the multi-option flag. Only the active option renders its children.

```tsx
import { VibeFlagsSelect, VibeFlagsOption, VibeFlagsToolbar } from '@vibe-flags/core/react';

function App() {
  return (
    <>
      <VibeFlagsSelect name="theme" description="Color theme" default="light">
        <VibeFlagsOption value="light">
          <style>{`:root { --bg: #fff; --text: #111; }`}</style>
        </VibeFlagsOption>
        <VibeFlagsOption value="dark">
          <style>{`:root { --bg: #111; --text: #fff; }`}</style>
        </VibeFlagsOption>
      </VibeFlagsSelect>
      <VibeFlagsToolbar />
    </>
  );
}
```

---

## How persistence works

Flag values are stored in `localStorage` under the key `vibe-flags:<name>`. Changes sync across browser tabs via the `storage` event. There is no server, no account, and no network request.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Code of Conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License

MIT
