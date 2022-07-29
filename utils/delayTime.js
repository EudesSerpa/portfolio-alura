/**
 * Wait for a given amount of time.
 * @param ms - The number of milliseconds to delay.
 */
export const delayTime = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
