import { ExtractEntity } from "../base";

export class BooleanEntity<O = boolean> extends ExtractEntity<boolean | O> {
  normalize(value: unknown): boolean {
    if (typeof value === "string" && value !== "") {
      const nValue = value.toLowerCase().trim();
      return nValue !== "false";
    }
    return Boolean(value);
  }
}
