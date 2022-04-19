import {tryCatch} from '../';

describe('tryCatch', () => {
  it('should return [undefined, result] when fn() does not throw', async () => {
    const fn = () => 'result';
    const [error, result] = await tryCatch(fn);
    expect(error).toBeUndefined();
    expect(result).toBe('result');
  });

  it('should return [error, undefined] when fn() throws', async () => {
    const fn = () => {
      throw new Error('error');
    };
    const [error, result] = await tryCatch(fn);
    expect(error).toBe('error');
    expect(result).toBeUndefined();
  });

  it('should handle promises', async () => {
    const fn = () => Promise.resolve('result');
    const [error, result] = await tryCatch(fn);
    expect(error).toBeUndefined();
    expect(result).toBe('result');
  });

  it('should handle errors in promises', async () => {
    const fn = async () => {
      throw new Error('error');
    };
    const [error, result] = await tryCatch(fn);
    expect(error).toBe('error');
    expect(result).toBeUndefined();
  });

  it('should handle promise rejections', async () => {
    const fn = async () => {
      return Promise.reject('error');
    };
    const [error, result] = await tryCatch(fn);
    expect(error).toBe('error');
    expect(result).toBeUndefined();
  });
});
