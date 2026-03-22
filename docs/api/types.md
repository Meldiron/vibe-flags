# Types

All types are exported from the package:

```ts
import type {
  FlagConfig,
  FlagConfigBoolean,
  FlagConfigSelect,
  FlagValue,
  FlagState,
} from 'vibe-flags';
```

## `FlagConfigBoolean`

```ts
interface FlagConfigBoolean {
  key: string;
  type: 'boolean';
  label?: string;
}
```

## `FlagConfigSelect`

```ts
interface FlagConfigSelect {
  key: string;
  type: 'select';
  options: string[];
  label?: string;
}
```

## `FlagConfig`

```ts
type FlagConfig = FlagConfigBoolean | FlagConfigSelect;
```

## `FlagValue`

```ts
type FlagValue = boolean | string;
```

## `FlagState`

```ts
interface FlagState {
  [key: string]: FlagValue;
}
```
