# Components

## `<vibe-flag-boolean>`

Declares a boolean flag and conditionally renders its children. Self-registers with the store on connect. Starts as `false`.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | `''` | Unique flag identifier |
| `description` | `string` | `''` | Label shown in the toolbar (falls back to `name`) |
| `value` | `string` | `''` | Expected value to show children. If omitted, children are always shown. |

### Example

```html
<!-- Minimal: registers the flag, always shows children -->
<vibe-flag-boolean name="darkMode">
  <div>Always visible</div>
</vibe-flag-boolean>

<!-- Show only when flag is true -->
<vibe-flag-boolean name="darkMode" description="Dark theme" value="true">
  <div>Dark mode active</div>
</vibe-flag-boolean>

<!-- Show only when flag is false -->
<vibe-flag-boolean name="darkMode" value="false">
  <div>Light mode active</div>
</vibe-flag-boolean>
```

---

## `<vibe-flag-select>`

Declares a select flag. Options are defined as `<vibe-flag-option>` children — only the active option's children are rendered. Starts as the first option.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | `''` | Unique flag identifier |
| `description` | `string` | `''` | Label shown in the toolbar (falls back to `name`) |

### Example

```html
<vibe-flag-select name="hero" description="Hero section">
  <vibe-flag-option value="hero1"><h1>Welcome to V1</h1></vibe-flag-option>
  <vibe-flag-option value="hero2"><h1>Welcome to V2</h1></vibe-flag-option>
</vibe-flag-select>
```

---

## `<vibe-flag-option>`

A single option inside `<vibe-flag-select>`. Its children are shown only when this option is the active selection.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `string` | `''` | The option value |

---

## `<vibe-toolbar>`

Floating toggle button + slide-out sidebar. Automatically discovers all registered flags and renders controls (toggle switches for booleans, dropdowns for selects).

### Example

```html
<vibe-flag-boolean name="beta" description="Beta features" value="true">
  <p>Beta content</p>
</vibe-flag-boolean>
<vibe-toolbar></vibe-toolbar>
```
