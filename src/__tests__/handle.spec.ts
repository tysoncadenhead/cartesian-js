import { handle } from "../";

describe("The async error handler", () => {
  it("Should resolve successful results", async () => {
    const myPromise = () => Promise.resolve("Good");

    const [result, error] = await handle(myPromise());

    expect(error).toBe(undefined);
    expect(result).toEqual("Good");
  });

  it("Should resolve unsuccessful results", async () => {
    const myPromise = () => Promise.reject("Bad");

    const [result, error] = await handle(myPromise());

    expect(error).toBe("Bad");
    expect(result).toEqual(undefined);
  });
});
