# Flag Types

## Boolean Flags

`<vibe-flags-boolean>` is a simple on/off toggle. Starts as `false`.

```html
<vibe-flags-boolean name="darkMode" description="Dark mode" value="true">
  <div>Dark mode is active!</div>
</vibe-flags-boolean>
```

| Attribute     | Required | Default | Description                                                             |
| ------------- | -------- | ------- | ----------------------------------------------------------------------- |
| `name`        | Yes      | —       | Unique identifier for the flag                                          |
| `description` | No       | `""`    | Label shown in the toolbar (falls back to `name`)                       |
| `value`       | No       | `""`    | Expected value to show children. If omitted, children are always shown. |

## Select Flags

`<vibe-flags-select>` lets users pick from a list. Starts as the first option. Each choice is a `<vibe-flags-option>`.

```html
<vibe-flags-select name="theme" description="Theme variant">
  <vibe-flags-option value="light">
    <div>Light theme</div>
  </vibe-flags-option>
  <vibe-flags-option value="dark">
    <div>Dark theme</div>
  </vibe-flags-option>
  <vibe-flags-option value="auto">
    <div>Auto theme</div>
  </vibe-flags-option>
</vibe-flags-select>
```

| Attribute     | Required | Default | Description                                       |
| ------------- | -------- | ------- | ------------------------------------------------- |
| `name`        | Yes      | —       | Unique identifier for the flag                    |
| `description` | No       | `""`    | Label shown in the toolbar (falls back to `name`) |

### `<vibe-flags-option>`

| Attribute | Required | Description                                                           |
| --------- | -------- | --------------------------------------------------------------------- |
| `value`   | Yes      | The option value. Children are shown only when this option is active. |
