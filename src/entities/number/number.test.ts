import { t } from "../..";

describe("number transformer", () => {
  it("returns NaN when is not a number", () => {
    const transformer = t.object({
      value: t.number("someValue"),
    });

    const result = transformer.transform({
      someValue: "Some Value",
    });

    expect(result.value).toBeNaN();
  });

  it("returns number when available", () => {
    const transformer = t.object({
      value: t.number("someValue"),
    });

    const result = transformer.transform({
      someValue: 23,
    });

    expect(result.value).toBe(23);
  });
  it("returns NaN when undefined or null", () => {
    const transformer = t.object({
      missingValue: t.number("missing", { defaultValue: NaN }),
      nullishValue: t.number("nullish", { defaultValue: NaN }),
    });

    const result = transformer.transform({
      missing: undefined,
      nullish: null,
    });

    expect(result).toStrictEqual({
      missingValue: NaN,
      nullishValue: NaN,
    });
  });
});
