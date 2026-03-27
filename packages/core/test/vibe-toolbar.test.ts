import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import '../src/components/vibe-flag-boolean.js';
import '../src/components/vibe-flag-select.js';
import '../src/components/vibe-flag-option.js';
import '../src/components/vibe-toolbar.js';
import { vibeFlagsStore } from '../src/store.js';

describe('<vibe-flags-toolbar>', () => {
  beforeEach(() => {
    localStorage.clear();
    vibeFlagsStore.reset();
    vibeFlagsStore.register({ key: 'darkMode', type: 'boolean', label: 'Dark Mode' });
    vibeFlagsStore.register({ key: 'theme', type: 'select', options: ['light', 'dark', 'auto'], label: 'Theme' });
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
    expect(vibeFlagsStore.get('darkMode')).toBe(true);
  });

  it('changes select flag via dropdown', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector('.select') as HTMLSelectElement;
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(vibeFlagsStore.get('theme')).toBe('dark');
  });

  it('resets all flags via reset button', async () => {
    vibeFlagsStore.set('darkMode', true);
    vibeFlagsStore.set('theme', 'dark');

    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('.reset-btn') as HTMLElement).click();
    await el.updateComplete;
    expect(vibeFlagsStore.get('darkMode')).toBe(false);
    expect(vibeFlagsStore.get('theme')).toBe('light');
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

  it('renders FAB with default bottom-right position style', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.right).toBe('16px');
    expect(fab.style.bottom).toBe('16px');
  });

  it('renders FAB at top-left when position attribute is top-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="top-left"></vibe-flags-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.left).toBe('16px');
    expect(fab.style.top).toBe('16px');
  });

  it('renders FAB at bottom-left when position attribute is bottom-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-left"></vibe-flags-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.left).toBe('16px');
    expect(fab.style.bottom).toBe('16px');
  });

  it('renders FAB at top-right when position attribute is top-right', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="top-right"></vibe-flags-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.right).toBe('16px');
    expect(fab.style.top).toBe('16px');
  });

  it('localStorage position overrides the position attribute', async () => {
    localStorage.setItem('vibe-flags:toolbar-position', 'top-left');
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-right"></vibe-flags-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.left).toBe('16px');
    expect(fab.style.top).toBe('16px');
  });

  it('persists corner to localStorage after drag and snap', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    // Simulate a drag that would snap to bottom-left
    el['hasDragged'] = false;
    el['dragStartX'] = 800;
    el['dragStartY'] = 400;
    el['fabStartLeft'] = 800;
    el['fabStartTop'] = 400;
    el['dragX'] = 800;
    el['dragY'] = 400;
    el['isDragging'] = true;
    await el.updateComplete;

    // Simulate onDragEnd with FAB center in bottom-left quadrant
    el['dragX'] = 100;
    el['dragY'] = 600;
    el['onDragEnd'](new PointerEvent('pointerup'));
    await el.updateComplete;

    expect(localStorage.getItem('vibe-flags:toolbar-position')).toBe('bottom-left');
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.left).toBe('16px');
    expect(fab.style.bottom).toBe('16px');
  });

  it('snap-to-corner logic: top-left quadrant → top-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](100, 100)).toBe('top-left');
  });

  it('snap-to-corner logic: top-right quadrant → top-right', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](window.innerWidth - 100, 100)).toBe('top-right');
  });

  it('snap-to-corner logic: bottom-left quadrant → bottom-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](100, window.innerHeight - 100)).toBe('bottom-left');
  });

  it('snap-to-corner logic: bottom-right quadrant → bottom-right', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](window.innerWidth - 100, window.innerHeight - 100)).toBe('bottom-right');
  });

  it('persists panel size to localStorage after resize', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    el['isResizing'] = true;
    el['resizeStartX'] = 0;
    el['resizeStartWidth'] = 300;
    el['onResizeMove']({ clientX: -50 } as PointerEvent); // expand right-side card
    el['onResizeEnd'](new PointerEvent('pointerup'));
    await el.updateComplete;

    expect(localStorage.getItem('vibe-flags:toolbar-size')).toBe('350');
  });

  it('loads persisted panel size from localStorage', async () => {
    localStorage.setItem('vibe-flags:toolbar-size', '400');
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['panelWidth']).toBe(400);
    const card = el.shadowRoot!.querySelector('.card') as HTMLElement;
    expect(card.style.width).toBe('400px');
  });

  it('click on FAB is blocked after a drag', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['open']).toBe(false);

    // Mark as dragged
    el['hasDragged'] = true;
    el['onFabClick']();
    await el.updateComplete;

    // Card should still be closed; hasDragged cleared
    expect(el['open']).toBe(false);
    expect(el['hasDragged']).toBe(false);
  });

  it('renders resize handle with correct side for right-anchored corners', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-right"></vibe-flags-toolbar>`);
    await el.updateComplete;
    // open the card so resize handle is visible
    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-handle.left')).not.toBeNull();
  });

  it('renders resize handle with correct side for left-anchored corners', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-left"></vibe-flags-toolbar>`);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-handle.right')).not.toBeNull();
  });

  it('picks up flags registered by child components', async () => {
    vibeFlagsStore.unregister('darkMode');
    vibeFlagsStore.unregister('theme');

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
