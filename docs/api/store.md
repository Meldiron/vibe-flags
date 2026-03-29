# Store API

The `flagStore` provides an imperative API for managing flags programmatically.

```ts
import { flagStore } from 'vibe-flags';
```

## Methods

### `register(config: FlagConfig)`

Register a single flag. Reads existing value from `localStorage`, falling back to `false` for booleans or the first option for selects. This is called automatically by `<vibe-flag-boolean>` and `<vibe-flag-select>` elements.

```ts
flagStore.register({ key: 'beta', type: 'boolean', label: 'Beta Mode' });
flagStore.register({ key: 'theme', type: 'select', options: ['light', 'dark'], label: 'Theme' });
```

### `unregister(key: string)`

Remove a flag from the store.

```ts
flagStore.unregister('beta');
```

### `get(key: string): FlagValue | undefined`

Get the current value of a flag.

```ts
flagStore.get('beta');  // false
flagStore.get('theme'); // 'light'
```

### `set(key: string, value: FlagValue): void`

Set a flag value. Validates the value against the flag's type and options. Persists to `localStorage` and dispatches a change event.

```ts
flagStore.set('beta', true);
flagStore.set('theme', 'dark');

// Invalid values are silently ignored:
flagStore.set('beta', 'yes');     // ignored (not a boolean)
flagStore.set('theme', 'neon');   // ignored (not in options)
```

### `getAll(): FlagState`

Get all current flag values as a plain object.

```ts
flagStore.getAll();
// { beta: false, theme: 'light' }
```

### `getConfig(): FlagConfig[]`

Get all registered flag configurations.

### `getConfigForKey(key: string): FlagConfig | undefined`

Get the configuration for a specific flag.

### `reset(): void`

Reset all flags to their initial values (`false` for booleans, first option for selects) and clear `localStorage`.

```ts
flagStore.reset();
```

### `configure(options): void`

Configure store-level options.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `postMessageOrigin` | `string` | `"*"` | Target origin for `window.postMessage` events. Set to a specific origin to restrict delivery. |

```ts
flagStore.configure({ postMessageOrigin: 'https://example.com' });
```

## Events

### `vibe-flags-changed`

Dispatched on `window` whenever a flag value changes.

```ts
window.addEventListener('vibe-flags-changed', (e) => {
  const { key, state } = e.detail;
  console.log(`Flag "${key}" changed`);
  console.log('All flags:', state);
});
```

| Property | Type | Description |
|----------|------|-------------|
| `detail.key` | `string \| undefined` | The flag that changed, or `undefined` for bulk changes (reset) |
| `detail.state` | `FlagState` | Snapshot of all current flag values |

## postMessage Bridge

Vibe Flags emits `window.postMessage` events on every flag change and reset, enabling integration with iframes, browser extensions, and micro-frontends without tight coupling.

### `vibe-flags:changed`

Emitted on every `flagStore.set()` call that passes validation.

```ts
window.addEventListener('message', (e) => {
  if (e.data?.type === 'vibe-flags:changed') {
    console.log('Flag changed:', e.data.key);
    console.log('New value:', e.data.value);
    console.log('Previous value:', e.data.previousValue);
    console.log('All flags:', e.data.allFlags);
  }
});
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"vibe-flags:changed"` | Event type discriminator |
| `key` | `string` | The flag key that changed |
| `value` | `FlagValue` | The new flag value |
| `previousValue` | `FlagValue` | The previous flag value |
| `allFlags` | `FlagState` | Snapshot of all flags after the change |

### `vibe-flags:reset`

Emitted on `flagStore.reset()`.

```ts
window.addEventListener('message', (e) => {
  if (e.data?.type === 'vibe-flags:reset') {
    console.log('Flags reset to defaults:', e.data.allFlags);
  }
});
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"vibe-flags:reset"` | Event type discriminator |
| `allFlags` | `FlagState` | Snapshot of all flags at their default values |

### Origin Restriction

By default, messages are posted with `"*"` as the target origin. To restrict delivery to a specific origin:

```ts
flagStore.configure({ postMessageOrigin: 'https://example.com' });
```

### Iframe Integration Example

```html
<!-- parent.html -->
<iframe id="child" src="https://app.example.com"></iframe>
<script type="module">
  import { flagStore } from 'vibe-flags';
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'vibe-flags:changed') {
      // React to flag changes in the parent from the child iframe
    }
  });
</script>
```

### Browser Extension Example

```js
// content-script.js
window.addEventListener('message', (e) => {
  if (e.data?.type === 'vibe-flags:changed') {
    chrome.runtime.sendMessage({ flagChanged: e.data });
  }
});
```
