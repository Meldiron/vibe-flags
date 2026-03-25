import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flag-boolean.js';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import '../src/components/vibe-toolbar.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flags-toolbar>', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
    flagStore.register({ key: 'darkMode', type: 'boolean', label: 'Dark Mode' });
    flagStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], label: 'Theme' });
  });

  it('renders the FAB button', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.fab')).not.toBeNull();
  });

  it('opens card on FAB click', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.card')?.classList.contains('open')).toBe(true);
  });

  it('lists all configured flags', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.flag-item').length).toBe(2);
  });

  it('toggles boolean flag via switch', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.toggle input') as HTMLInputElement).click();
    await el.updateComplete;
    expect(flagStore.get('darkMode')).toBe(true);
  });

  it('changes select flag via dropdown', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(flagStore.get('theme')).toBe('dark');
  });

  it('resets all flags via reset button', async () => {
    flagStore.set('darkMode', true);
    flagStore.set('theme', 'dark');

    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.reset-btn') as HTMLElement).click();
    await el.updateComplete;
    expect(flagStore.get('darkMode')).toBe(false);
    expect(flagStore.get('theme')).toBe('light');
  });

  it('closes card on second FAB click', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    fab.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.card.open')).not.toBeNull();

    fab.click();
    await el.updateComplete;
    await waitUntil(
      () => !el.shadowRoot!.querySelector('.card')?.classList.contains('open'),
      'card should close'
    );
  });

  it('picks up flags registered by child components', async () => {
    flagStore.unregister('darkMode');
    flagStore.unregister('theme');

    const el = await fixture(html`
      <div>
        <vibe-flags-boolean name="myFlag" description="My Flag" value="true">
          <p>Content</p>
        </vibe-flags-boolean>
        <vibe-flags-toolbar></vibe-flags-toolbar>
      </div>
    `);
    const toolbar = el.querySelector('vibe-flags-toolbar')!;
    await toolbar.updateComplete;

    expect(toolbar.shadowRoot!.querySelectorAll('.flag-item').length).toBe(1);
    expect(toolbar.shadowRoot!.querySelector('.flag-label')?.textContent).toBe('My Flag');
  });
});
