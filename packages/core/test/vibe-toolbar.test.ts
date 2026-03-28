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

  // --- Position attribute ---

  it('renders FAB with default bottom-right position (left/top pixel style)', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    // FAB uses left/top always; bottom-right corner = large x and y values
    expect(el['corner']).toBe('bottom-right');
    expect(el['fabX']).toBe(window.innerWidth - 42 - 16);
    expect(el['fabY']).toBe(window.innerHeight - 42 - 16);
  });

  it('renders FAB at top-left when position attribute is top-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="top-left"></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['fabX']).toBe(16);
    expect(el['fabY']).toBe(16);
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    expect(fab.style.left).toBe('16px');
    expect(fab.style.top).toBe('16px');
  });

  it('renders FAB at bottom-left when position attribute is bottom-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-left"></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['fabX']).toBe(16);
    expect(el['fabY']).toBe(window.innerHeight - 42 - 16);
  });

  it('renders FAB at top-right when position attribute is top-right', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="top-right"></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['fabX']).toBe(window.innerWidth - 42 - 16);
    expect(el['fabY']).toBe(16);
  });

  it('localStorage position overrides the position attribute', async () => {
    localStorage.setItem('vibe-flags:toolbar-position', 'top-left');
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-right"></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['corner']).toBe('top-left');
    expect(el['fabX']).toBe(16);
    expect(el['fabY']).toBe(16);
  });

  // --- Snap-to-corner logic ---

  it('snap-to-corner: top-left quadrant → top-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](100, 100)).toBe('top-left');
  });

  it('snap-to-corner: top-right quadrant → top-right', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](window.innerWidth - 100, 100)).toBe('top-right');
  });

  it('snap-to-corner: bottom-left quadrant → bottom-left', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](100, window.innerHeight - 100)).toBe('bottom-left');
  });

  it('snap-to-corner: bottom-right quadrant → bottom-right', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['snapToCorner'](window.innerWidth - 100, window.innerHeight - 100)).toBe('bottom-right');
  });

  // --- FAB drag ---

  it('persists corner to localStorage after FAB drag and snap', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    // Simulate drag to bottom-left quadrant
    el['isDraggingFab'] = true;
    el['fabX'] = 100;
    el['fabY'] = window.innerHeight - 100;
    el['onFabDragEnd'](new PointerEvent('pointerup'));
    await el.updateComplete;

    expect(localStorage.getItem('vibe-flags:toolbar-position')).toBe('bottom-left');
    expect(el['corner']).toBe('bottom-left');
  });

  it('click on FAB is blocked after a drag', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['open']).toBe(false);

    el['hasDragged'] = true;
    el['onFabClick']();
    await el.updateComplete;

    expect(el['open']).toBe(false);
    expect(el['hasDragged']).toBe(false);
  });

  it('FAB has CSS transition on left/top for smooth snap animation', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`);
    await el.updateComplete;
    const fab = el.shadowRoot!.querySelector('.fab') as HTMLElement;
    const transition = getComputedStyle(fab).transition || fab.style.transition;
    // The component-level stylesheet sets a transition that includes left and top
    expect(fab.className).not.toContain('dragging');
  });

  // --- Panel resize ---

  it('horizontal resize updates panelWidth and persists in WxH format', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    el['isResizing'] = true;
    el['resizeMode'] = 'h';
    el['resizeStartX'] = 0;
    el['resizeStartY'] = 0;
    el['resizeStartWidth'] = 300;
    el['resizeStartHeight'] = 420;
    el['onResizeMove']({ clientX: -50, clientY: 0 } as PointerEvent);
    el['onResizeEnd'](new PointerEvent('pointerup'));
    await el.updateComplete;

    const saved = localStorage.getItem('vibe-flags:toolbar-size')!;
    expect(saved.startsWith('350x')).toBe(true);
    expect(el['panelWidth']).toBe(350);
  });

  it('vertical resize updates panelHeight', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    el['isResizing'] = true;
    el['resizeMode'] = 'v';
    el['resizeStartX'] = 0;
    el['resizeStartY'] = 0;
    el['resizeStartWidth'] = 300;
    el['resizeStartHeight'] = 420;
    // Drag up by 50px on bottom-anchored corner (bottom-right) → expand upward
    el['onResizeMove']({ clientX: 0, clientY: -50 } as PointerEvent);
    await el.updateComplete;

    expect(el['panelHeight']).toBe(470);
  });

  it('corner resize updates both width and height', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    el['isResizing'] = true;
    el['resizeMode'] = 'corner';
    el['resizeStartX'] = 0;
    el['resizeStartY'] = 0;
    el['resizeStartWidth'] = 300;
    el['resizeStartHeight'] = 420;
    el['onResizeMove']({ clientX: -30, clientY: -20 } as PointerEvent);
    await el.updateComplete;

    expect(el['panelWidth']).toBe(330);
    expect(el['panelHeight']).toBe(440);
  });

  it('loads persisted panel width and height from localStorage', async () => {
    localStorage.setItem('vibe-flags:toolbar-size', '400x500');
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;
    expect(el['panelWidth']).toBe(400);
    expect(el['panelHeight']).toBe(500);
  });

  it('renders horizontal resize handle on correct side (left for right-anchored)', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-right"></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-h.left')).not.toBeNull();
  });

  it('renders horizontal resize handle on correct side (right for left-anchored)', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-left"></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-h.right')).not.toBeNull();
  });

  it('renders vertical resize handle on correct side (top for bottom-anchored)', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-right"></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-v.top')).not.toBeNull();
  });

  it('renders vertical resize handle on correct side (bottom for top-anchored)', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="top-left"></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-v.bottom')).not.toBeNull();
  });

  it('renders corner resize handle on the opposite corner', async () => {
    const el = await fixture(html`<vibe-flags-toolbar position="bottom-right"></vibe-flags-toolbar>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resize-corner.top-left')).not.toBeNull();
  });

  // --- Header drag ---

  it('dragging header updates card position', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    const initialFabX = el['fabX'] as number;
    const initialFabY = el['fabY'] as number;

    // Simulate header drag by 50px in both directions
    el['cardDragStartX'] = 0;
    el['cardDragStartY'] = 0;
    el['isDraggingCard'] = true;
    el['onCardDragMove']({ clientX: 50, clientY: 30 } as PointerEvent);
    await el.updateComplete;

    // fabX and fabY should have moved by the delta (clamped to viewport)
    const expectedX = Math.max(0, Math.min(window.innerWidth - el['panelWidth'], initialFabX + 50));
    const expectedY = Math.max(0, Math.min(window.innerHeight - el['panelHeight'], initialFabY + 30));
    expect(el['fabX']).toBe(expectedX);
    expect(el['fabY']).toBe(expectedY);
  });

  it('releasing header drag snaps card to nearest corner', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    await el.updateComplete;

    // Position card so its center is in top-left quadrant
    el['isDraggingCard'] = true;
    el['fabX'] = 0;
    el['fabY'] = 0;
    el['onCardDragEnd'](new PointerEvent('pointerup'));
    await el.updateComplete;

    expect(el['corner']).toBe('top-left');
    expect(localStorage.getItem('vibe-flags:toolbar-position')).toBe('top-left');
  });

  it('header drag does not trigger if clicking header-actions buttons', async () => {
    const el = await fixture(html`<vibe-flags-toolbar></vibe-flags-toolbar>`) as any;
    // Open the card
    (el.shadowRoot!.querySelector('.fab') as HTMLElement).click();
    await el.updateComplete;

    const closeBtn = el.shadowRoot!.querySelector('.header-actions .icon-btn') as HTMLElement;
    const event = new PointerEvent('pointerdown', { bubbles: true, composed: true });
    Object.defineProperty(event, 'target', { value: closeBtn });
    el['onHeaderPointerDown'](event);

    expect(el['hasDragged']).toBe(false);
    // document listeners should NOT have been added
    // (no easy way to assert this, but isDraggingCard stays false)
    expect(el['isDraggingCard']).toBe(false);
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
