---
title: Boolean Flag — Playground
description: Try the vibe-flags boolean flag component live in your browser.
---

# Boolean Flag

A `<vibe-flags-boolean>` is an on/off toggle. Click the flag button on the right edge of the preview to open the toolbar, then flip the **Welcome banner** toggle.

<Playground preset="boolean" />

## Code

```html
<script src="https://unpkg.com/@vibe-flags/core/dist/vibe-flags.cdn.js"></script>

<vibe-flags-boolean name="showBanner" description="Welcome banner" value="true">
  <div class="banner">Welcome to the beta!</div>
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

→ [Boolean Flags API reference](/api/components#vibe-flags-boolean)
