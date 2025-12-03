import { ExtractEntity } from "../base";
import dayjs from "dayjs";

export class DateEntity extends ExtractEntity<dayjs.Dayjs> {
  normalize(value: unknown): dayjs.Dayjs {
    return dayjs(value as string);
  }
}
