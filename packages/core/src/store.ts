import type { VibeFlagsConfig, VibeFlagsValue, VibeFlagsState } from "./types.js";

const NAMESPACE = 'vibe-flags:';
const URL_NAMESPACE = 'vf:';

function getInitialValue(config: VibeFlagsConfig): VibeFlagsValue {
  if (config.type === "boolean") return config.default ?? false;
  if (config.default && config.options.includes(config.default)) return config.default;
  return config.options[0] || "";
}

class VibeFlagsStore extends EventTarget {
  private configs = new Map<string, VibeFlagsConfig>();
  private state: VibeFlagsState = {};
  private listening = false;

  private readFromUrl(config: VibeFlagsConfig): VibeFlagsValue | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(URL_NAMESPACE + config.key);
    if (raw === null) return null;
    if (config.type === 'boolean') {
      if (raw === 'true') return true;
      if (raw === 'false') return false;
      return null;
    }
    if (config.type === 'select') {
      if (config.options.includes(raw)) return raw;
      return null;
    }
    return null;
  }

  register(config: VibeFlagsConfig): void {
    this.configs.set(config.key, config);
    const initial = getInitialValue(config);
    const urlValue = this.readFromUrl(config);
    if (urlValue !== null) {
      // URL params take priority and are ephemeral (not written to localStorage)
      this.state[config.key] = urlValue;
    } else {
      const stored = this.readFromStorage(config.key);
      // Only use stored value if it's valid for this config
      const isValid = stored !== null && (
        (config.type === 'boolean' && typeof stored === 'boolean') ||
        (config.type === 'select' && typeof stored === 'string' && config.options.includes(stored))
      );
      this.state[config.key] = isValid ? stored : initial;
    }

    if (!this.listening) {
      this.listening = true;
      if (typeof window !== "undefined") {
        window.addEventListener("storage", this.onStorageEvent);
      }
    }

    this.dispatch(config.key);
  }

  unregister(key: string): void {
    this.configs.delete(key);
    delete this.state[key];
    this.dispatch();
  }

  get(key: string): VibeFlagsValue | undefined {
    return this.state[key];
  }

  set(key: string, value: VibeFlagsValue): void {
    const config = this.configs.get(key);
    if (!config) return;

    if (config.type === "boolean" && typeof value !== "boolean") return;
    if (config.type === "select") {
      if (typeof value !== "string") return;
      if (!config.options.includes(value)) return;
    }

    this.state[key] = value;
    this.writeToStorage(key, value);
    this.dispatch(key);
  }

  getAll(): VibeFlagsState {
    return { ...this.state };
  }

  getConfig(): VibeFlagsConfig[] {
    return Array.from(this.configs.values());
  }

  getConfigForKey(key: string): VibeFlagsConfig | undefined {
    return this.configs.get(key);
  }

  reset(): void {
    for (const [key, config] of this.configs) {
      this.state[key] = getInitialValue(config);
      this.removeFromStorage(key);
    }
    this.dispatch();
  }

  private readFromStorage(key: string): VibeFlagsValue | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(NAMESPACE + key);
      if (raw === null) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private writeToStorage(key: string, value: VibeFlagsValue): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
    } catch {
      // localStorage full or unavailable
    }
  }

  private removeFromStorage(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(NAMESPACE + key);
    } catch {
      // ignore
    }
  }

  private dispatch(key?: string): void {
    const detail = { key, state: this.getAll() };
    const event = new CustomEvent("vibe-flags-changed", {
      detail,
      bubbles: true,
    });
    this.dispatchEvent(event);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vibe-flags-changed", { detail }));
    }
  }

  private onStorageEvent = (e: StorageEvent): void => {
    if (!e.key?.startsWith(NAMESPACE)) return;
    const flagKey = e.key.slice(NAMESPACE.length);
    const config = this.configs.get(flagKey);
    if (!config) return;

    try {
      const value = e.newValue ? JSON.parse(e.newValue) : getInitialValue(config);
      this.state[flagKey] = value;
      this.dispatch(flagKey);
    } catch {
      // ignore malformed data
    }
  };
}

export const vibeFlagsStore = new VibeFlagsStore();
