import { handle } from "../";

interface ISuccess {
  foo: string;
}

interface IError {
  message: string;
}

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

  it("Should resolve a nested object", async () => {
    const myPromise = () =>
      Promise.resolve({
        foo: "Bar",
      });

    const [error, result] = await handle<ISuccess, IError>(myPromise());

    expect(error).toBe(undefined);
    expect(result.foo).toEqual("Bar");
  });

  it("Should reject a nested objects", async () => {
    const myPromise = () =>
      Promise.reject({
        message: "Error",
      });

    const [error, result] = await handle<ISuccess, IError>(myPromise());

    expect(result).toBe(undefined);
    expect(error.message).toEqual("Error");
  });
});
