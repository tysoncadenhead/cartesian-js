export const pipe = (...fns) => (arg: any): Promise<any> =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
