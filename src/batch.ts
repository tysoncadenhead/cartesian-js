interface IOptions {
  batchSize?: number;
}

export const batch =
  <Args>(fn: (data: Args) => unknown, options: IOptions) =>
  (arr: Args[]) => {
    const batchSize = options?.batchSize || 10;

    return Promise.resolve(arr).then((arr) =>
      arr
        .map((_item, key) =>
          key % batchSize ? [] : arr.slice(key, key + batchSize)
        )
        .map(
          (batchGroup) => (results) =>
            Promise.all(batchGroup.map(fn)).then((result) =>
              results.concat(result)
            )
        )
        .reduce((promises, exec) => promises.then(exec), Promise.resolve([]))
    );
  };

export default batch;
