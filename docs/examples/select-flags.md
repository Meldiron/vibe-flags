# Select Flags

Select flags let users choose between multiple options. They start as the first option.

## Layout Selector

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>

<vibe-flags-select name="layout" description="Layout mode">
  <vibe-flags-option value="grid">
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
      <div style="background: #f3f4f6; padding: 20px;">Card 1</div>
      <div style="background: #f3f4f6; padding: 20px;">Card 2</div>
      <div style="background: #f3f4f6; padding: 20px;">Card 3</div>
    </div>
  </vibe-flags-option>

  <vibe-flags-option value="list">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: #f3f4f6; padding: 12px;">Item 1</div>
      <div style="background: #f3f4f6; padding: 12px;">Item 2</div>
      <div style="background: #f3f4f6; padding: 12px;">Item 3</div>
    </div>
  </vibe-flags-option>

  <vibe-flags-option value="table">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="border: 1px solid #e5e7eb; padding: 8px;">Row 1</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e5e7eb; padding: 8px;">Row 2</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e5e7eb; padding: 8px;">Row 3</td>
      </tr>
    </table>
  </vibe-flags-option>
</vibe-flags-select>

<vibe-flags-toolbar></vibe-flags-toolbar>
```

Each `<vibe-flags-option>` is a case — only the one matching the current value is visible. The toolbar renders a dropdown with all options.
