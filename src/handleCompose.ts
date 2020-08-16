import { compose } from "./compose";
import { handle } from "./handle";

export const handleCompose = (...fns) => (args?: any) =>
  handle(compose(...fns)(args));

export default handleCompose;
