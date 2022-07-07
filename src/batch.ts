import pipe from './pipe';
import handle from './handle';
import retry, {RetryOptions} from './retry';

export const batch =
  <Args, MapResult>(options: {
    batchSize?: number;
    map?: (data: Args) => Promise<MapResult | Args>;
    handle?: (err: unknown) => unknown;
    retry?: RetryOptions;
  }) =>
  (fn: (data: Args) => unknown) =>
  (arr: Args[]) => {
    const batchSize = options?.batchSize || 10;
    const mapFn = options?.map || (async (item) => item);
    const retryOptions = options?.retry || {
      attempts: 1,
    };
    const handleResult =
      options?.handle ||
      ((err) => {
        throw new Error(err as string);
      });

    return Promise.resolve(arr).then((arr) =>
      arr
        .map((_item, key) =>
          key % batchSize ? [] : arr.slice(key, key + batchSize),
        )
        .map(
          (batchGroup) => (results) =>
            Promise.all(
              batchGroup.map(async (item) => {
                const [err, result] = await handle(
                  retry(retryOptions)(pipe(fn, mapFn))(item),
                );

                if (err) {
                  return handleResult(err);
                }

                return result;
              }),
            ).then((result) => results.concat(result)),
        )
        .reduce((promises, exec) => promises.then(exec), Promise.resolve([])),
    );
  };

export default batch;
