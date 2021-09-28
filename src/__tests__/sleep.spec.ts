import { sleep } from "../";

describe("sleep", () => {
  it("Should sleep for a second", async () => {
    let finished = false;

    setTimeout(() => {
      expect(finished).toEqual(false);
    }, 5);

    await sleep({
      timeout: 10,
    })().then(() => {
      finished = true;
    });

    expect(finished).toEqual(true);
  });

  it("Should accept type signatures", async () => {
    let finished = false;

    setTimeout(() => {
      expect(finished).toEqual(false);
    }, 5);

    await sleep<{
      finished: boolean;
    }>({
      timeout: 10,
    })().then(() => {
      finished = true;
    });

    expect(finished).toEqual(true);
  });
});
