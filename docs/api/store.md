# Store API

The `flagStore` provides an imperative API for managing flags programmatically.

```ts
import { flagStore } from 'vibe-flags';
```

## Methods

### `register(config: FlagConfig)`

Register a single flag. Reads existing value from `localStorage`, falling back to `false` for booleans or the first option for selects. This is called automatically by `<vibe-flags-boolean>` and `<vibe-flags-select>` elements.

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
