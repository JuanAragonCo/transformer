interface ICommonConfig {
  key?: string;
}

export interface IConfig<T> extends ICommonConfig {
  defaultValue?: T;
}

export interface INullableConfig<T> extends ICommonConfig {
  defaultValue?: T | null;
}

export const commonDefaultConfig: ICommonConfig = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultNullConfig: INullableConfig<any> = { defaultValue: null };
