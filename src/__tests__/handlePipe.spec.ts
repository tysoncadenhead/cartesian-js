import { handlePipe } from "../";

describe("handlePipe", () => {
  it("Should pipe from left to right", async () => {
    const [error, result] = await handlePipe(
      (x) => Promise.resolve(x + 2),
      (x) => Promise.resolve(x * 3),
      (x) => Promise.resolve(`${x}!`)
    )(3);

    expect(error).toBe(undefined);
    expect(result).toEqual(`15!`);
  });

  it("Should handle errors", async () => {
    const [error, result] = await handlePipe<number, string, string>(() =>
      Promise.reject(`error`)
    )();

    expect(error).toEqual("error");
    expect(result).toEqual(undefined);
  });
});
