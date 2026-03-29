import { describe, it, expect, beforeEach, vi } from 'vitest';
import { flagStore } from '../src/store.js';

describe('FlagStore', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
    flagStore.register({ key: 'darkMode', type: 'boolean', label: 'Dark Mode' });
    flagStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], label: 'Theme' });
  });

  it('initializes with correct values', () => {
    expect(flagStore.get('darkMode')).toBe(false);
    expect(flagStore.get('theme')).toBe('light');
  });

  it('returns undefined for unknown keys', () => {
    expect(flagStore.get('nonexistent')).toBeUndefined();
  });

  it('sets boolean flag values', () => {
    flagStore.set('darkMode', true);
    expect(flagStore.get('darkMode')).toBe(true);
  });

  it('sets select flag values', () => {
    flagStore.set('theme', 'dark');
    expect(flagStore.get('theme')).toBe('dark');
  });

  it('rejects invalid boolean values', () => {
    flagStore.set('darkMode', 'yes' as unknown as boolean);
    expect(flagStore.get('darkMode')).toBe(false);
  });

  it('rejects invalid select values', () => {
    flagStore.set('theme', 'neon');
    expect(flagStore.get('theme')).toBe('light');
  });

  it('persists to localStorage', () => {
    flagStore.set('darkMode', true);
    expect(localStorage.getItem('vibe-flags:darkMode')).toBe('true');
  });

  it('reads from localStorage on register', () => {
    localStorage.setItem('vibe-flags:newFlag', 'true');
    flagStore.register({ key: 'newFlag', type: 'boolean' });
    expect(flagStore.get('newFlag')).toBe(true);
  });

  it('returns all flags', () => {
    const all = flagStore.getAll();
    expect(all).toHaveProperty('darkMode');
    expect(all).toHaveProperty('theme');
  });

  it('returns config', () => {
    const configs = flagStore.getConfig();
    expect(configs.length).toBeGreaterThanOrEqual(2);
    expect(configs.find((c) => c.key === 'darkMode')).toBeDefined();
  });

  it('resets all flags', () => {
    flagStore.set('darkMode', true);
    flagStore.set('theme', 'dark');
    flagStore.reset();
    expect(flagStore.get('darkMode')).toBe(false);
    expect(flagStore.get('theme')).toBe('light');
    expect(localStorage.getItem('vibe-flags:darkMode')).toBeNull();
  });

  it('uses default value for select flag when set', () => {
    flagStore.register({ key: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' });
    expect(flagStore.get('size')).toBe('md');
  });

  it('falls back to first option when select default is not in options', () => {
    flagStore.register({ key: 'color', type: 'select', options: ['red', 'blue'], default: 'green' });
    expect(flagStore.get('color')).toBe('red');
  });

  it('resets select flag to configured default', () => {
    flagStore.register({ key: 'layout', type: 'select', options: ['grid', 'list', 'table'], default: 'list' });
    flagStore.set('layout', 'table');
    flagStore.reset();
    expect(flagStore.get('layout')).toBe('list');
  });

  it('uses boolean default=true when set', () => {
    flagStore.register({ key: 'featureOn', type: 'boolean', default: true });
    expect(flagStore.get('featureOn')).toBe(true);
  });

  it('resets boolean flag to configured default=true', () => {
    flagStore.register({ key: 'showPanel', type: 'boolean', default: true });
    flagStore.set('showPanel', false);
    flagStore.reset();
    expect(flagStore.get('showPanel')).toBe(true);
  });

  it('dispatches change events on window', () => {
    const handler = vi.fn();
    window.addEventListener('vibe-flags-changed', handler);
    flagStore.set('darkMode', true);
    expect(handler).toHaveBeenCalled();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.key).toBe('darkMode');
    expect(detail.state.darkMode).toBe(true);
    window.removeEventListener('vibe-flags-changed', handler);
  });

  it('ignores set on unknown key', () => {
    flagStore.set('unknown', true);
    expect(flagStore.get('unknown')).toBeUndefined();
  });

  it('unregisters a flag', () => {
    flagStore.unregister('darkMode');
    expect(flagStore.get('darkMode')).toBeUndefined();
    expect(flagStore.getConfigForKey('darkMode')).toBeUndefined();
  });

  describe('postMessage bridge', () => {
    beforeEach(() => {
      // Reset configure to defaults between tests
      flagStore.configure({ postMessageOrigin: '*' });
    });

    it('emits postMessage on flag change', () => {
      const spy = vi.spyOn(window, 'postMessage');
      flagStore.set('darkMode', true);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('emits correct payload on flag change', () => {
      const spy = vi.spyOn(window, 'postMessage');
      flagStore.set('darkMode', true);
      const [payload] = spy.mock.calls[0];
      expect(payload).toMatchObject({
        type: 'vibe-flags:changed',
        key: 'darkMode',
        value: true,
        previousValue: false,
      });
      expect((payload as Record<string, unknown>).allFlags).toHaveProperty('darkMode', true);
      spy.mockRestore();
    });

    it('emits postMessage reset event on reset()', () => {
      const spy = vi.spyOn(window, 'postMessage');
      flagStore.set('darkMode', true);
      spy.mockClear();
      flagStore.reset();
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'vibe-flags:reset' }),
        '*'
      );
      spy.mockRestore();
    });

    it('reset payload contains default allFlags', () => {
      flagStore.set('darkMode', true);
      const spy = vi.spyOn(window, 'postMessage');
      flagStore.reset();
      const [payload] = spy.mock.calls[0];
      expect((payload as Record<string, unknown>).allFlags).toHaveProperty('darkMode', false);
      spy.mockRestore();
    });

    it('uses configured postMessageOrigin', () => {
      flagStore.configure({ postMessageOrigin: 'https://example.com' });
      const spy = vi.spyOn(window, 'postMessage');
      flagStore.set('darkMode', true);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'vibe-flags:changed' }),
        'https://example.com'
      );
      spy.mockRestore();
    });

    it('uses * as default postMessageOrigin', () => {
      const spy = vi.spyOn(window, 'postMessage');
      flagStore.set('darkMode', true);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'vibe-flags:changed' }),
        '*'
      );
      spy.mockRestore();
    });
  });

  describe('per-flag event bus', () => {
    it('fires per-flag event on set()', () => {
      const handler = vi.fn();
      window.addEventListener('vibe-flags:darkMode:changed', handler);
      flagStore.set('darkMode', true);
      expect(handler).toHaveBeenCalledOnce();
      window.removeEventListener('vibe-flags:darkMode:changed', handler);
    });

    it('does not fire another flag event when a different flag changes', () => {
      const handler = vi.fn();
      window.addEventListener('vibe-flags:theme:changed', handler);
      flagStore.set('darkMode', true);
      expect(handler).not.toHaveBeenCalled();
      window.removeEventListener('vibe-flags:theme:changed', handler);
    });

    it('event detail contains key, value, and previousValue', () => {
      const handler = vi.fn();
      window.addEventListener('vibe-flags:darkMode:changed', handler);
      flagStore.set('darkMode', true);
      const detail = handler.mock.calls[0][0].detail;
      expect(detail).toEqual({ key: 'darkMode', value: true, previousValue: false });
      window.removeEventListener('vibe-flags:darkMode:changed', handler);
    });

    it('fires per-flag events for changed flags on reset()', () => {
      flagStore.set('darkMode', true);
      flagStore.set('theme', 'dark');
      const dmHandler = vi.fn();
      const themeHandler = vi.fn();
      window.addEventListener('vibe-flags:darkMode:changed', dmHandler);
      window.addEventListener('vibe-flags:theme:changed', themeHandler);
      flagStore.reset();
      expect(dmHandler).toHaveBeenCalledOnce();
      expect(themeHandler).toHaveBeenCalledOnce();
      window.removeEventListener('vibe-flags:darkMode:changed', dmHandler);
      window.removeEventListener('vibe-flags:theme:changed', themeHandler);
    });

    it('does not fire per-flag event for unchanged flags on reset()', () => {
      // darkMode is already false (default) — reset should not fire its event
      const handler = vi.fn();
      window.addEventListener('vibe-flags:darkMode:changed', handler);
      flagStore.reset();
      expect(handler).not.toHaveBeenCalled();
      window.removeEventListener('vibe-flags:darkMode:changed', handler);
    });

    it('fires per-flag event on register() when persisted value differs from default', () => {
      localStorage.setItem('vibe-flags:earlyBird', 'true');
      const handler = vi.fn();
      window.addEventListener('vibe-flags:earlyBird:changed', handler);
      flagStore.register({ key: 'earlyBird', type: 'boolean', default: false });
      expect(handler).toHaveBeenCalledOnce();
      window.removeEventListener('vibe-flags:earlyBird:changed', handler);
    });

    it('does not fire per-flag event on register() when persisted value matches default', () => {
      localStorage.setItem('vibe-flags:sameDefault', 'false');
      const handler = vi.fn();
      window.addEventListener('vibe-flags:sameDefault:changed', handler);
      flagStore.register({ key: 'sameDefault', type: 'boolean', default: false });
      expect(handler).not.toHaveBeenCalled();
      window.removeEventListener('vibe-flags:sameDefault:changed', handler);
    });

    describe('.on() / .off()', () => {
      it('.on() subscribes to per-flag events', () => {
        const cb = vi.fn();
        flagStore.on('darkMode', cb);
        flagStore.set('darkMode', true);
        expect(cb).toHaveBeenCalledOnce();
        expect(cb.mock.calls[0][0]).toEqual({ key: 'darkMode', value: true, previousValue: false });
        flagStore.off('darkMode', cb);
      });

      it('.on() returns an unsubscribe function that removes the listener', () => {
        const cb = vi.fn();
        const unsub = flagStore.on('darkMode', cb);
        unsub();
        flagStore.set('darkMode', true);
        expect(cb).not.toHaveBeenCalled();
      });

      it('.off() removes a listener added with .on()', () => {
        const cb = vi.fn();
        flagStore.on('darkMode', cb);
        flagStore.off('darkMode', cb);
        flagStore.set('darkMode', true);
        expect(cb).not.toHaveBeenCalled();
      });

      it('.off() with unknown callback is a no-op', () => {
        expect(() => flagStore.off('darkMode', vi.fn())).not.toThrow();
      });
    });
  });
});
