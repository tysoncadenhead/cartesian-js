interface TimeoutOptions {
  timeout: number;
  errorMessage?: string;
}

export const timeout = (
  promise,
  { timeout, errorMessage }: TimeoutOptions
) => async (props) => {
  return new Promise(function (resolve, reject) {
    const timer = setTimeout(() => {
      reject(errorMessage || "Timed out");
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
