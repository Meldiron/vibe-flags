export interface VibeFlagsConfigBoolean {
  key: string;
  type: "boolean";
  label?: string;
  default?: boolean;
}

export interface VibeFlagsConfigSelect {
  key: string;
  type: "select";
  options: string[];
  label?: string;
  default?: string;
}

export type VibeFlagsConfig = VibeFlagsConfigBoolean | VibeFlagsConfigSelect;

export type VibeFlagsValue = boolean | string;

export interface VibeFlagsState {
  [key: string]: VibeFlagsValue;
}
