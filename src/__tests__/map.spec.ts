import { handleCompose, handlePipe, map } from "../";

describe("map", () => {
  it("Should map over an array and call a function on each item", async () => {
    const [three, four, five] = await map((x) => {
      return Promise.resolve(x + 2);
    })([1, 2, 3]);

    expect(three).toBe(3);
    expect(four).toBe(4);
    expect(five).toBe(5);
  });

  it("Should handle mapping errors", async () => {
    const [error] = await handleCompose(
      map((x) => {
        return Promise.reject(x * 2);
      })
    )([2]);

    expect(error).toBe(4);
  });
});
