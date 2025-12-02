import { t } from "../..";
import { ValueNotFoundError } from "../../errors";

describe("array transformer", () => {
  it("returns an array when array", () => {
    const transformer = t.object({
      items: t.array(null, { key: "values" }),
    });

    const result = transformer.transform({
      values: ["1", "2", false],
    });

    expect(result).toStrictEqual({
      items: ["1", "2", false],
    });
  });

  it("returns a formatted array when entity provided", () => {
    const transformer = t.object({
      items: t.array(t.string(""), { key: "values" }),
    });

    const result = transformer.transform({
      values: ["1", "2", false],
    });

    expect(result).toStrictEqual({
      items: ["1", "2", "false"],
    });
  });
  it("returns string array from object array", () => {
    const transformer = t.object({
      names: t.array(t.string("fullName"), { key: "users" }),
    });

    const result = transformer.transform({
      users: [
        { fullName: "John" },
        { fullName: "Will" },
        { fullName: "Sarah" },
      ],
    });

    expect(result).toStrictEqual({
      names: ["John", "Will", "Sarah"],
    });
  });
  it("returns nullable array if nullable", () => {
    const transformer = t.object({
      names: t.array(t.nullableString("fullName")),
    });

    const result = transformer.transform([
      {
        fullName: "John",
      },
      {
        fullName: "Doe",
      },
      {},
    ]);

    expect(result).toStrictEqual({
      names: ["John", "Doe", null],
    });
  });
  it("throws error if element is not valid", () => {
    expect(() => {
      const transformer = t.object({
        names: t.array(t.string("fullName")),
      });

      transformer.transform([
        {
          fullName: "John",
        },
        {
          fullName: "Doe",
        },
        {},
      ]);
    }).toThrow(ValueNotFoundError);
  });

  it("transforms simple array", () => {
    const transformer = t.array(t.string());

    const result = transformer.transform(["1", 2, false]);
    expect(result).toStrictEqual(["1", "2", "false"]);
  });

  it("transforms nested object into simple array", () => {
    const transformer = t.array(t.string("name"));

    const result = transformer.transform([
      { name: "John" },
      { name: "Jennifer" },
      { name: "Doe" },
    ]);

    expect(result).toStrictEqual(["John", "Jennifer", "Doe"]);
  });
});
