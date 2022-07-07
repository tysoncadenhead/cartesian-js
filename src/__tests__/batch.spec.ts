import {batch, handle, pipe} from '../';

describe('batch', () => {
  it('Should run promises in a batch', async () => {
    const result = await batch({
      batchSize: 2,
    })((x) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 10);
      });
    })([1, 2, 3, 4, 5]);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('Should throw if there is an error', async () => {
    const [err] = await handle(
      batch({
        batchSize: 2,
      })(async (x) => {
        if (x === 2) {
          throw new Error('No');
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(x);
          }, 10);
        });
      })([1, 2, 3]),
    );

    expect(err).toEqual('No');
  });

  it('Should allow us to map into another function', async () => {
    const timesTwo = async (x) => x * 2;
    const plusOne = async (x) => x + 1;

    const result = await batch<number, number>({
      batchSize: 2,
      map: pipe(timesTwo, plusOne),
    })((x) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 10);
      });
    })([2, 4, 6]);

    expect(result).toEqual([5, 9, 13]);
  });

  it('Should allow us to catch in the map', async () => {
    const handleResult = async () => {
      // Do something with the error
      return;
    };

    const result = await batch<number, [Error, number]>({
      batchSize: 1,
      handle: handleResult,
    })((x) => {
      if (x === 4) {
        return Promise.reject('No');
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 10);
      });
    })([2, 4, 6]);

    expect(result).toEqual([2, , 6]);
  });

  it('Should allow us to specify a retry', async () => {
    let i = 0;
    const result = await batch<number, [Error, number]>({
      batchSize: 1,
      retry: {
        attempts: 2,
      },
    })((x) => {
      i++;
      if (i === 1) {
        throw new Error('Fail first');
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 10);
      });
    })([2, 4, 6]);

    expect(result).toEqual([2, 4, 6]);
  });
});
