import { pipe } from "./pipe";

export const compose = (...fns) => pipe(...fns.reverse());
