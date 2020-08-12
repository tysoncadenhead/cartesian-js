import { filter } from "../";

describe("filter", () => {
  it("Should filter an array and call a function on each item", async () => {
    const result = await filter((x) => {
      return Promise.resolve(x.includes("hi"));
    })(["hi", "high", "hay"]);

    expect(result).toEqual(["hi", "high"]);
  });
});
