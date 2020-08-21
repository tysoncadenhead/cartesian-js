interface SleepProps {
  timeout: number;
}

export const sleep = (options: SleepProps) => (args?: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(args);
    }, options.timeout);
  });

export default sleep;
