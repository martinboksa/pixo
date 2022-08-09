import cron from "node-cron";

/**
 * CRON
 *  # ┌────────────── second (optional)
 *  # │ ┌──────────── minute
 *  # │ │ ┌────────── hour
 *  # │ │ │ ┌──────── day of month
 *  # │ │ │ │ ┌────── month
 *  # │ │ │ │ │ ┌──── day of week
 *  # │ │ │ │ │ │
 *  # │ │ │ │ │ │
 *  # * * * * * *
 */

export const initCron = () => {
  cron.schedule("*/30 * * * * *", async () => {
    // await runPixooCommand();
  });
};
