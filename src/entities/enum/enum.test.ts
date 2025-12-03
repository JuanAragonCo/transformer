import { t } from "../..";
import { ValueNotFoundError } from "../../errors";
import { InvalidEnumError } from "./errors";

describe("Enum transformer", () => {
  it("returns enum with dict object", () => {
    const pseudoEnum = {
      red: "red",
      green: "green",
      blue: "blue",
    } as const;

    const transformer = t.object({
      value: t.enum("value", pseudoEnum),
    });
    const { value } = transformer.transform({
      value: "red",
    });

    expect(value).toBe("red");
  });
  it("returns enum from number", () => {
    enum Status {
      Success,
      Error,
      Fail,
    }

    const transformer = t.object({
      value: t.enum("value", Status),
    });

    const { value } = transformer.transform({ value: 0 });

    expect(value).toBe(Status.Success);
  });
  it("returns defaultValue if not valid", () => {
    enum Colors {
      RED = "red",
      GREEN = "green",
      BLUE = "blue",
    }

    const transformer = t.object({
      value: t.enum("value", Colors, { defaultValue: Colors.RED }),
    });

    const { value } = transformer.transform({
      value: "invalidValue",
    });

    expect(value).toBe(Colors.RED);
  });
  it("extracts enum from string", () => {
    enum Colors {
      RED = "red",
      GREEN = "green",
      BLUE = "blue",
    }

    const transformer = t.object({
      value: t.enum("value", Colors),
    });

    const { value } = transformer.transform({
      value: "green",
    });

    expect(value).toBe(Colors.GREEN);
  });
  it("extracts null when invalid value", () => {
    enum Colors {
      RED = "red",
      GREEN = "green",
      BLUE = "blue",
    }

    const transformer = t.object({
      value: t.nullableEnum("value", Colors),
    });

    const { value } = transformer.transform({
      value: "yellow",
    });

    expect(value).toBe(null);
  });
  it("throws error when invalid value", () => {
    expect(() => {
      enum Colors {
        RED = "red",
        GREEN = "green",
        BLUE = "blue",
      }

      const transformer = t.object({
        value: t.enum("value", Colors),
      });

      transformer.transform({
        value: "yellow",
      });
    }).toThrow(InvalidEnumError);
  });
  it("throws error when not found", () => {
    expect(() => {
      enum Colors {
        RED = "red",
        GREEN = "green",
        BLUE = "blue",
      }

      const transformer = t.object({
        value: t.enum("value", Colors),
      });

      transformer.transform({});
    }).toThrow(ValueNotFoundError);
  });
  it("parses enum from array", () => {
    enum Colors {
      RED = "r",
      GREEN = "g",
      BLUE = "b",
    }

    const transformer = t.object({
      colors: t.array(t.enum(null, Colors)),
    });

    const { colors } = transformer.transform(["r", "g", "b"]);
    expect(colors).toStrictEqual([Colors.RED, Colors.GREEN, Colors.BLUE]);
  });
  it("parses enum from nested array", () => {
    enum Colors {
      RED = "r",
      GREEN = "g",
      BLUE = "b",
    }

    const transformer = t.object({
      colors: t.array(t.enum(null, Colors), { key: "result" }),
    });

    const { colors } = transformer.transform({ result: ["r", "g", "b"] });
    expect(colors).toStrictEqual([Colors.RED, Colors.GREEN, Colors.BLUE]);
  });
});
