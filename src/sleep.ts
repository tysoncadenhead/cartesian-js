export const sleep = (milliseconds: number) => (args?: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(args);
    }, milliseconds);
  });

export default sleep;
