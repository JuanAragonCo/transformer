import { ValueNotFoundError } from "../../errors";
import { IConfig } from "../config";

export type TransformDTO = Record<string, ExtractEntity<unknown>>;
export abstract class Entity<T> {
  constructor(
    protected readonly key: string | null | undefined,
    public readonly config: IConfig<T>,
  ) {}

  abstract normalize(value: unknown): T;
}

export class ExtractEntity<T> extends Entity<T> {
  static KEY_SEPARATOR = ".";

  extract(data: unknown): [T | undefined | null, boolean] {
    if (this.key === undefined || this.key === null || this.key === "")
      return [data as T, true];
    const keys = this.key.split(ExtractEntity.KEY_SEPARATOR);

    let obj: unknown = data;
    let i = 0;
    let key = keys[i];
    while (typeof obj === "object" && obj && key) {
      obj = obj[key as keyof typeof obj];
      ++i;
      key = keys[i];
    }
    if (obj === undefined || obj === null) {
      if (this.config.defaultValue !== undefined) {
        return [this.config.defaultValue, false] as const;
      } else {
        throw new ValueNotFoundError(this.key, String(data));
      }
    } else {
      return [obj as T, true];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Unimplemented
  normalize(_value: unknown): T {
    throw new Error("Unimplemented");
  }
}
