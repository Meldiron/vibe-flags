---
name: feature-flags-creator
description: Add feature flags to any HTML page using Vibe Flags — zero config, no backend, no auth. Use this skill whenever the user wants to add a feature flag, A/B test, toggle, or experiment to their website or app. Trigger on requests like "add a feature flag", "make this togglable", "A/B test these two designs", "hide this feature behind a flag", "let me toggle this in the browser", or any time the user wants to conditionally show content without a backend.
---

# Vibe Flags — Feature Flags Creator

Add browser-native feature flags to any HTML page. Zero config. No backend. No auth. One script tag.

## Quick Start

```html
<!-- 1. Load Vibe Flags -->
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<!-- 2. Wrap content in flag components -->
<vibe-flag-boolean name="new-hero" description="New hero section" value="true">
  <section>✨ New hero</section>
</vibe-flag-boolean>

<vibe-flag-boolean name="new-hero" value="false">
  <section>Old hero</section>
</vibe-flag-boolean>

<!-- 3. Add the toolbar (once, anywhere) -->
<vibe-toolbar></vibe-toolbar>
```

A flag toggle appears bottom-right. Click to open the sidebar and flip flags live. Flags persist across reloads via `localStorage`.

---

## Components

### `<vibe-flag-boolean>` — On/Off Flag

Show or hide content based on a boolean flag.

```html
<!-- Show when ON -->
<vibe-flag-boolean name="dark-mode" description="Dark Mode" value="true">
  <style>body { background: #111; color: #fff; }</style>
</vibe-flag-boolean>

<!-- Show when OFF -->
<vibe-flag-boolean name="dark-mode" value="false">
  <style>body { background: #fff; color: #111; }</style>
</vibe-flag-boolean>
```

| Attribute     | Type                  | Default | Description                               |
|---------------|-----------------------|---------|-------------------------------------------|
| `name`        | `string`              | —       | Unique flag key                           |
| `description` | `string`              | —       | Label shown in toolbar (set on one pair)  |
| `value`       | `"true"` \| `"false"` | —       | Which state renders these children        |
| `default`     | `boolean`             | `false` | Initial value before user changes it      |

**Pattern:** Always create two `<vibe-flag-boolean>` elements with the same `name` — one for `value="true"`, one for `value="false"`. Only set `description` on one of them.

---

### `<vibe-flag-select>` — Multi-Option Flag

Choose between more than two variants.

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

| Attribute     | Type     | Default      | Description                    |
|---------------|----------|--------------|--------------------------------|
| `name`        | `string` | —            | Unique flag key                |
| `description` | `string` | —            | Label shown in toolbar         |
| `default`     | `string` | first option | Default selected option        |

Each `<vibe-flag-option value="...">` renders its children only when that option is active.

---

### `<vibe-toolbar>` — Floating Controls

Drop once anywhere on the page. Discovers all flags automatically.

```html
<vibe-toolbar></vibe-toolbar>
```

No attributes needed.

---

## Common Patterns

### A/B Test Two Designs

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flag-select name="hero-variant" description="Hero variant" default="control">
  <vibe-flag-option value="control">
    <h1>Simple, clear headline</h1>
  </vibe-flag-option>
  <vibe-flag-option value="bold">
    <h1>Bold, punchy headline with emoji 🚀</h1>
  </vibe-flag-option>
</vibe-flag-select>

<vibe-toolbar></vibe-toolbar>
```

### Feature Preview (Default Off)

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<!-- Off by default — enable in toolbar to preview -->
<vibe-flag-boolean name="checkout-v2" description="New checkout flow" value="true" default="false">
  <section id="checkout-new"><!-- new UI --></section>
</vibe-flag-boolean>

<vibe-flag-boolean name="checkout-v2" value="false">
  <section id="checkout-old"><!-- current UI --></section>
</vibe-flag-boolean>

<vibe-toolbar></vibe-toolbar>
```

### Dark Mode Toggle

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flag-boolean name="dark-mode" description="Dark mode" value="true">
  <style>body { background: #0f0f0f; color: #f0f0f0; }</style>
</vibe-flag-boolean>

<vibe-flag-boolean name="dark-mode" value="false">
  <style>body { background: #fff; color: #111; }</style>
</vibe-flag-boolean>

<vibe-toolbar></vibe-toolbar>
```

---

## JavaScript API

For programmatic control, import `flagStore`:

```ts
import { flagStore } from '@vibe-flags/core';

// Register flags manually (optional — HTML components auto-register)
flagStore.register({ key: 'beta', type: 'boolean', default: false });
flagStore.register({ key: 'layout', type: 'select', options: ['grid', 'list'] });

// Read values
flagStore.get('beta');      // false
flagStore.get('layout');    // 'grid'

// Set values (validates, persists, fires change event)
flagStore.set('beta', true);
flagStore.set('layout', 'list');

// Get all flags
flagStore.getAll();         // { beta: true, layout: 'list' }

// Reset all to defaults
flagStore.reset();
```

### React to Changes

```ts
window.addEventListener('vibe-flags-changed', (e) => {
  const { key, state } = (e as CustomEvent).detail;
  console.log(`Flag changed: ${key}`, state);
});
```

---

## Installation

**CDN (recommended):**

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>
```

**npm:**

```bash
npm install @vibe-flags/core
```

```ts
import '@vibe-flags/core';
```

---

## How Persistence Works

Flag values live in `localStorage` under `vibe-flags:<name>`. Changes sync across browser tabs via the `storage` event. No server. No account. No network.

---

## Tips for AI-Generated Code

Vibe Flags is designed so LLMs can generate correct usage on first try:

1. Always load the script tag before any flag components
2. Use `<vibe-flag-boolean>` for on/off; `<vibe-flag-select>` + `<vibe-flag-option>` for multi-option
3. Pair boolean flags — one `value="true"`, one `value="false"` with the same `name`
4. Set `description` on only one element per flag name (it shows in the toolbar)
5. Place `<vibe-toolbar>` once at the bottom of `<body>`
6. Flag names should be kebab-case strings, unique per page
