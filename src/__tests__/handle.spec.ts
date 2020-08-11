import { handle, compose } from "../";
import { pipe } from "../pipe";

describe("The async error handler", () => {
  it("Should resolve successful results", async () => {
    const myPromise = () => Promise.resolve("Good");

    const [error, result] = await handle(myPromise());

    expect(error).toBe(undefined);
    expect(result).toEqual("Good");
  });

  it("Should resolve unsuccessful results", async () => {
    const myPromise = () => Promise.reject("Bad");

    const [error, result] = await handle(myPromise());

    expect(error).toBe("Bad");
    expect(result).toEqual(undefined);
  });
});
