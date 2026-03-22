# Flag Types

## Boolean Flags

`<vibe-flag-boolean>` is a simple on/off toggle. Starts as `false`.

```html
<vibe-flag-boolean name="darkMode" description="Dark mode" value="true">
  <div>Dark mode is active!</div>
</vibe-flag-boolean>
```

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Unique identifier for the flag |
| `description` | No | `""` | Label shown in the toolbar (falls back to `name`) |
| `value` | No | `""` | Expected value to show children. If omitted, children are always shown. |

## Select Flags

`<vibe-flag-select>` lets users pick from a list. Starts as the first option. Each choice is a `<vibe-flag-option>`.

```html
<vibe-flag-select name="theme" description="Theme variant">
  <vibe-flag-option value="light">
    <div>Light theme</div>
  </vibe-flag-option>
  <vibe-flag-option value="dark">
    <div>Dark theme</div>
  </vibe-flag-option>
  <vibe-flag-option value="auto">
    <div>Auto theme</div>
  </vibe-flag-option>
</vibe-flag-select>
```

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Unique identifier for the flag |
| `description` | No | `""` | Label shown in the toolbar (falls back to `name`) |

### `<vibe-flag-option>`

| Attribute | Required | Description |
|-----------|----------|-------------|
| `value` | Yes | The option value. Children are shown only when this option is active. |
