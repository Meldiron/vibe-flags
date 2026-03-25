import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import { vibeFlagsStore } from '../src/store.js';

describe('<vibe-flags-select>', () => {
  beforeEach(() => {
    localStorage.clear();
    vibeFlagsStore.reset();
  });

  it('registers a select flag from child options', async () => {
    await fixture(html`
      <vibe-flags-select name="theme" description="Theme">
        <vibe-flags-option value="light"><p>Light</p></vibe-flags-option>
        <vibe-flags-option value="dark"><p>Dark</p></vibe-flags-option>
      </vibe-flags-select>
    `);
    // Wait for microtask registration
    await new Promise((r) => setTimeout(r, 10));

    expect(vibeFlagsStore.get('theme')).toBe('light');
    const config = vibeFlagsStore.getConfigForKey('theme');
    expect(config?.type).toBe('select');
    if (config?.type === 'select') {
      expect(config.options).toEqual(['light', 'dark']);
    }
    expect(config?.label).toBe('Theme');
  });

  it('shows only the active option', async () => {
    const el = await fixture(html`
      <vibe-flags-select name="layout" description="Layout">
        <vibe-flags-option value="grid"><div id="grid">Grid</div></vibe-flags-option>
        <vibe-flags-option value="list"><div id="list">List</div></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flags-option');
    await options[0].updateComplete;
    await options[1].updateComplete;

    // First option (grid) is active by default
    expect(options[0].shadowRoot!.querySelector('slot')).not.toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).toBeNull();
  });

  it('switches active option when store changes', async () => {
    const el = await fixture(html`
      <vibe-flags-select name="layout" description="Layout">
        <vibe-flags-option value="grid"><div>Grid</div></vibe-flags-option>
        <vibe-flags-option value="list"><div>List</div></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flags-option');

    vibeFlagsStore.set('layout', 'list');
    await new Promise((r) => setTimeout(r, 10));
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('works with three options', async () => {
    await fixture(html`
      <vibe-flags-select name="size">
        <vibe-flags-option value="sm"><span>Small</span></vibe-flags-option>
        <vibe-flags-option value="md"><span>Medium</span></vibe-flags-option>
        <vibe-flags-option value="lg"><span>Large</span></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(vibeFlagsStore.get('size')).toBe('sm');
    const config = vibeFlagsStore.getConfigForKey('size');
    if (config?.type === 'select') {
      expect(config.options).toEqual(['sm', 'md', 'lg']);
    }
  });

  it('respects default attribute when set to a valid option', async () => {
    await fixture(html`
      <vibe-flags-select name="variant" default="dark">
        <vibe-flags-option value="light"><span>Light</span></vibe-flags-option>
        <vibe-flags-option value="dark"><span>Dark</span></vibe-flags-option>
        <vibe-flags-option value="auto"><span>Auto</span></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(vibeFlagsStore.get('variant')).toBe('dark');
    const config = vibeFlagsStore.getConfigForKey('variant');
    if (config?.type === 'select') {
      expect(config.default).toBe('dark');
    }
  });

  it('shows the default option as active when default is set', async () => {
    const el = await fixture(html`
      <vibe-flags-select name="mode" default="list">
        <vibe-flags-option value="grid"><div id="grid">Grid</div></vibe-flags-option>
        <vibe-flags-option value="list"><div id="list">List</div></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flags-option');
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('resets to default option on store reset', async () => {
    const el = await fixture(html`
      <vibe-flags-select name="panel" default="list">
        <vibe-flags-option value="grid"><div>Grid</div></vibe-flags-option>
        <vibe-flags-option value="list"><div>List</div></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    vibeFlagsStore.set('panel', 'grid');
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flags-option');
    await options[0].updateComplete;
    expect(options[0].shadowRoot!.querySelector('slot')).not.toBeNull();

    vibeFlagsStore.reset();
    await new Promise((r) => setTimeout(r, 10));
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('falls back to first option when default attribute is not in options', async () => {
    await fixture(html`
      <vibe-flags-select name="color" default="purple">
        <vibe-flags-option value="red"><span>Red</span></vibe-flags-option>
        <vibe-flags-option value="blue"><span>Blue</span></vibe-flags-option>
      </vibe-flags-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(vibeFlagsStore.get('color')).toBe('red');
  });
});
