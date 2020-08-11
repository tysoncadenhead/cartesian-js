import { compose } from "../";

describe("compose", () => {
  it("Should pipe from left to right", async () => {
    const result = await compose(
      (x) => Promise.resolve(`${x}!`),
      (x) => Promise.resolve(x * 3),
      (x) => Promise.resolve(x + 2)
    )(3);

    expect(result).toEqual(`15!`);
  });
});
