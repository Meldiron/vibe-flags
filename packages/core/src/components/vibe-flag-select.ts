import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { vibeFlagsStore } from '../store.js';
import type { VibeFlagsOption } from './vibe-flag-option.js';

@customElement('vibe-flags-select')
export class VibeFlagsSelect extends LitElement {
  @property({ type: String })
  name = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  default = '';

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('vibe-flags-changed', this.onFlagChange);
    // Wait a microtask so child <vibe-flags-option> elements are parsed
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
    if (changed.has('name') || changed.has('description') || changed.has('default')) {
      this.registerFlag();
    }
  }

  private getOptions(): VibeFlagsOption[] {
    return Array.from(this.querySelectorAll('vibe-flags-option')) as VibeFlagsOption[];
  }

  private registerFlag(): void {
    if (!this.name) return;

    const options = this.getOptions().map((el) => el.value).filter(Boolean);
    if (options.length === 0) return;

    if (!vibeFlagsStore.getConfigForKey(this.name)) {
      vibeFlagsStore.register({
        key: this.name,
        type: 'select',
        options,
        label: this.description || undefined,
        default: this.default || undefined,
      });
    }
    this.syncOptions();
  }

  private onFlagChange = (): void => {
    this.syncOptions();
  };

  private syncOptions(): void {
    const current = vibeFlagsStore.get(this.name);
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
    'vibe-flags-select': VibeFlagsSelect;
  }
}
