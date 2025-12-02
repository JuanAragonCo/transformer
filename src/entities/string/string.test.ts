import { t } from "../..";
import { ValueNotFoundError } from "../../errors";

describe("string transformer", () => {
  it("returns empty string when undefined", () => {
    const transformer = t.object({
      name: t.string("fullName", { defaultValue: "" }),
    });

    const result = transformer.transform({
      fullName: undefined,
    });

    expect(result).toStrictEqual({ name: "" });
  });

  it("returns empty string when null", () => {
    const transformer = t.object({
      name: t.string("fullName", { defaultValue: "" }),
    });

    const result = transformer.transform({
      fullName: null,
    });

    expect(result).toStrictEqual({ name: "" });
  });

  it("returns empty string when empty string", () => {
    const transformer = t.object({
      name: t.string("fullName"),
    });

    const result = transformer.transform({
      fullName: "",
    });

    expect(result).toStrictEqual({ name: "" });
  });

  it("returns strigified number when number", () => {
    const transformer = t.object({
      age: t.string("age"),
    });

    const result = transformer.transform({
      age: 23,
    });

    expect(result).toStrictEqual({ age: "23" });
  });

  it("returns strigified boolean when boolean", () => {
    const transformer = t.object({
      isVerified: t.string("verified"),
      hasEmail: t.string("hasEmail"),
    });

    const result = transformer.transform({
      verified: false,
      hasEmail: true,
    });

    expect(result).toStrictEqual({ isVerified: "false", hasEmail: "true" });
  });

  it("returns stringified object when array", () => {
    const transformer = t.object({
      values: t.string("values"),
    });

    const result = transformer.transform({
      values: ["one", "two", "three"],
    });

    expect(result).toStrictEqual({
      values: '["one","two","three"]',
    });
  });

  it("returns null when nullable string", () => {
    const transformer = t.object({
      name: t.nullableString("firstName"),
    });

    const result = transformer.transform({
      firstName: undefined,
    });

    expect(result.name).toBe(null);
  });

  it("throws an error if the data does not exist", () => {
    expect(() => {
      const transformer = t.object({
        value: t.string("value"),
      });
      transformer.transform({});
    }).toThrow(ValueNotFoundError);
  });
  it("returns defaultValue when provided", () => {
    const transformer = t.object({
      name: t.string("user.fullName", { defaultValue: "John Doe" }),
    });

    const result = transformer.transform({});

    expect(result.name).toBe("John Doe");
  });
});
