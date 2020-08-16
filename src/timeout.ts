interface TimeoutOptions {
  wait: number;
  errorMessage?: string;
}

export const timeout = (
  { wait, errorMessage }: TimeoutOptions,
  promise
) => async (props) => {
  return new Promise(function (resolve, reject) {
    const timer = setTimeout(() => {
      reject(errorMessage || "Timed out");
    }, wait);

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
