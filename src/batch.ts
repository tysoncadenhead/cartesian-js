export const batch = (fn, options) => (arr) => {
  const batchSize = options?.batchSize || 10;

  return Promise.resolve(arr).then((arr) =>
    arr
      .map((_item, key) =>
        key % batchSize ? [] : arr.slice(key, key + batchSize)
      )
      .map((batchGroup) => (results) =>
        Promise.all(batchGroup.map(fn)).then((result) => results.concat(result))
      )
      .reduce((promises, exec) => promises.then(exec), Promise.resolve([]))
  );
};

export default batch;
