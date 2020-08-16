export const reduce = (fn, initialValue) => async (args): Promise<any> =>
  args.reduce(
    (prev, arg) => prev.then((prevValue) => fn(prevValue, arg)),
    Promise.resolve(initialValue)
  );

export default reduce;
