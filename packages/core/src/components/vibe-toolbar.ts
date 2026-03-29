import { LitElement, html, css, nothing, type CSSResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { tokensDark, tokensLight } from '../styles/tokens.js';
import { flagStore } from '../store.js';
import type { FlagConfig, FlagState } from '../types.js';

const THEME_KEY = 'vibeFlagsTheme';

@customElement('vibe-toolbar')
export class VibeToolbar extends LitElement {
  static styles = [
    css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      [hidden] {
        display: none !important;
      }

      /* Visually hidden but accessible to screen readers */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .fab {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 99999;
        width: 42px;
        height: 42px;
        border: 1px solid var(--vf-border);
        border-radius: 12px;
        background: var(--vf-bg);
        color: var(--vf-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--vf-shadow-lg);
        transition: all 0.2s ease;
        font-family: var(--vf-font);
      }

      .fab:hover {
        background: var(--vf-bg-muted);
        box-shadow: var(--vf-shadow-xl);
        transform: translateY(-1px);
      }

      .fab:focus-visible {
        outline: 2px solid var(--vf-accent);
        outline-offset: 2px;
      }

      .fab svg {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      .card {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 100001;
        width: 300px;
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 32px);
        background: var(--vf-bg);
        border: 1px solid var(--vf-border);
        border-radius: 14px;
        box-shadow: var(--vf-shadow-xl);
        font-family: var(--vf-font);
        color: var(--vf-text);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(8px) scale(0.96);
        pointer-events: none;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .card.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        border-bottom: 1px solid var(--vf-border);
        flex-shrink: 0;
      }

      .header h2 {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.01em;
        display: flex;
        align-items: center;
        gap: 7px;
      }

      .header h2 svg {
        width: 15px;
        height: 15px;
        color: var(--vf-accent);
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .badge {
        font-size: 10px;
        font-weight: 500;
        padding: 1px 6px;
        border-radius: 9999px;
        background: var(--vf-bg-muted);
        color: var(--vf-text-muted);
        border: 1px solid var(--vf-border);
      }

      .icon-btn {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: var(--vf-radius);
        background: transparent;
        color: var(--vf-text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
      }

      .icon-btn:hover {
        background: var(--vf-bg-muted);
        color: var(--vf-text);
      }

      .icon-btn:focus-visible {
        outline: 2px solid var(--vf-accent);
        outline-offset: 2px;
      }

      .icon-btn svg {
        width: 14px;
        height: 14px;
      }

      .flags {
        overflow-y: auto;
        flex: 1;
      }

      .flag-item {
        padding: 10px 14px;
        transition: background 0.1s ease;
      }

      .flag-item:hover {
        background: var(--vf-bg-muted);
      }

      .flag-item + .flag-item {
        border-top: 1px solid var(--vf-border);
      }

      .flag-label {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 1px;
      }

      .flag-key {
        font-size: 10px;
        color: var(--vf-text-muted);
        font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas,
          monospace;
      }

      .flag-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .flag-info {
        min-width: 0;
        flex: 1;
      }

      /* Toggle switch */
      .toggle {
        position: relative;
        width: 36px;
        height: 20px;
        flex-shrink: 0;
      }

      .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .toggle-track {
        position: absolute;
        inset: 0;
        border-radius: 10px;
        background: var(--vf-border);
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .toggle input:checked + .toggle-track {
        background: var(--vf-primary);
      }

      /* Visible focus indicator on the track when input is focused */
      .toggle input:focus-visible + .toggle-track {
        outline: 2px solid var(--vf-accent);
        outline-offset: 2px;
      }

      .toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease;
        pointer-events: none;
      }

      .toggle input:checked ~ .toggle-thumb {
        transform: translateX(16px);
        background: var(--vf-primary-fg);
      }

      /* Select dropdown */
      .select-wrapper {
        position: relative;
        flex-shrink: 0;
      }

      .select {
        appearance: none;
        -webkit-appearance: none;
        font-size: 12px;
        font-family: var(--vf-font);
        padding: 5px 26px 5px 8px;
        border: 1px solid var(--vf-border);
        border-radius: var(--vf-radius);
        background: var(--vf-bg);
        color: var(--vf-text);
        cursor: pointer;
        min-width: 80px;
        transition: border-color 0.15s ease;
      }

      .select:hover {
        border-color: var(--vf-text-muted);
      }

      .select:focus {
        border-color: var(--vf-accent);
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
        outline: none;
      }

      .select:focus-visible {
        outline: 2px solid var(--vf-accent);
        outline-offset: 2px;
      }

      .select-chevron {
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--vf-text-muted);
      }

      .select-chevron svg {
        width: 12px;
        height: 12px;
      }

      /* Footer */
      .footer {
        padding: 10px 14px;
        border-top: 1px solid var(--vf-border);
        flex-shrink: 0;
      }

      .reset-btn {
        width: 100%;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        font-family: var(--vf-font);
        border: 1px solid var(--vf-border);
        border-radius: var(--vf-radius);
        background: var(--vf-bg);
        color: var(--vf-text);
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .reset-btn:hover {
        background: var(--vf-bg-muted);
        border-color: var(--vf-text-muted);
      }

      .reset-btn:focus-visible {
        outline: 2px solid var(--vf-accent);
        outline-offset: 2px;
      }

      .empty {
        padding: 24px 14px;
        text-align: center;
        color: var(--vf-text-muted);
        font-size: 12px;
      }
    `,
  ];

  @state()
  private open = false;

  @state()
  private flags: FlagState = {};

  @state()
  private configs: FlagConfig[] = [];

  @state()
  private darkMode = true;

  @state()
  private liveMessage = '';

  @state()
  private copied = false;

  private _copyTimer: ReturnType<typeof setTimeout> | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('vibe-flags-changed', this.onFlagChange);
    this.syncFromStore();
    this.loadTheme();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('vibe-flags-changed', this.onFlagChange);
  }

  private loadTheme(): void {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(THEME_KEY);
    this.darkMode = saved ? saved === 'dark' : true;
    this.applyTheme();
  }

  private toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem(THEME_KEY, this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    const tokens = this.darkMode ? tokensDark : tokensLight;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(tokens.cssText);
    this.shadowRoot!.adoptedStyleSheets = [
      ...VibeToolbar.elementStyles.map((s) => (s as CSSResult).styleSheet!),
      sheet,
    ];
  }

  private onFlagChange = (): void => {
    this.syncFromStore();
  };

  private syncFromStore(): void {
    this.configs = flagStore.getConfig();
    this.flags = flagStore.getAll();
  }

  private getFocusableElements(): HTMLElement[] {
    const card = this.shadowRoot!.querySelector('.card');
    if (!card) return [];
    return Array.from(
      card.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  private async openPanel(): Promise<void> {
    this.open = true;
    await this.updateComplete;
    // Move focus to first focusable element in the panel
    const focusable = this.getFocusableElements();
    focusable[0]?.focus();
  }

  private closePanel(): void {
    this.open = false;
    // Return focus to FAB after render
    void this.updateComplete.then(() => {
      (this.shadowRoot!.querySelector<HTMLElement>('.fab'))?.focus();
    });
  }

  private toggle(): void {
    if (this.open) {
      this.closePanel();
    } else {
      void this.openPanel();
    }
  }

  private onPanelKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.closePanel();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = this.getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = this.shadowRoot!.activeElement as HTMLElement;

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  private onToggle(key: string): void {
    const current = this.flags[key];
    const next = !current;
    flagStore.set(key, next);
    const config = this.configs.find((c) => c.key === key);
    const label = config?.label || key;
    this.liveMessage = `${label} ${next ? 'enabled' : 'disabled'}`;
  }

  private onSelect(key: string, e: Event): void {
    const target = e.target as HTMLSelectElement;
    flagStore.set(key, target.value);
    const config = this.configs.find((c) => c.key === key);
    const label = config?.label || key;
    this.liveMessage = `${label} set to ${target.value}`;
  }

  private onReset(): void {
    flagStore.reset();
  }

  private onCopyUrl(): void {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    // Remove existing vf: params
    const keysToDelete: string[] = [];
    url.searchParams.forEach((_, key) => {
      if (key.startsWith('vf:')) keysToDelete.push(key);
    });
    keysToDelete.forEach((k) => url.searchParams.delete(k));
    // Add current flag states
    for (const config of this.configs) {
      const value = this.flags[config.key];
      url.searchParams.set(`vf:${config.key}`, String(value));
    }
    void navigator.clipboard.writeText(url.toString()).then(() => {
      this.copied = true;
      if (this._copyTimer !== null) clearTimeout(this._copyTimer);
      this._copyTimer = setTimeout(() => {
        this.copied = false;
        this._copyTimer = null;
      }, 1500);
    });
  }

  private renderFlagIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
  }

  private renderCloseIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  }

  private renderChevronDown() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
  }

  private renderSunIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  }

  private renderMoonIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  private renderLinkIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
  }

  private renderCheckIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  }

  private renderBooleanFlag(config: FlagConfig) {
    const checked = this.flags[config.key] === true;
    const label = config.label || config.key;
    return html`
      <div class="flag-item">
        <div class="flag-row">
          <div class="flag-info">
            <div class="flag-label">${label}</div>
            <div class="flag-key">${config.key}</div>
          </div>
          <label class="toggle">
            <input
              type="checkbox"
              role="switch"
              aria-checked=${checked}
              aria-label=${label}
              .checked=${checked}
              @change=${() => this.onToggle(config.key)}
            />
            <span class="toggle-track"></span>
            <span class="toggle-thumb"></span>
          </label>
        </div>
      </div>
    `;
  }

  private renderSelectFlag(config: FlagConfig) {
    if (config.type !== 'select') return nothing;
    const current = this.flags[config.key] as string;
    const label = config.label || config.key;
    return html`
      <div class="flag-item">
        <div class="flag-row">
          <div class="flag-info">
            <div class="flag-label">${label}</div>
            <div class="flag-key">${config.key}</div>
          </div>
          <div class="select-wrapper">
            <select
              class="select"
              aria-label=${label}
              .value=${current}
              @change=${(e: Event) => this.onSelect(config.key, e)}
            >
              ${config.options.map(
                (opt) =>
                  html`<option value=${opt} ?selected=${opt === current}>
                    ${opt}
                  </option>`
              )}
            </select>
            <span class="select-chevron" aria-hidden="true">${this.renderChevronDown()}</span>
          </div>
        </div>
      </div>
    `;
  }

  protected render() {
    return html`
      <button
        class="fab"
        ?hidden=${this.open}
        @click=${this.toggle}
        aria-label="Open feature flags toolbar"
        aria-expanded=${this.open}
        aria-haspopup="dialog"
      >
        ${this.renderFlagIcon()}
      </button>

      <div
        class="card ${this.open ? 'open' : ''}"
        role="dialog"
        aria-label="Feature flags"
        aria-modal="true"
        @keydown=${this.onPanelKeyDown}
      >
        <div class="header">
          <h2 aria-hidden="true">
            ${this.renderFlagIcon()}
            Vibe Flags
            <span class="badge">${this.configs.length}</span>
          </h2>
          <div class="header-actions">
            <button
              class="icon-btn"
              @click=${this.onCopyUrl}
              aria-label=${this.copied ? 'URL copied!' : 'Copy as URL'}
            >
              ${this.copied ? this.renderCheckIcon() : this.renderLinkIcon()}
            </button>
            <button
              class="icon-btn"
              @click=${this.toggleTheme}
              aria-label=${this.darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              ${this.darkMode ? this.renderSunIcon() : this.renderMoonIcon()}
            </button>
            <button
              class="icon-btn"
              @click=${this.toggle}
              aria-label="Close feature flags panel"
            >
              ${this.renderCloseIcon()}
            </button>
          </div>
        </div>

        <div class="flags" role="list" aria-label="Feature flags list">
          ${this.configs.length === 0
            ? html`<div class="empty">No flags configured</div>`
            : this.configs.map((config) =>
                config.type === 'boolean'
                  ? this.renderBooleanFlag(config)
                  : this.renderSelectFlag(config)
              )}
        </div>

        <div class="footer">
          <button
            class="reset-btn"
            @click=${this.onReset}
            aria-label="Reset all flags to defaults"
          >
            Reset all to defaults
          </button>
        </div>
      </div>

      <div class="sr-only" aria-live="polite" aria-atomic="true">${this.liveMessage}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vibe-toolbar': VibeToolbar;
  }
}
