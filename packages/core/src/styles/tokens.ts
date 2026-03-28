import { css } from "lit";

export const tokensDark = css`
  :host {
    --vf-bg: #0a0a0a;
    --vf-bg-muted: #171717;
    --vf-bg-hover: #262626;
    --vf-border: #2e2e2e;
    --vf-text: #fafafa;
    --vf-text-muted: #a3a3a3;
    --vf-primary: #fafafa;
    --vf-primary-fg: #0a0a0a;
    --vf-accent: #818cf8;
    --vf-accent-fg: #ffffff;
    --vf-destructive: #ef4444;
    --vf-radius: 6px;
    --vf-radius-lg: 8px;
    --vf-font:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --vf-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4);
    --vf-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
    --vf-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6);
  }
`;

export const tokensLight = css`
  :host {
    --vf-bg: #ffffff;
    --vf-bg-muted: #f5f5f5;
    --vf-bg-hover: #f0f0f0;
    --vf-border: #e5e5e5;
    --vf-text: #0a0a0a;
    --vf-text-muted: #737373;
    --vf-primary: #171717;
    --vf-primary-fg: #fafafa;
    --vf-accent: #6366f1;
    --vf-accent-fg: #ffffff;
    --vf-destructive: #ef4444;
    --vf-radius: 6px;
    --vf-radius-lg: 8px;
    --vf-font:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --vf-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    --vf-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --vf-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }
`;
