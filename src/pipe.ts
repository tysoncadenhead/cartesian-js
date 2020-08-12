export const pipe = (...fns) => async (arg?: any): Promise<any> =>
  fns.reduce((prev, fn) => prev.then(fn), Promise.resolve(arg));
