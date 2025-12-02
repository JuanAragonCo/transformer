import { ValueNotFoundError } from "../../errors";
import { ExtractEntity } from "../base";
import { IConfig } from "../config";

type Output<I> = {
  [K in keyof I]: I[K] extends ExtractEntity<infer U> ? U : never;
};

export class ObjectEntity<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Input extends Record<string, ExtractEntity<any>>,
> extends ExtractEntity<Output<Input>> {
  constructor(
    private readonly dto: Input,
    config: IConfig<Output<Input>>,
  ) {
    super(config.key, config);
  }

  normalize(value: unknown): Output<Input> {
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

    return Object.fromEntries(normalizedEntries) as Output<Input>;
  }

  transform(data: unknown) {
    const [extractedData, shouldNormalize] = this.extract(data);
    if (extractedData === undefined || extractedData === null)
      throw new ValueNotFoundError(this.key, "ObjectEntity");
    if (shouldNormalize) {
      return this.normalize(extractedData);
    } else {
      return extractedData;
    }
  }
}
