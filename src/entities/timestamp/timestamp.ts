import { ExtractEntity } from "../base";
import dayjs from "dayjs";

export class TimestampEntity extends ExtractEntity<number> {
  normalize(value: unknown): number {
    return dayjs(value as string).unix();
  }
}
