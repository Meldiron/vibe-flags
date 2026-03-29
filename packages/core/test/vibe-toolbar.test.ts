import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
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
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.fab')).not.toBeNull();
  });

  it('opens card on FAB click', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.card')?.classList.contains('open')).toBe(true);
  });

  it('lists all configured flags', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.flag-item').length).toBe(2);
  });

  it('toggles boolean flag via switch', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.toggle input') as HTMLInputElement).click();
    await el.updateComplete;
    expect(flagStore.get('darkMode')).toBe(true);
  });

  it('changes select flag via dropdown', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
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

    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.reset-btn') as HTMLElement).click();
    await el.updateComplete;
    expect(flagStore.get('darkMode')).toBe(false);
    expect(flagStore.get('theme')).toBe('light');
  });

  it('closes card on second FAB click', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
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
        <vibe-flag-boolean name="myFlag" description="My Flag" value="true">
          <p>Content</p>
        </vibe-flag-boolean>
        <vibe-toolbar></vibe-toolbar>
      </div>
    `);
    const toolbar = el.querySelector('vibe-toolbar')!;
    await toolbar.updateComplete;

    expect(toolbar.shadowRoot!.querySelectorAll('.flag-item').length).toBe(1);
    expect(toolbar.shadowRoot!.querySelector('.flag-label')?.textContent).toBe('My Flag');
  });

  // Accessibility tests

  it('FAB has correct aria-label and aria-expanded', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.getAttribute('aria-label')).toBe('Open feature flags toolbar');
    expect(fab.getAttribute('aria-expanded')).toBe('false');
    expect(fab.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('FAB aria-expanded updates to true when panel opens', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;
    // FAB is hidden when open but still in DOM
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.getAttribute('aria-expanded')).toBe('true');
  });

  it('panel has role=dialog, aria-label, and aria-modal', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const card = el.shadowRoot!.querySelector('.card') as HTMLElement;
    expect(card.getAttribute('role')).toBe('dialog');
    expect(card.getAttribute('aria-label')).toBe('Feature flags');
    expect(card.getAttribute('aria-modal')).toBe('true');
  });

  it('boolean toggle has role=switch, aria-checked, and aria-label', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('input[aria-label="Dark Mode"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.getAttribute('role')).toBe('switch');
    expect(input.getAttribute('aria-checked')).toBe('false');
  });

  it('aria-checked updates when toggle changes', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('.toggle input') as HTMLInputElement;
    expect(input.getAttribute('aria-checked')).toBe('false');

    input.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.toggle input')!.getAttribute('aria-checked')).toBe('true');
  });

  it('select dropdown has aria-label', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const select = el.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    expect(select.getAttribute('aria-label')).toBe('Theme');
  });

  it('reset button has aria-label', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector('.reset-btn') as HTMLElement;
    expect(btn.getAttribute('aria-label')).toBe('Reset all flags to defaults');
  });

  it('close button has aria-label', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;
    const closeBtn = el.shadowRoot!.querySelector('.icon-btn[aria-label="Close feature flags panel"]') as HTMLElement;
    expect(closeBtn).not.toBeNull();
  });

  it('Escape key closes the panel', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.card.open')).not.toBeNull();

    el.shadowRoot!.querySelector('.card')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    await el.updateComplete;
    await waitUntil(
      () => !el.shadowRoot!.querySelector('.card')?.classList.contains('open'),
      'panel should close on Escape'
    );
  });

  it('focus trap: Tab from last focusable wraps to first', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;

    const card = el.shadowRoot!.querySelector('.card')!;
    const focusable = Array.from(
      card.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled])'
      )
    );
    expect(focusable.length).toBeGreaterThan(0);

    // Focus the last element, then Tab should wrap to first
    const last = focusable[focusable.length - 1];
    last.focus();

    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await el.updateComplete;

    // After wrapping, focus should be on the first focusable element
    expect(el.shadowRoot!.activeElement).toBe(focusable[0]);
  });

  it('focus trap: Shift+Tab from first focusable wraps to last', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;

    const card = el.shadowRoot!.querySelector('.card')!;
    const focusable = Array.from(
      card.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled])'
      )
    );
    expect(focusable.length).toBeGreaterThan(0);

    // Focus the first element, then Shift+Tab should wrap to last
    focusable[0].focus();

    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot!.activeElement).toBe(focusable[focusable.length - 1]);
  });

  it('has aria-live region for announcing flag changes', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;
    const live = el.shadowRoot!.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(live).not.toBeNull();
    expect(live.getAttribute('aria-atomic')).toBe('true');
  });

  it('announces flag toggle to screen readers', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('input[aria-label="Dark Mode"]') as HTMLInputElement).click();
    await el.updateComplete;

    const live = el.shadowRoot!.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(live.textContent).toBe('Dark Mode enabled');
  });

  it('announces select change to screen readers', async () => {
    const el = await fixture(html`<vibe-toolbar></vibe-toolbar>`);
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;

    const live = el.shadowRoot!.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(live.textContent).toBe('Theme set to dark');
  });
});
