import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { flagStore } from '../store.js';

// Hide children before JS evaluates — prevents flash of content
if (typeof document !== 'undefined' && !document.getElementById('vibe-flag-fouc')) {
  const style = document.createElement('style');
  style.id = 'vibe-flag-fouc';
  style.textContent =
    'vibe-flag-boolean:not(:defined),vibe-flag-boolean:defined,' +
    'vibe-flag-select:not(:defined),vibe-flag-select:defined,' +
    'vibe-flag-option:not(:defined),vibe-flag-option:defined{display:none}';
  document.head.appendChild(style);
}

@customElement('vibe-flag-boolean')
export class VibeFlagBoolean extends LitElement {
  @property({ type: String })
  name = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  value = '';

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
    if (changed.has('name') || changed.has('description')) {
      this.registerFlag();
    }
  }

  private registerFlag(): void {
    if (!this.name) return;
    if (!flagStore.getConfigForKey(this.name)) {
      flagStore.register({
        key: this.name,
        type: 'boolean',
        label: this.description || undefined,
      });
    }
    this.evaluate();
  }

  private onFlagChange = (): void => {
    this.evaluate();
  };

  private evaluate(): void {
    const current = flagStore.get(this.name);
    if (current === undefined) {
      this.isMatch = false;
    } else if (this.value === '') {
      this.isMatch = true;
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
    'vibe-flag-boolean': VibeFlagBoolean;
  }
}
