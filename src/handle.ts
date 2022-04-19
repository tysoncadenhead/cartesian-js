export const handle = <T, E>(promise: Promise<unknown>): Promise<[E, T]> =>
  promise
    .then((data) => [undefined, data])
    .catch((error) =>
      Promise.resolve([
        error.message === '[object Object]' ? {} : error?.message || error,
        undefined,
      ]),
    ) as Promise<[E, T]>;

export default handle;
