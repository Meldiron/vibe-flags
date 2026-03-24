import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flag-select>', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
  });

  it('registers a select flag from child options', async () => {
    await fixture(html`
      <vibe-flag-select name="theme" description="Theme">
        <vibe-flag-option value="light"><p>Light</p></vibe-flag-option>
        <vibe-flag-option value="dark"><p>Dark</p></vibe-flag-option>
      </vibe-flag-select>
    `);
    // Wait for microtask registration
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('theme')).toBe('light');
    const config = flagStore.getConfigForKey('theme');
    expect(config?.type).toBe('select');
    if (config?.type === 'select') {
      expect(config.options).toEqual(['light', 'dark']);
    }
    expect(config?.label).toBe('Theme');
  });

  it('shows only the active option', async () => {
    const el = await fixture(html`
      <vibe-flag-select name="layout" description="Layout">
        <vibe-flag-option value="grid"><div id="grid">Grid</div></vibe-flag-option>
        <vibe-flag-option value="list"><div id="list">List</div></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flag-option');
    await options[0].updateComplete;
    await options[1].updateComplete;

    // First option (grid) is active by default
    expect(options[0].shadowRoot!.querySelector('slot')).not.toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).toBeNull();
  });

  it('switches active option when store changes', async () => {
    const el = await fixture(html`
      <vibe-flag-select name="layout" description="Layout">
        <vibe-flag-option value="grid"><div>Grid</div></vibe-flag-option>
        <vibe-flag-option value="list"><div>List</div></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flag-option');

    flagStore.set('layout', 'list');
    await new Promise((r) => setTimeout(r, 10));
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('works with three options', async () => {
    await fixture(html`
      <vibe-flag-select name="size">
        <vibe-flag-option value="sm"><span>Small</span></vibe-flag-option>
        <vibe-flag-option value="md"><span>Medium</span></vibe-flag-option>
        <vibe-flag-option value="lg"><span>Large</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('size')).toBe('sm');
    const config = flagStore.getConfigForKey('size');
    if (config?.type === 'select') {
      expect(config.options).toEqual(['sm', 'md', 'lg']);
    }
  });

  it('respects default attribute when set to a valid option', async () => {
    await fixture(html`
      <vibe-flag-select name="variant" default="dark">
        <vibe-flag-option value="light"><span>Light</span></vibe-flag-option>
        <vibe-flag-option value="dark"><span>Dark</span></vibe-flag-option>
        <vibe-flag-option value="auto"><span>Auto</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('variant')).toBe('dark');
    const config = flagStore.getConfigForKey('variant');
    if (config?.type === 'select') {
      expect(config.default).toBe('dark');
    }
  });

  it('shows the default option as active when default is set', async () => {
    const el = await fixture(html`
      <vibe-flag-select name="mode" default="list">
        <vibe-flag-option value="grid"><div id="grid">Grid</div></vibe-flag-option>
        <vibe-flag-option value="list"><div id="list">List</div></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flag-option');
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('resets to default option on store reset', async () => {
    const el = await fixture(html`
      <vibe-flag-select name="panel" default="list">
        <vibe-flag-option value="grid"><div>Grid</div></vibe-flag-option>
        <vibe-flag-option value="list"><div>List</div></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    flagStore.set('panel', 'grid');
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flag-option');
    await options[0].updateComplete;
    expect(options[0].shadowRoot!.querySelector('slot')).not.toBeNull();

    flagStore.reset();
    await new Promise((r) => setTimeout(r, 10));
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('falls back to first option when default attribute is not in options', async () => {
    await fixture(html`
      <vibe-flag-select name="color" default="purple">
        <vibe-flag-option value="red"><span>Red</span></vibe-flag-option>
        <vibe-flag-option value="blue"><span>Blue</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('color')).toBe('red');
  });
});
