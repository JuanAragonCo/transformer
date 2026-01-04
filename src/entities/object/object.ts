import { ValueNotFoundError } from "../../errors";
import { ExtractEntity } from "../base";
import { IConfig } from "../config";

export type Output<I> = {
  [K in keyof I]: I[K] extends ExtractEntity<infer U> ? U : never;
};

export class ObjectEntity<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Input extends Record<string, ExtractEntity<any>>,
  O = Output<Input>,
> extends ExtractEntity<O> {
  constructor(
    private readonly dto: Input,
    config: IConfig<O>,
  ) {
    super(config.key, config);
  }

  normalize(value: unknown): O {
    if (value === undefined || value === null || typeof value !== "object")
      throw new ValueNotFoundError(this.key, "ObjectEntity");

    const entries = Object.entries(this.dto);

    const normalizedEntries = entries.map(([key, entity]) => {
      if (entity instanceof ExtractEntity) {
        const [extractedData, shouldNormalize] = entity.extract(value);
        if (shouldNormalize) {
          return [key, entity.normalize(extractedData)];
        } else {
          return [key, extractedData];
        }
      } else {
        return [key, value];
      }
    });

    return Object.fromEntries(normalizedEntries) as O;
  }

  transform(data: unknown): O {
    const [extractedData, shouldNormalize] = this.extract(data);
    if (extractedData === undefined)
      throw new ValueNotFoundError(this.key, "ObjectEntity");
    if (shouldNormalize) {
      return this.normalize(extractedData);
    } else {
      return extractedData as O;
    }
  }
}
