import type { Dayjs } from "dayjs";
import {
  ArrayEntity,
  BooleanEntity,
  ExtractEntity,
  NumberEntity,
  StringEntity,
  DateEntity,
  ObjectEntity,
  TimestampEntity,
} from "./entities";
import {
  commonDefaultConfig,
  defaultNullConfig,
  IConfig,
  INullableConfig,
} from "./entities/config";
import { EnumEntity } from "./entities/enum";

function nullableFn<T>(
  fn: (key: string | undefined, config: IConfig<T>) => ExtractEntity<T>,
) {
  return (key?: string, nullConfig: INullableConfig<T> = defaultNullConfig) => {
    return fn(
      key,
      nullConfig as unknown as IConfig<T>,
    ) as ExtractEntity<T | null>;
  };
}

const transformer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: <I extends Record<string, ExtractEntity<any>>>(
    dto: I,
    config: IConfig<{
      [K in keyof I]: I[K] extends ExtractEntity<infer U> ? U : never;
    }> = commonDefaultConfig,
  ) => {
    const objectEntity = new ObjectEntity<I>(dto, config);
    return objectEntity;
  },
  string: (key?: string, config: IConfig<string> = commonDefaultConfig) => {
    const entity = new StringEntity(config.key || key, config);
    return entity;
  },
  nullableString: (
    key?: string,
    config: INullableConfig<string> = defaultNullConfig,
  ) => nullableFn(transformer.string)(key, config),
  boolean: (key?: string, config: IConfig<boolean> = commonDefaultConfig) => {
    const entity = new BooleanEntity(config.key || key, config);
    return entity;
  },
  nullableBoolean: (
    key?: string,
    config: INullableConfig<boolean> = defaultNullConfig,
  ) => nullableFn(transformer.boolean)(key, config),
  array: <T>(
    e: ExtractEntity<T> | null,
    config: IConfig<T[]> = commonDefaultConfig,
  ) => {
    const entity = new ArrayEntity(e ? e : undefined, config);
    return entity;
  },
  number: (key?: string, config: IConfig<number> = commonDefaultConfig) => {
    const entity = new NumberEntity(config.key || key, config);
    return entity;
  },
  nullableNumber: (
    key?: string,
    config: INullableConfig<number> = defaultNullConfig,
  ) => nullableFn(transformer.number)(key, config),
  date: (key?: string, config: IConfig<Dayjs> = commonDefaultConfig) => {
    const entity = new DateEntity(config.key || key, config);
    return entity;
  },
  nullableDate: (
    key?: string,
    config: INullableConfig<Dayjs> = defaultNullConfig,
  ) => nullableFn(transformer.date)(key, config),
  timestamp: (key?: string, config: IConfig<number> = commonDefaultConfig) => {
    const entity = new TimestampEntity(config.key || key, config);
    return entity;
  },
  nullableTimestamp: (
    key?: string,
    config: INullableConfig<number> = defaultNullConfig,
  ) => nullableFn(transformer.timestamp)(key, config),
  enum: <T extends { [K: string]: string | number }>(
    key: string | null,
    enumObject: T,
    config: IConfig<T[keyof T]> = commonDefaultConfig,
  ) => {
    return new EnumEntity(key ? key : "", config, enumObject);
  },
  nullableEnum: <T extends Record<string, string | number>>(
    key: string | null,
    enumObject: T,
    config: INullableConfig<T[keyof T]> = defaultNullConfig,
  ) => {
    return transformer.enum(
      key,
      enumObject,
      config as unknown as IConfig<T[keyof T]>,
    ) as ExtractEntity<T[keyof T] | null>;
  },
};

export { transformer as t };
