# CSS-Only Conditional Rendering

Vibe Flags automatically keeps `data-vf-*` attributes on `<html>` in sync with every flag value. This lets you show or hide elements with pure CSS — no wrapper components, no JavaScript event listeners.

## How It Works

Whenever a flag is registered, changed, or reset, Vibe Flags sets a data attribute on `document.documentElement`:

| Flag type | Attribute | Example |
|-----------|-----------|---------|
| Boolean | `data-vf-{name}="true"` or `"false"` | `data-vf-dark-mode="true"` |
| Select | `data-vf-{name}="{value}"` | `data-vf-theme="dark"` |

Flag names are converted from camelCase to kebab-case: `darkMode` → `data-vf-dark-mode`.

When a flag is unregistered, its attribute is removed.

## Usage

No extra setup required — attributes are managed automatically alongside `flagStore.register()`, `flagStore.set()`, `flagStore.reset()`, and `flagStore.unregister()`.

### Boolean flag example

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@vibe-flags/core/dist/vibe-flags.cdn.mjs"></script>
<vibe-flag-boolean name="darkMode" description="Dark Mode"></vibe-flag-boolean>
<vibe-toolbar></vibe-toolbar>
```

```css
/* shown only when darkMode is true */
[data-vf-dark-mode="true"] .dark-only {
  display: block;
}
[data-vf-dark-mode="false"] .dark-only,
:not([data-vf-dark-mode]) .dark-only {
  display: none;
}
```

### Select flag example

```html
<vibe-flag-select name="theme" description="Theme">
  <vibe-flag-option value="light"></vibe-flag-option>
  <vibe-flag-option value="dark"></vibe-flag-option>
  <vibe-flag-option value="auto"></vibe-flag-option>
</vibe-flag-select>
```

```css
[data-vf-theme="dark"] body {
  background: #1a1a1a;
  color: #fff;
}
[data-vf-theme="light"] body {
  background: #fff;
  color: #000;
}
```

### Using CSS `:has()`

For modern browsers you can also use `:has()` to scope styles based on flag state:

```css
html:has([data-vf-sidebar="true"]) .main-content {
  margin-left: 260px;
}
```

## Attribute Naming

Flag keys are converted to kebab-case for the attribute name:

| Flag key | Attribute name |
|----------|----------------|
| `darkMode` | `data-vf-dark-mode` |
| `theme` | `data-vf-theme` |
| `showBanner` | `data-vf-show-banner` |
| `featureABC` | `data-vf-feature-a-b-c` |

## When to Use This vs. Wrapper Components

| Approach | Best for |
|----------|----------|
| `<vibe-flag-boolean>` / `<vibe-flag-select>` | Wrapping markup you control |
| CSS data attributes | Theming, layout shifts, apps where you cannot change HTML structure |

Both approaches work simultaneously — you can use CSS attributes and wrapper components for different parts of the same page.
