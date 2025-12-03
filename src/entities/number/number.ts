import { ExtractEntity } from "../base";

export class NumberEntity extends ExtractEntity<number> {
  normalize(value: unknown): number {
    return Number(value);
  }
}
