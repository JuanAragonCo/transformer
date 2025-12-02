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
});
