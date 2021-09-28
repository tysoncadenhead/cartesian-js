import { compose } from "./compose";
import { handle } from "./handle";

export const handleCompose =
  <Args, T, E>(...fns) =>
  (args?: Args): Promise<[E, T]> =>
    handle(compose(...fns)(args)) as Promise<[E, T]>;

export default handleCompose;
