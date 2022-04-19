import {handle} from './handle';

export const tryCatch = async (fn) => {
  try {
    const result = fn();

    if (result?.then) {
      return handle(result);
    }

    return [undefined, result];
  } catch (e) {
    return [e?.message?.message || e?.message || e, undefined];
  }
};
