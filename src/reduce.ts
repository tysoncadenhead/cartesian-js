export const reduce =
  <T>(fn, initialValue: T) =>
  async (args): Promise<T> =>
    args.reduce(
      (prev, arg) => prev.then((prevValue) => fn(prevValue, arg)),
      Promise.resolve(initialValue)
    );

export default reduce;
