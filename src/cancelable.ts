import { cancelable as cancelablePromise } from "cancelable-promise";

export const cancelable = (promise) => (props?: any) =>
  cancelablePromise(promise(props));
