export const map =
  <Args, T>(fn) =>
  async (args: Args[]): Promise<T[]> =>
    Promise.all(args.map((item) => fn(item)));

export default map;
