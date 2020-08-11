export const handle = (promise: Promise<any>) =>
  promise
    .then((data) => [undefined, data])
    .catch((error) =>
      Promise.resolve([
        error.message === "[object Object]" ? {} : error,
        undefined,
      ])
    );
