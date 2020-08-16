import { timeout, handle, sleep } from "../";

describe("timeout", () => {
  it("Should timeout after a second", async () => {
    const [error, result] = await handle(
      timeout(
        {
          wait: 50,
        },
        sleep(100)
      )({})
    );

    expect(result).toBeFalsy();
    expect(error).toEqual("Timed out");
  });

  it("Should accept a custom error message", async () => {
    const [error, result] = await handle(
      timeout(
        {
          wait: 50,
          errorMessage: "How did it get so late so soon?”",
        },
        sleep(100)
      )({})
    );

    expect(result).toBeFalsy();
    expect(error).toEqual("How did it get so late so soon?”");
  });

  it("Should not throw an error if it resolves before timing out", async () => {
    const [error, result] = await handle(
      timeout(
        {
          wait: 100,
        },
        sleep(50)
      )("Yay")
    );

    expect(error).toBeFalsy();
    expect(result).toEqual("Yay");
  });
});
