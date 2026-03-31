# Select Flags

Select flags let users choose between multiple options. They start as the first option.

## Layout Selector

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flag-select name="layout" description="Layout mode">
  <vibe-flag-option value="grid">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
      <div style="background: #f3f4f6; padding: 20px;">Card 1</div>
      <div style="background: #f3f4f6; padding: 20px;">Card 2</div>
      <div style="background: #f3f4f6; padding: 20px;">Card 3</div>
    </div>
  </vibe-flag-option>

  <vibe-flag-option value="list">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #f3f4f6; padding: 12px;">Item 1</div>
      <div style="background: #f3f4f6; padding: 12px;">Item 2</div>
      <div style="background: #f3f4f6; padding: 12px;">Item 3</div>
    </div>
  </vibe-flag-option>

  <vibe-flag-option value="table">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="border: 1px solid #e5e7eb; padding: 8px;">Row 1</td></tr>
      <tr><td style="border: 1px solid #e5e7eb; padding: 8px;">Row 2</td></tr>
      <tr><td style="border: 1px solid #e5e7eb; padding: 8px;">Row 3</td></tr>
    </table>
  </vibe-flag-option>
</vibe-flag-select>

<vibe-toolbar></vibe-toolbar>
```

Each `<vibe-flag-option>` is a case — only the one matching the current value is visible. The toolbar renders a dropdown with all options.

## Custom Option

Add `custom` to allow users to type any value in the toolbar.

```html
<vibe-flag-select name="font-size" description="Font size" custom>
  <vibe-flag-option value="14px"><p style="font-size:14px">Small (14px)</p></vibe-flag-option>
  <vibe-flag-option value="16px"><p style="font-size:16px">Medium (16px)</p></vibe-flag-option>
  <vibe-flag-option value="20px"><p style="font-size:20px">Large (20px)</p></vibe-flag-option>
</vibe-flag-select>

<vibe-toolbar></vibe-toolbar>
```

When `custom` is set, a **Custom...** option appears at the end of the toolbar dropdown. Selecting it reveals a text input where the user can type any value (e.g. `18px`). The typed value is stored and applied immediately. Switching back to a predefined option removes the custom input.

A custom `default` value is also supported — it does not need to match one of the predefined options:

```html
<vibe-flag-select name="spacing" default="10px" custom>
  <vibe-flag-option value="4px"><span>4px</span></vibe-flag-option>
  <vibe-flag-option value="8px"><span>8px</span></vibe-flag-option>
</vibe-flag-select>
```
