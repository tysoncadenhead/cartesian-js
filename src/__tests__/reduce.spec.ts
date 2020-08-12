import { reduce } from "../";

describe("reduce", () => {
  it("Should reduce over any array and call an async function", async () => {
    const six = await reduce((prev, x) => {
      return Promise.resolve(prev + x);
    }, 0)([1, 2, 3]);

    expect(six).toBe(6);
  });

  it("Should be possible to build an array response", async () => {
    const [six, seven] = await reduce((prev, x) => {
      return Promise.resolve([...prev, x + 5]);
    }, [])([1, 2]);

    expect(six).toBe(6);
    expect(seven).toBe(7);
  });
});
