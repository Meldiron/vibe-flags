---
title: Select Flag — Playground
description: Try the vibe-flags select flag component live in your browser.
---

# Select Flag

A `<vibe-flags-select>` lets users pick from a list of options. Open the toolbar and switch the **UI theme** dropdown between blue, green, and red.

<Playground preset="select" />

## Code

```html
<script src="https://unpkg.com/@vibe-flags/core/dist/vibe-flags.cdn.js"></script>

<vibe-flags-select name="theme" description="UI theme" value="blue" options="blue,green,red">
  <div data-value="blue">Blue theme is active</div>
  <div data-value="green">Green theme is active</div>
  <div data-value="red">Red theme is active</div>
</vibe-flags-select>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

→ [Select Flags API reference](/api/components#vibe-flags-select)
