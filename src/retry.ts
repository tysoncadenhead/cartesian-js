interface RetryOptions {
  attempts: number;
}

const attempt = <Args, T>(
  attemptNumber: number,
  fn: (data: Args) => Promise<T>,
  options: RetryOptions,
  data
) => {
  return fn(data).catch((err) => {
    if (attemptNumber < options.attempts) {
      return attempt(attemptNumber + 1, fn, options, data);
    }

    return Promise.reject(err);
  });
};

export const retry =
  <Args, T>(fn: (data: Args) => Promise<T>, options: RetryOptions) =>
  async (data) =>
    attempt<Args, T>(1, fn, options, data);

export default retry;
