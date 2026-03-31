import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import '../src/components/vibe-toolbar.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flag-select custom>', () => {
  beforeEach(() => {
    localStorage.clear();
    for (const config of [...flagStore.getConfig()]) {
      flagStore.unregister(config.key);
    }
  });

  it('registers with custom=true and allows any string value', async () => {
    await fixture(html`
      <vibe-flag-select name="size" custom>
        <vibe-flag-option value="sm"><span>Small</span></vibe-flag-option>
        <vibe-flag-option value="lg"><span>Large</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const config = flagStore.getConfigForKey('size');
    expect(config?.type).toBe('select');
    if (config?.type === 'select') {
      expect(config.custom).toBe(true);
    }

    // Setting a value not in options should be allowed when custom=true
    flagStore.set('size', '42px');
    expect(flagStore.get('size')).toBe('42px');
  });

  it('rejects out-of-options values when custom=false (default)', async () => {
    await fixture(html`
      <vibe-flag-select name="theme">
        <vibe-flag-option value="light"><span>Light</span></vibe-flag-option>
        <vibe-flag-option value="dark"><span>Dark</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    flagStore.set('theme', 'custom-value');
    expect(flagStore.get('theme')).toBe('light'); // rejected, stays at default
  });

  it('deactivates all predefined options when a custom value is active', async () => {
    const el = await fixture(html`
      <vibe-flag-select name="color" custom>
        <vibe-flag-option value="red"><div>Red</div></vibe-flag-option>
        <vibe-flag-option value="blue"><div>Blue</div></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    const options = el.querySelectorAll('vibe-flag-option');

    // Initial: first option active
    await options[0].updateComplete;
    expect(options[0].active).toBe(true);

    // Set a custom value
    flagStore.set('color', '#ff5500');
    await new Promise((r) => setTimeout(r, 10));
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(flagStore.get('color')).toBe('#ff5500');
    expect(options[0].active).toBe(false);
    expect(options[1].active).toBe(false);
  });

  it('accepts custom default value not in options when custom=true', async () => {
    await fixture(html`
      <vibe-flag-select name="padding" default="10px" custom>
        <vibe-flag-option value="sm"><span>Small</span></vibe-flag-option>
        <vibe-flag-option value="lg"><span>Large</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('padding')).toBe('10px');
  });

  it('restores custom value from localStorage when custom=true', async () => {
    localStorage.setItem('vibe-flags:font', JSON.stringify('Comic Sans'));

    await fixture(html`
      <vibe-flag-select name="font" custom>
        <vibe-flag-option value="serif"><span>Serif</span></vibe-flag-option>
        <vibe-flag-option value="sans"><span>Sans</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('font')).toBe('Comic Sans');
  });

  it('toolbar shows Custom... option when custom=true', async () => {
    const el = await fixture(html`
      <div>
        <vibe-flag-select name="border" custom>
          <vibe-flag-option value="none"><span>None</span></vibe-flag-option>
          <vibe-flag-option value="solid"><span>Solid</span></vibe-flag-option>
        </vibe-flag-select>
        <vibe-toolbar></vibe-toolbar>
      </div>
    `);
    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    const selectEl = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    const options = Array.from(selectEl.querySelectorAll('option'));
    const values = options.map((o) => o.value);

    expect(values).toContain('none');
    expect(values).toContain('solid');
    expect(values).toContain('__vf_custom__');
  });

  it('toolbar does not show Custom... option when custom=false', async () => {
    const el = await fixture(html`
      <div>
        <vibe-flag-select name="size2">
          <vibe-flag-option value="sm"><span>Sm</span></vibe-flag-option>
          <vibe-flag-option value="lg"><span>Lg</span></vibe-flag-option>
        </vibe-flag-select>
        <vibe-toolbar></vibe-toolbar>
      </div>
    `);
    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    const selectEl = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    const options = Array.from(selectEl.querySelectorAll('option'));
    const values = options.map((o) => o.value);

    expect(values).not.toContain('__vf_custom__');
  });

  it('toolbar shows custom input when Custom... option is selected', async () => {
    const el = await fixture(html`
      <div>
        <vibe-flag-select name="spacing" custom>
          <vibe-flag-option value="4px"><span>4px</span></vibe-flag-option>
          <vibe-flag-option value="8px"><span>8px</span></vibe-flag-option>
        </vibe-flag-select>
        <vibe-toolbar></vibe-toolbar>
      </div>
    `);
    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    // Initially no custom input
    expect(toolbar.shadowRoot!.querySelector('.custom-input')).toBeNull();

    // Select "Custom..."
    const selectEl = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    selectEl.value = '__vf_custom__';
    selectEl.dispatchEvent(new Event('change'));
    await toolbar.updateComplete;

    // Custom input should now be visible
    expect(toolbar.shadowRoot!.querySelector('.custom-input')).not.toBeNull();
  });

  it('toolbar custom input sets flag value in store', async () => {
    const el = await fixture(html`
      <div>
        <vibe-flag-select name="gap" custom>
          <vibe-flag-option value="4px"><span>4px</span></vibe-flag-option>
          <vibe-flag-option value="8px"><span>8px</span></vibe-flag-option>
        </vibe-flag-select>
        <vibe-toolbar></vibe-toolbar>
      </div>
    `);
    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    // Enter custom mode
    const selectEl = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    selectEl.value = '__vf_custom__';
    selectEl.dispatchEvent(new Event('change'));
    await toolbar.updateComplete;

    // Type a custom value
    const input = toolbar.shadowRoot!.querySelector('.custom-input') as HTMLInputElement;
    input.value = '16px';
    input.dispatchEvent(new Event('input'));
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('gap')).toBe('16px');
  });

  it('toolbar shows custom input when stored value is not in options', async () => {
    localStorage.setItem('vibe-flags:radius', JSON.stringify('999px'));

    const el = await fixture(html`
      <div>
        <vibe-flag-select name="radius" custom>
          <vibe-flag-option value="4px"><span>4px</span></vibe-flag-option>
          <vibe-flag-option value="8px"><span>8px</span></vibe-flag-option>
        </vibe-flag-select>
        <vibe-toolbar></vibe-toolbar>
      </div>
    `);
    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    // Should show custom input with the stored custom value
    const input = toolbar.shadowRoot!.querySelector('.custom-input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe('999px');

    // The select should show __vf_custom__ as selected
    const selectEl = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    expect(selectEl.value).toBe('__vf_custom__');
  });

  it('resets custom value to first option on store reset', async () => {
    await fixture(html`
      <vibe-flag-select name="weight" custom>
        <vibe-flag-option value="normal"><span>Normal</span></vibe-flag-option>
        <vibe-flag-option value="bold"><span>Bold</span></vibe-flag-option>
      </vibe-flag-select>
    `);
    await new Promise((r) => setTimeout(r, 10));

    flagStore.set('weight', '900');
    expect(flagStore.get('weight')).toBe('900');

    flagStore.reset();
    await new Promise((r) => setTimeout(r, 10));

    expect(flagStore.get('weight')).toBe('normal');
  });
});
