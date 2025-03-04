export interface ITyperConfig {
  startDelay: number;
  typingSpeedMs: number;
  removerDelayMs: number;
  removerSpeedMs: number;
}

export interface ITyperConfigWithText extends ITyperConfig {
  text: string | string[];
}

export type ComponentInputData =
  | string
  | string[]
  | ITyperConfigWithText
  | ITyperConfigWithText[];

export interface IParsedStringToType {
  text: string;
  config: ITyperConfig;
}
