import { batch } from "../";

describe("batch", () => {
  it("Should run promises in a batch", async () => {
    const result = await batch(
      (x) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(x);
          }, 10);
        });
      },
      {
        batchSize: 2,
      }
    )([1, 2, 3, 4, 5]);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
