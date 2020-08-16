import { cancelable, compose, sleep } from "../";

describe("cancelable", () => {
  it("Should allow us to cancel a promise", async () => {
    let called = false;

    const result = cancelable(
      compose((res) => {
        called = true;
        Promise.resolve(res);
      }, sleep(100))
    )();

    result.cancel();

    expect(called).toBe(false);
  });

  it("Should resolve the promise", async () => {
    let called = false;

    await cancelable(
      compose((res) => {
        called = true;
        Promise.resolve(res);
      }, sleep(100))
    )();

    expect(called).toBe(true);
  });
});
