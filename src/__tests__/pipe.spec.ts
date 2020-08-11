import { pipe } from "../";

describe("pipe", () => {
  it("Should pipe from left to right", async () => {
    const result = await pipe(
      (x) => Promise.resolve(x + 2),
      (x) => Promise.resolve(x * 3),
      (x) => Promise.resolve(`${x}!`)
    )(3);

    expect(result).toEqual(`15!`);
  });
});
