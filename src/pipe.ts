export const pipe =
  <Args, T>(...fns) =>
  async (arg?: Args): Promise<T> =>
    fns.reduce((prev, fn) => prev.then(fn), Promise.resolve(arg));

export default pipe;
