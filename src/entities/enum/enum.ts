import { ExtractEntity } from "../base";
import { IConfig } from "../config";
import { InvalidEnumError } from "./errors";

export class EnumEntity<
  T extends { [K: string]: string | number },
> extends ExtractEntity<T[keyof T]> {
  constructor(
    key: string,
    config: IConfig<T[keyof T]>,
    private readonly enumObject: T,
  ) {
    super(key, config);
  }

  normalize(value: unknown): T[keyof T] {
    if (typeof value !== "string" && typeof value !== "number")
      if (this.config.defaultValue !== undefined)
        return this.config.defaultValue;
      else throw new InvalidEnumError(value);

    const values = Object.values(this.enumObject);

    if (values.includes(value)) return value as T[keyof T];

    if (this.config.defaultValue !== undefined) return this.config.defaultValue;
    else throw new InvalidEnumError(value);
  }
}
