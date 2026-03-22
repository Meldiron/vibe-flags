import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../src/components/vibe-flags.js';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import '../src/components/vibe-toolbar.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flag-select> switching via toolbar', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
  });

  it('option visibility changes when toolbar dropdown is used', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-select name="hero" description="Hero">
          <vibe-flag-option value="v1"><div id="v1">V1</div></vibe-flag-option>
          <vibe-flag-option value="v2"><div id="v2">V2</div></vibe-flag-option>
          <vibe-flag-option value="v3"><div id="v3">V3</div></vibe-flag-option>
        </vibe-flag-select>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);

    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    const options = el.querySelectorAll('vibe-flag-option');

    // Initial: v1 active
    expect(options[0].active).toBe(true);
    await options[0].updateComplete;
    expect(options[0].shadowRoot!.querySelector('slot')).not.toBeNull();

    // Simulate toolbar dropdown change (exactly what the toolbar does)
    const selectEl = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    console.log('Select element found:', !!selectEl);
    console.log('Select current value:', selectEl?.value);
    console.log('Select options:', Array.from(selectEl?.options || []).map(o => o.value));

    // Change to v2 via the select element
    selectEl.value = 'v2';
    selectEl.dispatchEvent(new Event('change'));

    await new Promise((r) => setTimeout(r, 50));
    await options[0].updateComplete;
    await options[1].updateComplete;

    console.log('After change - store:', flagStore.get('hero'));
    console.log('Option 0 active:', options[0].active, 'slot:', options[0].shadowRoot!.querySelector('slot') !== null);
    console.log('Option 1 active:', options[1].active, 'slot:', options[1].shadowRoot!.querySelector('slot') !== null);

    expect(flagStore.get('hero')).toBe('v2');
    expect(options[0].active).toBe(false);
    expect(options[1].active).toBe(true);
    expect(options[0].shadowRoot!.querySelector('slot')).toBeNull();
    expect(options[1].shadowRoot!.querySelector('slot')).not.toBeNull();
  });
});
