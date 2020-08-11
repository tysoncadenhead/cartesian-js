export const pipe = (...fns) => async (arg?: any): Promise<any> =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
