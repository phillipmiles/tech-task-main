export const sleep = (ms: number) => {
  return new Promise((resolve) => setInterval(resolve, ms));
};
