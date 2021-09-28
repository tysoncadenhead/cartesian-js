import { handle } from "./handle";
import { pipe } from "./pipe";

export const handlePipe =
  <Args, T, E>(...fns) =>
  (args?: Args): Promise<[E, T]> =>
    handle(pipe(...fns)(args)) as Promise<[E, T]>;

export default handlePipe;
