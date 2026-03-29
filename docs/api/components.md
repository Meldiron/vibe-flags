# Components

## `<vibe-flag-boolean>`

Declares a boolean flag and conditionally renders its children. Self-registers with the store on connect. Starts as `false` unless `default` is set.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | `''` | Unique flag identifier |
| `description` | `string` | `''` | Label shown in the toolbar (falls back to `name`) |
| `value` | `string` | `''` | Expected value to show children. If omitted, children are always shown. |
| `default` | `boolean` | `false` | Initial value when no stored value exists. Also used by "Reset all to defaults". |

### Example

```html
<!-- Minimal: registers the flag, always shows children -->
<vibe-flag-boolean name="darkMode">
  <div>Always visible</div>
</vibe-flag-boolean>

<!-- Show only when flag is true, default on -->
<vibe-flag-boolean name="showCta" description="Show CTA" default value="true">
  <section>Call to action</section>
</vibe-flag-boolean>

<!-- Show only when flag is false -->
<vibe-flag-boolean name="darkMode" value="false">
  <div>Light mode active</div>
</vibe-flag-boolean>
```

---

## `<vibe-flag-select>`

Declares a select flag. Options are defined as `<vibe-flag-option>` children — only the active option's children are rendered. Starts as the `default` option if set, otherwise the first option.

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | `''` | Unique flag identifier |
| `description` | `string` | `''` | Label shown in the toolbar (falls back to `name`) |
| `default` | `string` | `''` | The option value to use as the initial default. Must match a child `<vibe-flag-option value>`. Falls back to first option if omitted or invalid. Also used by "Reset all to defaults". |

### Example

```html
<!-- Without default: starts at first option ("minimal") -->
<vibe-flag-select name="hero" description="Hero section">
  <vibe-flag-option value="minimal"><h1>Minimal</h1></vibe-flag-option>
  <vibe-flag-option value="visual"><h1>Visual</h1></vibe-flag-option>
</vibe-flag-select>

<!-- With default: starts at "dark" -->
<vibe-flag-select name="theme" description="Theme" default="dark">
  <vibe-flag-option value="light"><p>Light theme</p></vibe-flag-option>
  <vibe-flag-option value="dark"><p>Dark theme</p></vibe-flag-option>
  <vibe-flag-option value="auto"><p>System theme</p></vibe-flag-option>
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

---

## Accessibility

`<vibe-toolbar>` is built to WCAG 2.1 AA standards.

### Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Move focus between controls. Focus is trapped within the panel while it is open. |
| `Enter` / `Space` | Activate the focused button or toggle. |
| `Escape` | Close the panel and return focus to the FAB button. |

### ARIA support

| Element | ARIA attributes |
|---------|----------------|
| FAB button | `aria-label="Open feature flags toolbar"`, `aria-expanded`, `aria-haspopup="dialog"` |
| Panel | `role="dialog"`, `aria-label="Feature flags"`, `aria-modal="true"` |
| Boolean toggle | `role="switch"`, `aria-checked`, `aria-label="{flag name}"` |
| Select dropdown | `aria-label="{flag name}"` (native `<select>` semantics) |
| Reset button | `aria-label="Reset all flags to defaults"` |
| Live region | `aria-live="polite"` — announces flag changes to screen readers |

### Focus management

- Opening the panel moves focus to the first interactive control inside it.
- Focus is trapped within the panel (Tab cycles through controls without escaping to the page behind).
- Closing the panel (via Escape, close button, or FAB) returns focus to the FAB button.

### Screen reader announcements

Flag changes are announced via a `aria-live="polite"` region. For example, toggling "Dark Mode" on announces "Dark Mode enabled". Changing a select announces "Theme set to dark".
