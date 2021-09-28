interface SleepProps {
  timeout: number;
}

export const sleep =
  <Args>(options: SleepProps) =>
  (args?: Args): Promise<Args> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(args);
      }, options.timeout);
    });

export default sleep;
