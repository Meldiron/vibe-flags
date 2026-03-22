import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flags.js';
import '../src/components/vibe-flag-boolean.js';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import '../src/components/vibe-toolbar.js';
import { flagStore } from '../src/store.js';

describe('<vibe-toolbar>', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
    flagStore.register({ key: 'darkMode', type: 'boolean', label: 'Dark Mode' });
    flagStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], label: 'Theme' });
  });

  it('renders the FAB button', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;
    expect(toolbar.shadowRoot!.querySelector('.fab')).not.toBeNull();
  });

  it('opens card on FAB click', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    (toolbar.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await toolbar.updateComplete;

    expect(toolbar.shadowRoot!.querySelector('.card')?.classList.contains('open')).toBe(true);
  });

  it('lists all configured flags', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;
    expect(toolbar.shadowRoot!.querySelectorAll('.flag-item').length).toBe(2);
  });

  it('toggles boolean flag via switch', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    (toolbar.shadowRoot!.querySelector('.toggle input') as HTMLInputElement).click();
    await toolbar.updateComplete;
    expect(flagStore.get('darkMode')).toBe(true);
  });

  it('changes select flag via dropdown', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    const select = toolbar.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    await toolbar.updateComplete;
    expect(flagStore.get('theme')).toBe('dark');
  });

  it('resets all flags via reset button', async () => {
    flagStore.set('darkMode', true);
    flagStore.set('theme', 'dark');

    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    (toolbar.shadowRoot!.querySelector('.reset-btn') as HTMLElement).click();
    await toolbar.updateComplete;
    expect(flagStore.get('darkMode')).toBe(false);
    expect(flagStore.get('theme')).toBe('light');
  });

  it('closes card on second FAB click', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    const fab = toolbar.shadowRoot!.querySelector('.fab') as HTMLElement;
    fab.click();
    await toolbar.updateComplete;
    expect(toolbar.shadowRoot!.querySelector('.card.open')).not.toBeNull();

    fab.click();
    await toolbar.updateComplete;
    await waitUntil(
      () => !toolbar.shadowRoot!.querySelector('.card')?.classList.contains('open'),
      'card should close'
    );
  });

  it('picks up flags registered by child components', async () => {
    flagStore.unregister('darkMode');
    flagStore.unregister('theme');

    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="myFlag" description="My Flag" value="true">
          <p>Content</p>
        </vibe-flag-boolean>
        <vibe-toolbar></vibe-toolbar>
      </vibe-flags>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    expect(toolbar.shadowRoot!.querySelectorAll('.flag-item').length).toBe(1);
    expect(toolbar.shadowRoot!.querySelector('.flag-label')?.textContent).toBe('My Flag');
  });
});
