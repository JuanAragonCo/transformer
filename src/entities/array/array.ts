import { ValueNotFoundError } from "../../errors";
import { ExtractEntity } from "../base";
import { IConfig } from "../config";

export class ArrayEntity<T> extends ExtractEntity<T[]> {
  constructor(
    private readonly entity: ExtractEntity<T> | undefined,
    public readonly config: IConfig<T[]>,
  ) {
    super(config.key, config);
  }

  normalize(value: unknown): T[] {
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (this.entity) {
          const [value, shouldNormalize] = this.entity.extract(item);
          if (shouldNormalize) {
            return this.entity.normalize(value) as T;
          } else {
            return value as T;
          }
        } else {
          return item as T;
        }
      });
    } else {
      throw new ValueNotFoundError(this.key, "array");
    }
  }

  transform(value: unknown) {
    const [extractedValue, shouldNormalize] = this.extract(value as T[]);
    if (extractedValue === null || extractedValue === undefined)
      throw new ValueNotFoundError(this.key, "ArrayEntity");
    if (shouldNormalize) {
      return this.normalize(extractedValue);
    } else {
      return extractedValue;
    }
  }
}
