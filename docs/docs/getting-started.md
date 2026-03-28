# Getting Started

Add one script tag, write some HTML. That's it.

::: tip Try it instantly
Want to experiment without installing anything? Open the **[Playground](/playground/boolean-flag)** and start toggling flags in seconds.
:::

## Quick Start

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flags-boolean name="showBanner" description="Welcome banner" value="true">
  <div style="padding: 16px; background: #dbeafe; border-radius: 8px;">
    Welcome to the beta! This banner is controlled by a feature flag.
  </div>
</vibe-flags-boolean>

<vibe-flags-boolean name="darkMode" description="Dark mode" value="true">
  <style>
    body {
      background: #1a1a1a;
      color: #fafafa;
    }
  </style>
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

A toggle button appears on the right edge of your page. Click it to open the toolbar, flip some flags, and watch the page react. Values persist across refreshes.

No JavaScript. No config objects. No build step.

## How It Works

1. Each flag component self-registers when it connects to the DOM
2. `<vibe-flags-toolbar>` discovers all registered flags and renders controls
3. Toggling a flag updates `localStorage` and re-evaluates every flag
4. Children stay hidden until JS confirms they should be visible — no flash of content

## URL Overrides

Share flag states via URL without changing localStorage:

```
https://yourapp.com?vf:darkMode=true&vf:theme=dark
```

URL params take priority over localStorage and are ephemeral — they are not saved. See [Flag Types](/docs/configuration#url-query-parameter-overrides) for details.
