import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flag-boolean.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flags-boolean>', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
  });

  it('self-registers with the store on connect', async () => {
    await fixture(html`
      <vibe-flags-boolean name="showBanner" description="Show Banner"></vibe-flags-boolean>
    `);
    expect(flagStore.get('showBanner')).toBe(false);
    expect(flagStore.getConfigForKey('showBanner')?.label).toBe('Show Banner');
    expect(flagStore.getConfigForKey('showBanner')?.type).toBe('boolean');
  });

  it('hides children when value is omitted and flag is false (default)', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="anything">
        <div id="child">Conditionally visible</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('slot')).toBeNull();
  });

  it('shows children when value is omitted and flag is true', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="withDefault" .default=${true}>
        <div id="child">Visible when on</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('toggles visibility when no value attribute — reacts to store changes', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="debugFlag">
        <button>Show debug logs</button>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    // Off by default
    expect(el.shadowRoot!.querySelector('slot')).toBeNull();

    flagStore.set('debugFlag', true);
    await waitUntil(() => el.shadowRoot!.querySelector('slot') !== null, 'shown after toggled on');

    flagStore.set('debugFlag', false);
    await waitUntil(() => el.shadowRoot!.querySelector('slot') === null, 'hidden after toggled off');
  });

  it('defaults description to empty and type to boolean', async () => {
    await fixture(html`
      <vibe-flags-boolean name="simple"></vibe-flags-boolean>
    `);
    expect(flagStore.get('simple')).toBe(false);
    expect(flagStore.getConfigForKey('simple')?.type).toBe('boolean');
  });

  it('shows children when flag matches value', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="showBanner" value="false">
        <div>Banner</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('hides children when flag does not match value', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="showBanner" value="true">
        <div>Banner</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('slot')).toBeNull();
  });

  it('initializes with default=true and shows children when value="true"', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="ctaFlag" description="CTA" .default=${true} value="true">
        <div>CTA content</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    expect(flagStore.get('ctaFlag')).toBe(true);
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('hides children when default=true flag is toggled off', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="toggleFlag" .default=${true} value="true">
        <div>Content</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();

    flagStore.set('toggleFlag', false);
    await waitUntil(() => el.shadowRoot!.querySelector('slot') === null, 'hidden after set false');
  });

  it('reacts to store changes', async () => {
    const el = await fixture(html`
      <vibe-flags-boolean name="showBanner" value="true">
        <div>Banner</div>
      </vibe-flags-boolean>
    `);
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot!.querySelector('slot') === null, 'hidden initially');

    flagStore.set('showBanner', true);
    await waitUntil(() => el.shadowRoot!.querySelector('slot') !== null, 'shown after set true');
  });
});
