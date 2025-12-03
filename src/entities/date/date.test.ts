import dayjs from "dayjs";
import { t } from "../..";

describe("date transformer", () => {
  it("returns a valid dayjs object from string", () => {
    const transformer = t.object({
      value: t.date("value"),
    });

    const result = transformer.transform({
      value: "2022-11-10 10:10",
    });

    const validDate = dayjs("2022-11-10 10:10");

    expect(result.value.isSame(validDate)).toBe(true);
  });

  it("returns null when nullable", () => {
    const transformer = t.object({
      value: t.nullableDate("value"),
    });

    const result = transformer.transform({});

    expect(result.value).toBe(null);
  });
});
