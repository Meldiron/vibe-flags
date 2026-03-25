import { describe, it, expect, beforeEach, vi } from 'vitest';
import { vibeFlagsStore } from '../src/store.js';

describe('VibeFlagsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vibeFlagsStore.reset();
    vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', label: 'Dark Mode' });
    vibeFlagsStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], label: 'Theme' });
  });

  it('initializes with correct values', () => {
    expect(vibeFlagsStore.get('darkMode')).toBe(false);
    expect(vibeFlagsStore.get('theme')).toBe('light');
  });

  it('returns undefined for unknown keys', () => {
    expect(vibeFlagsStore.get('nonexistent')).toBeUndefined();
  });

  it('sets boolean flag values', () => {
    vibeFlagsStore.set('darkMode', true);
    expect(vibeFlagsStore.get('darkMode')).toBe(true);
  });

  it('sets select flag values', () => {
    vibeFlagsStore.set('theme', 'dark');
    expect(vibeFlagsStore.get('theme')).toBe('dark');
  });

  it('rejects invalid boolean values', () => {
    vibeFlagsStore.set('darkMode', 'yes' as unknown as boolean);
    expect(vibeFlagsStore.get('darkMode')).toBe(false);
  });

  it('rejects invalid select values', () => {
    vibeFlagsStore.set('theme', 'neon');
    expect(vibeFlagsStore.get('theme')).toBe('light');
  });

  it('persists to localStorage', () => {
    vibeFlagsStore.set('darkMode', true);
    expect(localStorage.getItem('vibe-flags:darkMode')).toBe('true');
  });

  it('reads from localStorage on register', () => {
    localStorage.setItem('vibe-flags:newFlag', 'true');
    vibeFlagsStore.register({ key: 'newFlag', type: 'boolean' });
    expect(vibeFlagsStore.get('newFlag')).toBe(true);
  });

  it('returns all flags', () => {
    const all = vibeFlagsStore.getAll();
    expect(all).toHaveProperty('darkMode');
    expect(all).toHaveProperty('theme');
  });

  it('returns config', () => {
    const configs = vibeFlagsStore.getConfig();
    expect(configs.length).toBeGreaterThanOrEqual(2);
    expect(configs.find((c) => c.key === 'darkMode')).toBeDefined();
  });

  it('resets all flags', () => {
    vibeFlagsStore.set('darkMode', true);
    vibeFlagsStore.set('theme', 'dark');
    vibeFlagsStore.reset();
    expect(vibeFlagsStore.get('darkMode')).toBe(false);
    expect(vibeFlagsStore.get('theme')).toBe('light');
    expect(localStorage.getItem('vibe-flags:darkMode')).toBeNull();
  });

  it('uses default value for select flag when set', () => {
    vibeFlagsStore.register({ key: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' });
    expect(vibeFlagsStore.get('size')).toBe('md');
  });

  it('falls back to first option when select default is not in options', () => {
    vibeFlagsStore.register({ key: 'color', type: 'select', options: ['red', 'blue'], default: 'green' });
    expect(vibeFlagsStore.get('color')).toBe('red');
  });

  it('resets select flag to configured default', () => {
    vibeFlagsStore.register({ key: 'layout', type: 'select', options: ['grid', 'list', 'table'], default: 'list' });
    vibeFlagsStore.set('layout', 'table');
    vibeFlagsStore.reset();
    expect(vibeFlagsStore.get('layout')).toBe('list');
  });

  it('uses boolean default=true when set', () => {
    vibeFlagsStore.register({ key: 'featureOn', type: 'boolean', default: true });
    expect(vibeFlagsStore.get('featureOn')).toBe(true);
  });

  it('resets boolean flag to configured default=true', () => {
    vibeFlagsStore.register({ key: 'showPanel', type: 'boolean', default: true });
    vibeFlagsStore.set('showPanel', false);
    vibeFlagsStore.reset();
    expect(vibeFlagsStore.get('showPanel')).toBe(true);
  });

  it('dispatches change events on window', () => {
    const handler = vi.fn();
    window.addEventListener('vibe-flags-changed', handler);
    vibeFlagsStore.set('darkMode', true);
    expect(handler).toHaveBeenCalled();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.key).toBe('darkMode');
    expect(detail.state.darkMode).toBe(true);
    window.removeEventListener('vibe-flags-changed', handler);
  });

  it('ignores set on unknown key', () => {
    vibeFlagsStore.set('unknown', true);
    expect(vibeFlagsStore.get('unknown')).toBeUndefined();
  });

  it('unregisters a flag', () => {
    vibeFlagsStore.unregister('darkMode');
    expect(vibeFlagsStore.get('darkMode')).toBeUndefined();
    expect(vibeFlagsStore.getConfigForKey('darkMode')).toBeUndefined();
  });
});
