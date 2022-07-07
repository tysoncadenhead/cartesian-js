interface TimeoutOptions {
  timeout: number;
  errorMessage?: string;
}

export const timeout =
  <Args, T>({timeout, errorMessage}: TimeoutOptions) =>
  (promise) =>
  async (props: Args): Promise<T> => {
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(() => {
        reject(errorMessage || 'Timed out');
      }, timeout);

      promise(props)
        .then(function (res) {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(function (err) {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

export default timeout;
