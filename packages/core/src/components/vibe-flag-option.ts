import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("vibe-flags-option")
export class VibeFlagsOption extends LitElement {
  @property({ type: String })
  value = "";

  @property({ type: Boolean, reflect: true })
  active = false;

  protected firstUpdated(): void {
    this.style.display = "contents";
  }

  protected render() {
    return this.active ? html`<slot></slot>` : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "vibe-flags-option": VibeFlagsOption;
  }
}
