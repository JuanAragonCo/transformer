import { t } from "../..";

describe("object transformer", () => {
  it("transforms a nested object", () => {
    const transformer = t.object({
      user: t.object(
        {
          firstName: t.string("fname"),
          lastName: t.string("lname", { defaultValue: "" }),
          age: t.number("age"),
        },
        { key: "data" },
      ),
    });

    const result = transformer.transform({
      data: {
        fname: "John",
        age: "23",
      },
    });

    expect(result).toStrictEqual({
      user: {
        firstName: "John",
        lastName: "",
        age: 23,
      },
    });
  });

  it("transforms array nested array object", () => {
    const transformer = t.object({
      results: t.array(
        t.object({
          value: t.number("value"),
        }),
        { key: "data" },
      ),
    });

    const result = transformer.transform({
      data: [
        {
          value: 23,
        },
        {
          value: "25",
        },
        {
          value: 52,
        },
      ],
    });

    expect(result).toStrictEqual({
      results: [
        {
          value: 23,
        },
        {
          value: 25,
        },
        {
          value: 52,
        },
      ],
    });
  });

  it("transforms array object", () => {
    const transformer = t.array(
      t.object({
        value: t.number("value"),
      }),
    );

    const result = transformer.transform([
      {
        value: 23,
      },
      {
        value: "25",
      },
      {
        value: 52,
      },
    ]);

    expect(result).toStrictEqual([
      {
        value: 23,
      },
      {
        value: 25,
      },
      {
        value: 52,
      },
    ]);
  });

  it("transforms array into object", () => {
    const transformer = t.object({
      items: t.array(
        t.object({
          value1: t.string("value_one"),
          value2: t.number("value_two"),
        }),
      ),
    });

    const result = transformer.transform([
      {
        value_one: 1,
        value_two: 2,
      },
      {
        value_one: 2,
        value_two: 3,
      },
      {
        value_one: 4,
        value_two: 5,
      },
    ]);

    expect(result).toStrictEqual({
      items: [
        {
          value1: "1",
          value2: 2,
        },
        {
          value1: "2",
          value2: 3,
        },
        {
          value1: "4",
          value2: 5,
        },
      ],
    });
  });
});
