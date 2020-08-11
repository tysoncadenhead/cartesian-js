export const handle = (promise: Promise<any>) =>
  promise
    .then((data) => [data, undefined])
    .catch((error) =>
      Promise.resolve([
        undefined,
        error.message === "[object Object]" ? {} : error,
      ])
    );
