import { t } from "..";

describe("transformer tests", () => {
  it("transforms simple string key", () => {
    const transformer = t.object({
      name: t.string("firstName"),
    });

    const result = transformer.transform({
      firstName: "William",
    });

    expect(result).toStrictEqual({
      name: "William",
    });
  });

  it("transforms recursive string keys", () => {
    const transformer = t.object({
      firstName: t.string("user.firstName"),
      lastName: t.string("user.lastName"),
    });

    const result = transformer.transform({
      user: {
        firstName: "William",
        lastName: "Shakespeare",
      },
    });

    expect(result).toStrictEqual({
      firstName: "William",
      lastName: "Shakespeare",
    });
  });

  it("runs transform fn in extracted data", () => {
    const capitalize = (input: string) => input.toUpperCase();
    const hideUnderage = (age: number) => (age < 18 ? NaN : age);
    const hideNaN = (age: number) => (Number.isNaN(age) ? 18 : age);

    const transformer = t.object({
      firstName: t.string("user.firstName"),
      lastName: t.string("user.lastName", { transformations: [capitalize] }),
      age: t.number("user.age", { transformations: [hideUnderage, hideNaN] }),
    });

    const result = transformer.transform({
      user: {
        firstName: "William",
        lastName: "Shakespeare",
        age: 3,
      },
    });

    expect(result).toStrictEqual({
      firstName: "William",
      lastName: "SHAKESPEARE",
      age: 18,
    });
  });
});
