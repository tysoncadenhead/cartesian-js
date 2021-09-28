export const filter =
  (fn) =>
  async (args): Promise<any> =>
    args.reduce(
      (prev, arg) =>
        prev.then(async (prevValue) => {
          const isIncluded = await fn(arg);

          if (isIncluded) {
            return [...prevValue, arg];
          }

          return prevValue;
        }),
      Promise.resolve([])
    );

export default filter;
