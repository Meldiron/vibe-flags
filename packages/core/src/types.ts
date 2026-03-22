export interface FlagConfigBoolean {
  key: string;
  type: 'boolean';
  label?: string;
  default?: boolean;
}

export interface FlagConfigSelect {
  key: string;
  type: 'select';
  options: string[];
  label?: string;
}

export type FlagConfig = FlagConfigBoolean | FlagConfigSelect;

export type FlagValue = boolean | string;

export interface FlagState {
  [key: string]: FlagValue;
}
