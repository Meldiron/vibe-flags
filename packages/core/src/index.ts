// Components (side-effect: registers custom elements)
export { VibeFlagBoolean } from './components/vibe-flag-boolean.js';
export { VibeFlagSelect } from './components/vibe-flag-select.js';
export { VibeFlagOption } from './components/vibe-flag-option.js';
export { VibeToolbar } from './components/vibe-toolbar.js';

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
