import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, render, act } from '@testing-library/react';
import { useVibeFlags, VibeFlagsToolbar, VibeFlagsBoolean, VibeFlagsSelect, VibeFlagsOption } from '../src/react/index.js';
import { createElement } from 'react';
import { vibeFlagsStore } from '../src/store.js';

describe('useVibeFlags', () => {
  beforeEach(() => {
    localStorage.clear();
    vibeFlagsStore.reset();
    // Unregister lingering flags between tests
    for (const config of vibeFlagsStore.getConfig()) {
      vibeFlagsStore.unregister(config.key);
    }
  });

  afterEach(() => {
    for (const config of vibeFlagsStore.getConfig()) {
      vibeFlagsStore.unregister(config.key);
    }
  });

  it('returns undefined for an unregistered key', () => {
    const { result } = renderHook(() => useVibeFlags('unknown'));
    expect(result.current).toBeUndefined();
  });

  it('returns the current value for a pre-registered boolean flag', () => {
    vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', default: false });
    const { result } = renderHook(() => useVibeFlags('darkMode'));
    expect(result.current).toBe(false);
  });

  it('returns the current value for a pre-registered select flag', () => {
    vibeFlagsStore.register({ key: 'theme', type: 'select', options: ['light', 'dark'], default: 'light' });
    const { result } = renderHook(() => useVibeFlags('theme'));
    expect(result.current).toBe('light');
  });

  it('registers the flag when a config object is passed', () => {
    const { result } = renderHook(() =>
      useVibeFlags({ key: 'featureX', type: 'boolean', default: true }),
    );
    expect(result.current).toBe(true);
  });

  it('registers a select flag when a config object is passed', () => {
    const { result } = renderHook(() =>
      useVibeFlags({ key: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' }),
    );
    expect(result.current).toBe('md');
  });

  it('updates when vibeFlagsStore.set is called', () => {
    vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', default: false });
    const { result } = renderHook(() => useVibeFlags('darkMode'));

    act(() => {
      vibeFlagsStore.set('darkMode', true);
    });

    expect(result.current).toBe(true);
  });

  it('updates when a select flag value changes', () => {
    vibeFlagsStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], default: 'light' });
    const { result } = renderHook(() => useVibeFlags('theme'));

    act(() => {
      vibeFlagsStore.set('theme', 'dark');
    });

    expect(result.current).toBe('dark');
  });

  it('reflects vibeFlagsStore.reset()', () => {
    vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', default: false });
    vibeFlagsStore.set('darkMode', true);
    const { result } = renderHook(() => useVibeFlags('darkMode'));
    expect(result.current).toBe(true);

    act(() => {
      vibeFlagsStore.reset();
    });

    expect(result.current).toBe(false);
  });

  it('stops updating after unmount', () => {
    vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', default: false });
    const { unmount } = renderHook(() => useVibeFlags('darkMode'));
    unmount();

    // Calling set after unmount should not throw
    expect(() => {
      act(() => {
        vibeFlagsStore.set('darkMode', true);
      });
    }).not.toThrow();
  });

  it('reacts to vibe-flags-changed window event directly', () => {
    vibeFlagsStore.register({ key: 'featureY', type: 'boolean', default: false });
    const { result } = renderHook(() => useVibeFlags('featureY'));
    expect(result.current).toBe(false);

    act(() => {
      vibeFlagsStore.set('featureY', true);
    });

    expect(result.current).toBe(true);
  });

  it('reads persisted localStorage value when registered via config', () => {
    localStorage.setItem('vibe-flags:cached', 'true');
    const { result } = renderHook(() =>
      useVibeFlags({ key: 'cached', type: 'boolean', default: false }),
    );
    expect(result.current).toBe(true);
  });
});

describe('VibeFlagsToolbar', () => {
  it('renders without throwing', () => {
    expect(() => render(VibeFlagsToolbar({}))).not.toThrow();
  });

  it('mounts a vibe-flags-toolbar element in the DOM', () => {
    const { container } = render(VibeFlagsToolbar({}));
    expect(container.querySelector('vibe-flags-toolbar')).not.toBeNull();
  });

  it('registers the vibe-flags-toolbar custom element', () => {
    render(VibeFlagsToolbar({}));
    expect(customElements.get('vibe-flags-toolbar')).toBeDefined();
  });

  it('unmounts cleanly without errors', () => {
    const { unmount } = render(VibeFlagsToolbar({}));
    expect(() => unmount()).not.toThrow();
  });
});

describe('VibeFlagsBoolean', () => {
  it('renders without throwing', () => {
    expect(() => render(VibeFlagsBoolean({ name: 'myFlag' }))).not.toThrow();
  });

  it('mounts a vibe-flags-boolean element in the DOM', () => {
    const { container } = render(VibeFlagsBoolean({ name: 'myFlag' }));
    expect(container.querySelector('vibe-flags-boolean')).not.toBeNull();
  });

  it('passes name, description, and value attributes', () => {
    const { container } = render(
      VibeFlagsBoolean({ name: 'bannerFlag', description: 'Show Banner', value: 'true' }),
    );
    const el = container.querySelector('vibe-flags-boolean')!;
    expect(el.getAttribute('name')).toBe('bannerFlag');
    expect(el.getAttribute('description')).toBe('Show Banner');
    expect(el.getAttribute('value')).toBe('true');
  });

  it('renders children inside the element', () => {
    const { container } = render(
      VibeFlagsBoolean({ name: 'myFlag', children: createElement('span', { id: 'child' }, 'content') }),
    );
    expect(container.querySelector('#child')).not.toBeNull();
  });

  it('registers the vibe-flags-boolean custom element', () => {
    render(VibeFlagsBoolean({ name: 'myFlag' }));
    expect(customElements.get('vibe-flags-boolean')).toBeDefined();
  });
});

describe('VibeFlagsSelect', () => {
  it('renders without throwing', () => {
    expect(() => render(VibeFlagsSelect({ name: 'mySelect' }))).not.toThrow();
  });

  it('mounts a vibe-flags-select element in the DOM', () => {
    const { container } = render(VibeFlagsSelect({ name: 'mySelect' }));
    expect(container.querySelector('vibe-flags-select')).not.toBeNull();
  });

  it('passes name and description attributes', () => {
    const { container } = render(
      VibeFlagsSelect({ name: 'theme', description: 'Theme', default: 'light' }),
    );
    const el = container.querySelector('vibe-flags-select')!;
    expect(el.getAttribute('name')).toBe('theme');
    expect(el.getAttribute('description')).toBe('Theme');
  });

  it('renders children inside the element', () => {
    const { container } = render(
      VibeFlagsSelect({
        name: 'theme',
        children: VibeFlagsOption({ value: 'light', children: createElement('span', { id: 'light-child' }) }),
      }),
    );
    expect(container.querySelector('vibe-flags-option')).not.toBeNull();
    expect(container.querySelector('#light-child')).not.toBeNull();
  });

  it('registers the vibe-flags-select custom element', () => {
    render(VibeFlagsSelect({ name: 'mySelect' }));
    expect(customElements.get('vibe-flags-select')).toBeDefined();
  });
});

describe('VibeFlagsOption', () => {
  it('renders without throwing', () => {
    expect(() => render(VibeFlagsOption({ value: 'light' }))).not.toThrow();
  });

  it('mounts a vibe-flags-option element in the DOM', () => {
    const { container } = render(VibeFlagsOption({ value: 'dark' }));
    expect(container.querySelector('vibe-flags-option')).not.toBeNull();
  });

  it('passes value attribute', () => {
    const { container } = render(VibeFlagsOption({ value: 'auto' }));
    expect(container.querySelector('vibe-flags-option')!.getAttribute('value')).toBe('auto');
  });

  it('renders children inside the element', () => {
    const { container } = render(
      VibeFlagsOption({ value: 'dark', children: createElement('div', { id: 'dark-content' }) }),
    );
    expect(container.querySelector('#dark-content')).not.toBeNull();
  });

  it('registers the vibe-flags-option custom element', () => {
    render(VibeFlagsOption({ value: 'x' }));
    expect(customElements.get('vibe-flags-option')).toBeDefined();
  });
});
