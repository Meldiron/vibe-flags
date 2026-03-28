---
title: Multiple Flags — Playground
description: Try combining multiple vibe-flags components live in your browser.
---

# Multiple Flags

Combine boolean and select flags in one page. Open the toolbar to toggle the promo banner, switch the layout density, and flip the new dashboard flag.

<Playground preset="multiple" />

## Code

```html
<script src="https://unpkg.com/@vibe-flags/core/dist/vibe-flags.cdn.js"></script>

<vibe-flags-select name="layout" description="Layout density" value="default" options="default,compact">
  <div data-value="default"><h2>My App</h2></div>
  <div data-value="compact"><h2 style="font-size:14px">My App</h2></div>
</vibe-flags-select>

<vibe-flags-boolean name="promoBar" description="Promo banner" value="true">
  <div>🎉 Launch sale — 50% off!</div>
</vibe-flags-boolean>

<vibe-flags-boolean name="newDashboard" description="New dashboard UI" value="false">
  ✨ New dashboard (experimental)
</vibe-flags-boolean>
<vibe-flags-boolean name="newDashboard" value="true">
  Classic dashboard
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

→ [Components API reference](/api/components)
