import { pipe } from "./pipe";
import { handle } from "./handle";

export const handlePipe = (...fns) => (args?: any) =>
  handle(pipe(...fns)(args));
