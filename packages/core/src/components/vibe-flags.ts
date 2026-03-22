import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vibe-flags')
export class VibeFlags extends LitElement {
  protected render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vibe-flags': VibeFlags;
  }
}
