import { t } from "../..";

describe("timestamp transformer", () => {
  it("returns a valid timestamp", () => {
    const transformer = t.object({
      value: t.timestamp("date"),
    });

    const result = transformer.transform({
      date: "2022-10-18T12:30:02Z",
    });

    expect(result.value).toBe(1666096202);
  });

  it("returns null when nullable", () => {
    const transformer = t.object({
      value: t.nullableTimestamp("date"),
    });

    const result = transformer.transform({});
    expect(result.value).toBe(null);
  });
});
