import { pipe } from "./pipe";

export const compose = <Args, T>(...fns) => pipe<Args, T>(...fns.reverse());

export default compose;
