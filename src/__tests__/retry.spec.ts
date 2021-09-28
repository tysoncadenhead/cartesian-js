import { handle, retry } from "../";

describe("retry", () => {
  it("Should retry three times and then fail", async () => {
    let tries = 0;

    const [error] = await handle(
      retry(
        () => {
          tries++;
          return Promise.reject("no");
        },
        {
          attempts: 3,
        }
      )(null)
    );

    expect(tries).toEqual(3);
    expect(error).toEqual("no");
  });

  it("Should succeed", async () => {
    let tries = 0;

    const [, data] = await handle(
      retry(
        () => {
          tries++;
          return Promise.resolve("yes");
        },
        {
          attempts: 3,
        }
      )(null)
    );

    expect(tries).toEqual(1);
    expect(data).toEqual("yes");
  });

  it("Should succeed after failing a couple times", async () => {
    let tries = 0;

    const [, data] = await handle<string, string>(
      retry<null, string>(
        () => {
          tries++;
          if (tries < 3) {
            return Promise.reject("no");
          }
          return Promise.resolve("yes");
        },
        {
          attempts: 3,
        }
      )(null)
    );

    expect(tries).toEqual(3);
    expect(data).toEqual("yes");
  });
});
