import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { flagStore } from '../store.js';
import type { VibeFlagOption } from './vibe-flag-option.js';

@customElement('vibe-flag-select')
export class VibeFlagSelect extends LitElement {
  @property({ type: String })
  name = '';

  @property({ type: String })
  description = '';

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('vibe-flags-changed', this.onFlagChange);
    // Wait a microtask so child <vibe-flag-option> elements are parsed
    queueMicrotask(() => this.registerFlag());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('vibe-flags-changed', this.onFlagChange);
  }

  protected firstUpdated(): void {
    this.style.display = 'contents';
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('name') || changed.has('description')) {
      this.registerFlag();
    }
  }

  private getOptions(): VibeFlagOption[] {
    return Array.from(this.querySelectorAll('vibe-flag-option')) as VibeFlagOption[];
  }

  private registerFlag(): void {
    if (!this.name) return;

    const options = this.getOptions().map((el) => el.value).filter(Boolean);
    if (options.length === 0) return;

    if (!flagStore.getConfigForKey(this.name)) {
      flagStore.register({
        key: this.name,
        type: 'select',
        options,
        label: this.description || undefined,
      });
    }
    this.syncOptions();
  }

  private onFlagChange = (): void => {
    this.syncOptions();
  };

  private syncOptions(): void {
    const current = flagStore.get(this.name);
    for (const option of this.getOptions()) {
      option.active = option.value === current;
    }
  }

  protected render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vibe-flag-select': VibeFlagSelect;
  }
}
