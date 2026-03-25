import { useState, useEffect, createElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { vibeFlagsStore } from '../store.js';
import type { VibeFlagsConfig, VibeFlagsValue, VibeFlagsState } from '../types.js';

// Ensure all custom elements are registered when this module loads
import '../components/vibe-flag-boolean.js';
import '../components/vibe-flag-select.js';
import '../components/vibe-flag-option.js';
import '../components/vibe-toolbar.js';

/**
 * React hook to read and reactively subscribe to a feature flag value.
 *
 * @overload useFlag(key: string): VibeFlagsValue | undefined
 *   Subscribe to an already-registered flag by key.
 *
 * @overload useFlag(config: VibeFlagsConfig): VibeFlagsValue
 *   Register (or re-use) a flag from config and subscribe.
 */
export function useFlag(key: string): VibeFlagsValue | undefined;
export function useFlag(config: VibeFlagsConfig): VibeFlagsValue;
export function useFlag(keyOrConfig: string | VibeFlagsConfig): VibeFlagsValue | undefined {
  const key = typeof keyOrConfig === 'string' ? keyOrConfig : keyOrConfig.key;

  const [value, setValue] = useState<VibeFlagsValue | undefined>(() => vibeFlagsStore.get(key));

  useEffect(() => {
    if (typeof keyOrConfig !== 'string') {
      vibeFlagsStore.register(keyOrConfig);
    }

    // Sync with current state after any registration
    setValue(vibeFlagsStore.get(key));

    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ key?: string; state: VibeFlagsState }>;
      if (!ev.detail.key || ev.detail.key === key) {
        setValue(vibeFlagsStore.get(key));
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
 * Wraps `<vibe-flags-toolbar>`. Automatically discovers all registered flags
 * and provides live controls. Place once anywhere in your component tree.
 *
 * ```tsx
 * import { VibeFlagsToolbar } from '@vibe-flags/core/react';
 * <VibeFlagsToolbar />
 * ```
 */
export function VibeFlagsToolbar(): ReactElement {
  return createElement('vibe-flags-toolbar');
}

interface VibeFlagsBooleanProps {
  name: string;
  description?: string;
  value?: string;
  default?: boolean;
  children?: ReactNode;
}

/**
 * React component wrapping `<vibe-flags-boolean>`.
 *
 * Self-registers the flag on mount and renders children only when the flag
 * value matches `value`. If `value` is omitted, children are shown whenever
 * the flag is truthy.
 *
 * ```tsx
 * import { VibeFlagsBoolean } from '@vibe-flags/core/react';
 * <VibeFlagsBoolean name="darkMode" value="true">
 *   <DarkTheme />
 * </VibeFlagsBoolean>
 * ```
 */
export function VibeFlagsBoolean({
  name,
  description,
  value,
  default: defaultValue,
  children,
}: VibeFlagsBooleanProps): ReactElement {
  return createElement(
    'vibe-flags-boolean',
    { name, description, value, default: defaultValue },
    children,
  );
}

interface VibeFlagsSelectProps {
  name: string;
  description?: string;
  default?: string;
  children?: ReactNode;
}

/**
 * React component wrapping `<vibe-flags-select>`.
 *
 * Wrap `VibeFlagsOption` children inside. The active option's children
 * are rendered; all others are hidden.
 *
 * ```tsx
 * import { VibeFlagsSelect, VibeFlagsOption } from '@vibe-flags/core/react';
 * <VibeFlagsSelect name="theme" default="light">
 *   <VibeFlagsOption value="light"><LightTheme /></VibeFlagsOption>
 *   <VibeFlagsOption value="dark"><DarkTheme /></VibeFlagsOption>
 * </VibeFlagsSelect>
 * ```
 */
export function VibeFlagsSelect({
  name,
  description,
  default: defaultValue,
  children,
}: VibeFlagsSelectProps): ReactElement {
  return createElement(
    'vibe-flags-select',
    { name, description, default: defaultValue },
    children,
  );
}

interface VibeFlagsOptionProps {
  value: string;
  children?: ReactNode;
}

/**
 * React component wrapping `<vibe-flags-option>`.
 *
 * Must be a direct child of `VibeFlagsSelect`. Children are rendered only
 * when this option is the active selection.
 *
 * ```tsx
 * <VibeFlagsOption value="dark"><DarkTheme /></VibeFlagsOption>
 * ```
 */
export function VibeFlagsOption({ value, children }: VibeFlagsOptionProps): ReactElement {
  return createElement('vibe-flags-option', { value }, children);
}
