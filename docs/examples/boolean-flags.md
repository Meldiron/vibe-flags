# Boolean Flags

Boolean flags are on/off toggles that start as `false`.

## Multiple Boolean Flags

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flags-boolean name="darkMode" description="Dark Mode" value="true">
  <style>body { background: #1a1a1a; color: white; }</style>
</vibe-flags-boolean>

<vibe-flags-boolean name="showDebug" description="Debug Panel" value="true">
  <pre style="background: #fef3c7; padding: 12px; border-radius: 6px;">
    Debug info appears here
  </pre>
</vibe-flags-boolean>

<vibe-flags-boolean name="newNavbar" description="New Navbar" value="true">
  <nav style="background: #6366f1; color: white; padding: 12px;">
    New Navigation Bar
  </nav>
</vibe-flags-boolean>

<vibe-flags-boolean name="newNavbar" value="false">
  <nav style="background: gray; padding: 12px;">
    Old Navigation Bar
  </nav>
</vibe-flags-boolean>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

## Showing content for both states

Use two elements with `value="true"` and `value="false"`:

```html
<vibe-flags-boolean name="newNavbar" description="New Navbar" value="true">
  <NewNavbar />
</vibe-flags-boolean>

<vibe-flags-boolean name="newNavbar" value="false">
  <OldNavbar />
</vibe-flags-boolean>
```
