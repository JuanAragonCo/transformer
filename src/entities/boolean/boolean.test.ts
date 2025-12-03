import { t } from "../..";

describe("boolean transformer", () => {
  it("returns falsy values as false", () => {
    const transformer = t.object({
      nullish: t.boolean("nullValue", { defaultValue: false }),
      notDefined: t.boolean("undefinedValue", { defaultValue: false }),
      zero: t.boolean("zero", { defaultValue: false }),
      emptyString: t.boolean("stringValue", { defaultValue: false }),
      boolean: t.boolean("boolean", { defaultValue: false }),
    });

    const result = transformer.transform({
      nullValue: null,
      undefinedValue: undefined,
      zero: 0,
      stringValue: "",
      boolean: false,
    });

    expect(result).toStrictEqual({
      nullish: false,
      notDefined: false,
      zero: false,
      emptyString: false,
      boolean: false,
    });
  });

  it("returns truthy values as true", () => {
    const transformer = t.object({
      someString: t.boolean("someString"),
      boolean: t.boolean("boolean"),
    });

    const result = transformer.transform({
      someString: "Some String",
      boolean: true,
    });

    expect(result).toStrictEqual({
      someString: true,
      boolean: true,
    });
  });

  it("returns false if is a falsy string", () => {
    const transformer = t.object({
      string1: t.boolean("string1"),
      string2: t.boolean("string2"),
      string3: t.boolean("string3"),
      string4: t.boolean("string4"),
    });

    const result = transformer.transform({
      string1: "false",
      string2: "FALSE",
      string3: "False",
      string4: " false ",
    });

    expect(result).toStrictEqual({
      string1: false,
      string2: false,
      string3: false,
      string4: false,
    });
  });

  it("returns null when nullable", () => {
    const transformer = t.object({
      value: t.nullableBoolean("value"),
    });

    const result = transformer.transform({});
    expect(result.value).toBe(null);
  });
});
