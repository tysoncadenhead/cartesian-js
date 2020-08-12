export const map = (fn) => async (args): Promise<any> =>
  Promise.all(args.map((item) => fn(item)));
