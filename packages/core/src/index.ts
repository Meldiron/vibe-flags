// Components (side-effect: registers custom elements)
export { VibeFlagsBoolean } from './components/vibe-flag-boolean.js';
export { VibeFlagsSelect } from './components/vibe-flag-select.js';
export { VibeFlagsOption } from './components/vibe-flag-option.js';
export { VibeFlagsToolbar } from './components/vibe-toolbar.js';

// Store (imperative API)
export { flagStore } from './store.js';

// Types
export type {
  FlagConfig,
  FlagConfigBoolean,
  FlagConfigSelect,
  FlagValue,
  FlagState,
} from './types.js';
