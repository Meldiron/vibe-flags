import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flags.js';
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
      <vibe-flags>
        <vibe-flag-select name="theme" description="Theme">
          <vibe-flag-option value="light"><p>Light</p></vibe-flag-option>
          <vibe-flag-option value="dark"><p>Dark</p></vibe-flag-option>
        </vibe-flag-select>
      </vibe-flags>
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
      <vibe-flags>
        <vibe-flag-select name="layout" description="Layout">
          <vibe-flag-option value="grid"><div id="grid">Grid</div></vibe-flag-option>
          <vibe-flag-option value="list"><div id="list">List</div></vibe-flag-option>
        </vibe-flag-select>
      </vibe-flags>
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
      <vibe-flags>
        <vibe-flag-select name="layout" description="Layout">
          <vibe-flag-option value="grid"><div>Grid</div></vibe-flag-option>
          <vibe-flag-option value="list"><div>List</div></vibe-flag-option>
        </vibe-flag-select>
      </vibe-flags>
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
    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-select name="size">
          <vibe-flag-option value="sm"><span>Small</span></vibe-flag-option>
          <vibe-flag-option value="md"><span>Medium</span></vibe-flag-option>
          <vibe-flag-option value="lg"><span>Large</span></vibe-flag-option>
        </vibe-flag-select>
      </vibe-flags>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('size')).toBe('sm');
    const config = flagStore.getConfigForKey('size');
    if (config?.type === 'select') {
      expect(config.options).toEqual(['sm', 'md', 'lg']);
    }
  });
});
