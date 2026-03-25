# Vibe Flags 4

**Feature flags for the browser — zero config, no backend, no auth.**

Drop one script tag in. Toggle flags from a floating toolbar. Flags persist across page reloads. Works anywhere HTML runs.

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flag-boolean name="new-hero" description="New hero section" value="true">
  <section>✨ New hero</section>
</vibe-flag-boolean>

<vibe-flag-boolean name="new-hero" value="false">
  <section>Old hero</section>
</vibe-flag-boolean>

<vibe-toolbar></vibe-toolbar>
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
import { VibeFlagBoolean, VibeFlagSelect, VibeToolbar } from '@vibe-flags/core';
```

---

## Components

### `<vibe-flag-boolean>`

On/off feature flag. Renders its children only when the flag matches `value`.

```html
<!-- Show content when flag is ON -->
<vibe-flag-boolean name="dark-mode" description="Dark Mode" value="true">
  <style>body { background: #111; color: #fff; }</style>
</vibe-flag-boolean>

<!-- Show content when flag is OFF -->
<vibe-flag-boolean name="dark-mode" value="false">
  <style>body { background: #fff; color: #111; }</style>
</vibe-flag-boolean>
```

**Attributes**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | — | Unique flag key |
| `description` | `string` | — | Label shown in toolbar |
| `value` | `"true"` \| `"false"` | — | Which state should render children |
| `default` | `boolean` | `false` | Initial value before user sets anything |

---

### `<vibe-flag-select>`

Multi-option flag. Only the matching `<vibe-flag-option>` renders its children.

```html
<vibe-flag-select name="theme" description="Color theme" default="dark">
  <vibe-flag-option value="light">
    <style>:root { --bg: #fff; --text: #111; }</style>
  </vibe-flag-option>
  <vibe-flag-option value="dark">
    <style>:root { --bg: #111; --text: #fff; }</style>
  </vibe-flag-option>
  <vibe-flag-option value="auto">
    <style>:root { color-scheme: light dark; }</style>
  </vibe-flag-option>
</vibe-flag-select>
```

**Attributes**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | — | Unique flag key |
| `description` | `string` | — | Label shown in toolbar |
| `default` | `string` | first option | Default selection |

---

### `<vibe-flag-option>`

A single branch inside `<vibe-flag-select>`. Children render only when this option is active.

| Attribute | Type | Description |
|-----------|------|-------------|
| `value` | `string` | Option identifier |

---

### `<vibe-toolbar>`

Floating button + slide-out sidebar. Automatically lists all registered flags with live controls.

```html
<!-- Place once, anywhere in the page -->
<vibe-toolbar></vibe-toolbar>
```

No attributes required. The toolbar discovers all flags on the page automatically.

---

## JavaScript API

For programmatic access, use `flagStore`:

```ts
import { flagStore } from '@vibe-flags/core';

// Register a flag manually
flagStore.register({ key: 'beta', type: 'boolean', default: false });
flagStore.register({ key: 'layout', type: 'select', options: ['grid', 'list'] });

// Read a value
flagStore.get('beta');    // false
flagStore.get('layout');  // 'grid'

// Set a value (validates, persists, fires change event)
flagStore.set('beta', true);
flagStore.set('layout', 'list');

// Get everything
flagStore.getAll(); // { beta: true, layout: 'list' }

// Reset all to defaults
flagStore.reset();
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
<vibe-flag-select name="hero" description="Hero variant">
  <vibe-flag-option value="a">
    <h1>Control: Simple headline</h1>
  </vibe-flag-option>
  <vibe-flag-option value="b">
    <h1>Variant: Bold, punchy headline with emoji 🚀</h1>
  </vibe-flag-option>
</vibe-flag-select>

<vibe-toolbar></vibe-toolbar>
```

### Progressive rollout with defaults

```html
<!-- Default off — enable in toolbar to preview -->
<vibe-flag-boolean name="checkout-v2" description="New checkout flow" value="true">
  <section id="checkout-new">...</section>
</vibe-flag-boolean>

<vibe-flag-boolean name="checkout-v2" value="false">
  <section id="checkout-old">...</section>
</vibe-flag-boolean>

<vibe-toolbar></vibe-toolbar>
```

### Use with AI agents

Vibe Flags is designed to be easy for LLMs to use. The HTML-first API is intuitive without any documentation:

```html
<!-- An LLM can generate this correctly on first try -->
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flag-boolean name="feature-x" description="Feature X" value="true">
  <!-- new content -->
</vibe-flag-boolean>

<vibe-flag-boolean name="feature-x" value="false">
  <!-- old content -->
</vibe-flag-boolean>

<vibe-toolbar></vibe-toolbar>
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
