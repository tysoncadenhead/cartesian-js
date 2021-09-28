import { handleCompose } from "../";

describe("handleCompose", () => {
  it("Should compose from left to right", async () => {
    const [error, result] = await handleCompose(
      (x) => Promise.resolve(`${x}!`),
      (x) => Promise.resolve(x * 3),
      (x) => Promise.resolve(x + 2)
    )(3);

    expect(error).toBe(undefined);
    expect(result).toEqual(`15!`);
  });

  it("Should handle errors", async () => {
    const [error, result] = await handleCompose(() =>
      Promise.reject(`error`)
    )();

    expect(error).toBe("error");
    expect(result).toEqual(undefined);
  });

  it("Should allow generic types", async () => {
    const [error, result] = await handleCompose<number, string, string>(
      (x) => Promise.resolve(`${x}!`),
      (x) => Promise.resolve(x * 3),
      (x) => Promise.resolve(x + 2)
    )(3);

    expect(error).toBe(undefined);
    expect(result).toEqual(`15!`);
  });
});
