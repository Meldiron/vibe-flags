import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../src/components/vibe-flags.js';
import '../src/components/vibe-flag-boolean.js';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flags>', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
  });

  it('renders slot content', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <div id="child">Hello</div>
      </vibe-flags>
    `);
    const child = el.querySelector('#child');
    expect(child).toBeDefined();
    expect(child?.textContent).toBe('Hello');
  });

  it('child vibe-flag-boolean registers itself with the store', async () => {
    await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="beta" description="Beta mode"></vibe-flag-boolean>
      </vibe-flags>
    `);
    expect(flagStore.get('beta')).toBe(false);
    expect(flagStore.getConfigForKey('beta')?.label).toBe('Beta mode');
  });

  it('discovers boolean and select flags from children', async () => {
    await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="flagA"></vibe-flag-boolean>
        <vibe-flag-select name="flagB">
          <vibe-flag-option value="x">X</vibe-flag-option>
          <vibe-flag-option value="y">Y</vibe-flag-option>
        </vibe-flag-select>
      </vibe-flags>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('flagA')).toBe(false);
    expect(flagStore.get('flagB')).toBe('x');
  });
});
