# Types

All types are exported from the package:

```ts
import type {
  VibeFlagsConfig,
  VibeFlagsConfigBoolean,
  VibeFlagsConfigSelect,
  VibeFlagsValue,
  VibeFlagsState,
} from 'vibe-flags';
```

## `VibeFlagsConfigBoolean`

```ts
interface VibeFlagsConfigBoolean {
  key: string;
  type: 'boolean';
  label?: string;
}
```

## `VibeFlagsConfigSelect`

```ts
interface VibeFlagsConfigSelect {
  key: string;
  type: 'select';
  options: string[];
  label?: string;
}
```

## `VibeFlagsConfig`

```ts
type VibeFlagsConfig = VibeFlagsConfigBoolean | VibeFlagsConfigSelect;
```

## `VibeFlagsValue`

```ts
type VibeFlagsValue = boolean | string;
```

## `VibeFlagsState`

```ts
interface VibeFlagsState {
  [key: string]: VibeFlagsValue;
}
```
