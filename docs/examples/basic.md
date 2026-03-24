# Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>Vibe Flags Demo</title>
  <script type="module" src="https://unpkg.com/@vibe-flags/core"></script>
</head>
<body>
  <h1>My App</h1>

  <vibe-flag-boolean name="showBanner" description="Show welcome banner" value="true">
    <div style="padding: 16px; background: #dbeafe; border-radius: 8px;">
      Welcome to the beta! This banner is controlled by a feature flag.
    </div>
  </vibe-flag-boolean>

  <vibe-toolbar></vibe-toolbar>
</body>
</html>
```

1. A small flag button appears on the right edge of the page
2. Click it to open the toolbar sidebar
3. Toggle "Show welcome banner" on — the blue banner appears
4. Refresh the page — the setting persists
