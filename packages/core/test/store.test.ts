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
});
