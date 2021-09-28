import { handle, sleep, timeout } from "../";

describe("timeout", () => {
  it("Should timeout after a second", async () => {
    const [error, result] = await handle(
      timeout(
        sleep({
          timeout: 100,
        }),
        {
          timeout: 50,
        }
      )({})
    );

    expect(result).toBeFalsy();
    expect(error).toEqual("Timed out");
  });

  it("Should accept a custom error message", async () => {
    const [error, result] = await handle(
      timeout(
        sleep({
          timeout: 100,
        }),
        {
          timeout: 50,
          errorMessage: "How did it get so late so soon?”",
        }
      )({})
    );

    expect(result).toBeFalsy();
    expect(error).toEqual("How did it get so late so soon?”");
  });

  it("Should not throw an error if it resolves before timing out", async () => {
    const [error, result] = await handle<string, string>(
      timeout<string, string>(
        sleep({
          timeout: 50,
        }),
        {
          timeout: 100,
        }
      )("Yay")
    );

    expect(error).toBeFalsy();
    expect(result).toEqual("Yay");
  });
});
