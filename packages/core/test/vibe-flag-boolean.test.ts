import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flags.js';
import '../src/components/vibe-flag-boolean.js';
import { flagStore } from '../src/store.js';

describe('<vibe-flag-boolean>', () => {
  beforeEach(() => {
    localStorage.clear();
    flagStore.reset();
  });

  it('self-registers with the store on connect', async () => {
    await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="showBanner" description="Show Banner"></vibe-flag-boolean>
      </vibe-flags>
    `);
    expect(flagStore.get('showBanner')).toBe(false);
    expect(flagStore.getConfigForKey('showBanner')?.label).toBe('Show Banner');
    expect(flagStore.getConfigForKey('showBanner')?.type).toBe('boolean');
  });

  it('always shows children when value is omitted', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="anything">
          <div id="child">Always visible</div>
        </vibe-flag-boolean>
      </vibe-flags>
    `);
    const flag = el.querySelector('vibe-flag-boolean')!;
    await flag.updateComplete;
    expect(flag.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('defaults description to empty and type to boolean', async () => {
    await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="simple"></vibe-flag-boolean>
      </vibe-flags>
    `);
    expect(flagStore.get('simple')).toBe(false);
    expect(flagStore.getConfigForKey('simple')?.type).toBe('boolean');
  });

  it('shows children when flag matches value', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="showBanner" value="false">
          <div>Banner</div>
        </vibe-flag-boolean>
      </vibe-flags>
    `);
    const flag = el.querySelector('vibe-flag-boolean')!;
    await flag.updateComplete;
    expect(flag.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('hides children when flag does not match value', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="showBanner" value="true">
          <div>Banner</div>
        </vibe-flag-boolean>
      </vibe-flags>
    `);
    const flag = el.querySelector('vibe-flag-boolean')!;
    await flag.updateComplete;
    expect(flag.shadowRoot!.querySelector('slot')).toBeNull();
  });

  it('reacts to store changes', async () => {
    const el = await fixture(html`
      <vibe-flags>
        <vibe-flag-boolean name="showBanner" value="true">
          <div>Banner</div>
        </vibe-flag-boolean>
      </vibe-flags>
    `);
    const flag = el.querySelector('vibe-flag-boolean')!;
    await flag.updateComplete;
    await waitUntil(() => flag.shadowRoot!.querySelector('slot') === null, 'hidden initially');

    flagStore.set('showBanner', true);
    await waitUntil(() => flag.shadowRoot!.querySelector('slot') !== null, 'shown after set true');
  });
});
