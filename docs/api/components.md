# Components

## `<vibe-flags-boolean>`

Declares a boolean flag and conditionally renders its children. Self-registers with the store on connect. Starts as `false` unless `default` is set.

### Attributes

| Attribute     | Type      | Default | Description                                                                      |
| ------------- | --------- | ------- | -------------------------------------------------------------------------------- |
| `name`        | `string`  | `''`    | Unique flag identifier                                                           |
| `description` | `string`  | `''`    | Label shown in the toolbar (falls back to `name`)                                |
| `value`       | `string`  | `''`    | Expected value to show children. If omitted, children are always shown.          |
| `default`     | `boolean` | `false` | Initial value when no stored value exists. Also used by "Reset all to defaults". |

### Example

```html
<!-- Minimal: registers the flag, always shows children -->
<vibe-flags-boolean name="darkMode">
  <div>Always visible</div>
</vibe-flags-boolean>

<!-- Show only when flag is true, default on -->
<vibe-flags-boolean name="showCta" description="Show CTA" default value="true">
  <section>Call to action</section>
</vibe-flags-boolean>

<!-- Show only when flag is false -->
<vibe-flags-boolean name="darkMode" value="false">
  <div>Light mode active</div>
</vibe-flags-boolean>
```

---

## `<vibe-flags-select>`

Declares a select flag. Options are defined as `<vibe-flags-option>` children — only the active option's children are rendered. Starts as the `default` option if set, otherwise the first option.

### Attributes

| Attribute     | Type     | Default | Description                                                                                                                                                                             |
| ------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | `string` | `''`    | Unique flag identifier                                                                                                                                                                  |
| `description` | `string` | `''`    | Label shown in the toolbar (falls back to `name`)                                                                                                                                       |
| `default`     | `string` | `''`    | The option value to use as the initial default. Must match a child `<vibe-flags-option value>`. Falls back to first option if omitted or invalid. Also used by "Reset all to defaults". |

### Example

```html
<!-- Without default: starts at first option ("minimal") -->
<vibe-flags-select name="hero" description="Hero section">
  <vibe-flags-option value="minimal"><h1>Minimal</h1></vibe-flags-option>
  <vibe-flags-option value="visual"><h1>Visual</h1></vibe-flags-option>
</vibe-flags-select>

<!-- With default: starts at "dark" -->
<vibe-flags-select name="theme" description="Theme" default="dark">
  <vibe-flags-option value="light"><p>Light theme</p></vibe-flags-option>
  <vibe-flags-option value="dark"><p>Dark theme</p></vibe-flags-option>
  <vibe-flags-option value="auto"><p>System theme</p></vibe-flags-option>
</vibe-flags-select>
```

---

## `<vibe-flags-option>`

A single option inside `<vibe-flags-select>`. Its children are shown only when this option is the active selection.

### Attributes

| Attribute | Type     | Default | Description      |
| --------- | -------- | ------- | ---------------- |
| `value`   | `string` | `''`    | The option value |

---

## `<vibe-flags-toolbar>`

Floating toggle button + slide-out sidebar. Automatically discovers all registered flags and renders controls (toggle switches for booleans, dropdowns for selects).

### Example

```html
<vibe-flags-boolean name="beta" description="Beta features" value="true">
  <p>Beta content</p>
</vibe-flags-boolean>
<vibe-flags-toolbar></vibe-flags-toolbar>
```
