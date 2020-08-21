interface RetryOptions {
  attempts: number;
}

type PromiseFunction = (data: any) => Promise<any>;

const attempt = (
  attemptNumber: number,
  fn: PromiseFunction,
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

export const retry = (fn: PromiseFunction, options: RetryOptions) => async (
  data
) => attempt(1, fn, options, data);

export default retry;
