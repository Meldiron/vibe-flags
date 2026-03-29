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

  it('sets data attribute on registration', () => {
    flagStore.register({ key: 'myFeature', type: 'boolean', default: true });
    expect(document.documentElement.getAttribute('data-vf-my-feature')).toBe('true');
  });

  it('sets data attribute for select flag on registration', () => {
    expect(document.documentElement.getAttribute('data-vf-theme')).toBe('light');
  });

  it('updates data attribute on set', () => {
    flagStore.set('darkMode', true);
    expect(document.documentElement.getAttribute('data-vf-dark-mode')).toBe('true');
  });

  it('updates data attribute for select flag on set', () => {
    flagStore.set('theme', 'dark');
    expect(document.documentElement.getAttribute('data-vf-theme')).toBe('dark');
  });

  it('removes data attribute on unregister', () => {
    flagStore.unregister('darkMode');
    expect(document.documentElement.hasAttribute('data-vf-dark-mode')).toBe(false);
  });

  it('resets data attributes to default values on reset', () => {
    flagStore.set('darkMode', true);
    flagStore.set('theme', 'dark');
    flagStore.reset();
    expect(document.documentElement.getAttribute('data-vf-dark-mode')).toBe('false');
    expect(document.documentElement.getAttribute('data-vf-theme')).toBe('light');
  });
});
