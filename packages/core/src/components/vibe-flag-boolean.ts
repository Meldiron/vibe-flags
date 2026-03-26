import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { vibeFlagsStore } from '../store.js';

// Hide children before JS evaluates — prevents flash of content
if (typeof document !== 'undefined' && !document.getElementById('vibe-flags-fouc')) {
  const style = document.createElement('style');
  style.id = 'vibe-flags-fouc';
  style.textContent =
    'vibe-flags-boolean:not(:defined),vibe-flags-boolean:defined,' +
    'vibe-flags-select:not(:defined),vibe-flags-select:defined,' +
    'vibe-flags-option:not(:defined),vibe-flags-option:defined{display:none}';
  document.head.appendChild(style);
}

@customElement('vibe-flags-boolean')
export class VibeFlagsBoolean extends LitElement {
  @property({ type: String })
  name = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  default = false;

  @state()
  private isMatch = false;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('vibe-flags-changed', this.onFlagChange);
    this.registerFlag();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('vibe-flags-changed', this.onFlagChange);
  }

  protected firstUpdated(): void {
    // Only reveal after first render — shadow DOM has already decided slot vs nothing
    this.style.display = 'contents';
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('name') || changed.has('description') || changed.has('default')) {
      this.registerFlag();
    }
  }

  private registerFlag(): void {
    if (!this.name) return;
    if (!vibeFlagsStore.getConfigForKey(this.name)) {
      vibeFlagsStore.register({
        key: this.name,
        type: 'boolean',
        label: this.description || undefined,
        default: this.default,
      });
    }
    this.evaluate();
  }

  private onFlagChange = (): void => {
    this.evaluate();
  };

  private evaluate(): void {
    const current = vibeFlagsStore.get(this.name);
    if (current === undefined) {
      this.isMatch = false;
    } else if (this.value === '') {
      this.isMatch = Boolean(current);
    } else {
      this.isMatch = String(current) === this.value;
    }

    if (this.isMatch) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  protected render() {
    return this.isMatch ? html`<slot></slot>` : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vibe-flags-boolean': VibeFlagsBoolean;
  }
}
