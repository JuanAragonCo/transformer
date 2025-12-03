type TransformFn<T> = (input: T) => T;

interface ICommonConfig<T> {
  key?: string;
  transformations?: ReadonlyArray<TransformFn<T>>;
}

export interface IConfig<T> extends ICommonConfig<T> {
  defaultValue?: T;
}

export interface INullableConfig<T> extends ICommonConfig<T> {
  defaultValue?: T | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commonDefaultConfig: ICommonConfig<any> = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultNullConfig: INullableConfig<any> = { defaultValue: null };
