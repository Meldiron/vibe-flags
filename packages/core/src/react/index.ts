import { useState, useEffect, createElement } from 'react';
import type { ReactElement } from 'react';
import { flagStore } from '../store.js';
import type { FlagConfig, FlagValue, FlagState } from '../types.js';

// Ensure the <vibe-toolbar> custom element is registered when this module loads
import '../components/vibe-toolbar.js';

/**
 * React hook to read and reactively subscribe to a feature flag value.
 *
 * @overload useFlag(key: string): FlagValue | undefined
 *   Subscribe to an already-registered flag by key.
 *
 * @overload useFlag(config: FlagConfig): FlagValue
 *   Register (or re-use) a flag from config and subscribe.
 *   The flag is unregistered when the component unmounts.
 */
export function useFlag(key: string): FlagValue | undefined;
export function useFlag(config: FlagConfig): FlagValue;
export function useFlag(keyOrConfig: string | FlagConfig): FlagValue | undefined {
  const key = typeof keyOrConfig === 'string' ? keyOrConfig : keyOrConfig.key;

  const [value, setValue] = useState<FlagValue | undefined>(() => flagStore.get(key));

  useEffect(() => {
    if (typeof keyOrConfig !== 'string') {
      flagStore.register(keyOrConfig);
    }

    // Sync with current state after any registration
    setValue(flagStore.get(key));

    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ key?: string; state: FlagState }>;
      if (!ev.detail.key || ev.detail.key === key) {
        setValue(flagStore.get(key));
      }
    };

    window.addEventListener('vibe-flags-changed', handler);
    return () => {
      window.removeEventListener('vibe-flags-changed', handler);
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return value;
}

/**
 * React component that renders the Vibe Flags floating toolbar.
 *
 * Wraps the `<vibe-toolbar>` custom element. Automatically discovers all
 * registered flags and provides live controls (toggle for booleans,
 * dropdown for selects).
 *
 * Place it once, anywhere in your component tree:
 *
 * ```tsx
 * import { VibeFlagsToolbar } from '@vibe-flags/core/react';
 *
 * export default function App() {
 *   return (
 *     <>
 *       <MyApp />
 *       <VibeFlagsToolbar />
 *     </>
 *   );
 * }
 * ```
 */
export function VibeFlagsToolbar(): ReactElement {
  return createElement('vibe-toolbar');
}
