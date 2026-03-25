import { useState, useEffect } from 'react';
import { flagStore } from '../store.js';
import type { FlagConfig, FlagValue, FlagState } from '../types.js';

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
