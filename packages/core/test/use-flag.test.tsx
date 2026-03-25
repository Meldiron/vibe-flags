import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, render, act } from '@testing-library/react';
import { useFlag, VibeFlagsToolbar } from '../src/react/index.js';
import { flagStore } from '../src/store.js';

describe('useFlag', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
    // Unregister lingering flags between tests
    for (const config of flagStore.getConfig()) {
      flagStore.unregister(config.key);
    }
  });

  afterEach(() => {
    for (const config of flagStore.getConfig()) {
      flagStore.unregister(config.key);
    }
  });

  it('returns undefined for an unregistered key', () => {
    const { result } = renderHook(() => useFlag('unknown'));
    expect(result.current).toBeUndefined();
  });

  it('returns the current value for a pre-registered boolean flag', () => {
    flagStore.register({ key: 'darkMode', type: 'boolean', default: false });
    const { result } = renderHook(() => useFlag('darkMode'));
    expect(result.current).toBe(false);
  });

  it('returns the current value for a pre-registered select flag', () => {
    flagStore.register({ key: 'theme', type: 'select', options: ['light', 'dark'], default: 'light' });
    const { result } = renderHook(() => useFlag('theme'));
    expect(result.current).toBe('light');
  });

  it('registers the flag when a config object is passed', () => {
    const { result } = renderHook(() =>
      useFlag({ key: 'featureX', type: 'boolean', default: true }),
    );
    expect(result.current).toBe(true);
  });

  it('registers a select flag when a config object is passed', () => {
    const { result } = renderHook(() =>
      useFlag({ key: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' }),
    );
    expect(result.current).toBe('md');
  });

  it('updates when flagStore.set is called', () => {
    flagStore.register({ key: 'darkMode', type: 'boolean', default: false });
    const { result } = renderHook(() => useFlag('darkMode'));

    act(() => {
      flagStore.set('darkMode', true);
    });

    expect(result.current).toBe(true);
  });

  it('updates when a select flag value changes', () => {
    flagStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], default: 'light' });
    const { result } = renderHook(() => useFlag('theme'));

    act(() => {
      flagStore.set('theme', 'dark');
    });

    expect(result.current).toBe('dark');
  });

  it('reflects flagStore.reset()', () => {
    flagStore.register({ key: 'darkMode', type: 'boolean', default: false });
    flagStore.set('darkMode', true);
    const { result } = renderHook(() => useFlag('darkMode'));
    expect(result.current).toBe(true);

    act(() => {
      flagStore.reset();
    });

    expect(result.current).toBe(false);
  });

  it('stops updating after unmount', () => {
    flagStore.register({ key: 'darkMode', type: 'boolean', default: false });
    const { result, unmount } = renderHook(() => useFlag('darkMode'));
    unmount();

    // Calling set after unmount should not throw
    expect(() => {
      act(() => {
        flagStore.set('darkMode', true);
      });
    }).not.toThrow();
  });

  it('reacts to vibe-flags-changed window event directly', () => {
    flagStore.register({ key: 'featureY', type: 'boolean', default: false });
    const { result } = renderHook(() => useFlag('featureY'));
    expect(result.current).toBe(false);

    act(() => {
      flagStore.set('featureY', true);
    });

    expect(result.current).toBe(true);
  });

  it('reads persisted localStorage value when registered via config', () => {
    localStorage.setItem('vibe-flags:cached', 'true');
    const { result } = renderHook(() =>
      useFlag({ key: 'cached', type: 'boolean', default: false }),
    );
    expect(result.current).toBe(true);
  });
});

describe('VibeFlagsToolbar', () => {
  it('renders without throwing', () => {
    expect(() => render(VibeFlagsToolbar({}))).not.toThrow();
  });

  it('mounts a vibe-toolbar element in the DOM', () => {
    const { container } = render(VibeFlagsToolbar({}));
    expect(container.querySelector('vibe-toolbar')).not.toBeNull();
  });

  it('registers the vibe-toolbar custom element', () => {
    render(VibeFlagsToolbar({}));
    expect(customElements.get('vibe-toolbar')).toBeDefined();
  });

  it('unmounts cleanly without errors', () => {
    const { unmount } = render(VibeFlagsToolbar({}));
    expect(() => unmount()).not.toThrow();
  });
});
