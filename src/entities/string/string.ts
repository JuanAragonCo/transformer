import { ExtractEntity } from "../base";

export class StringEntity extends ExtractEntity<string> {
  normalize(value: unknown): string {
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  }
}
