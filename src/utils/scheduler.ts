import { CronJob } from "cron";
import * as DatabaseService from "../services/DatabaseService";
import * as HotelDataService from "../services/HotelDataService";

export const setupHotelCronJobs = () => {
  new CronJob(
    "0 0 * * *", // Runs daily at midnight
    () => HotelDataService.updateHotelsData(),
    null,
    true,
    "Asia/Singapore"
  );

  new CronJob(
    "0 0 * * *", // Runs daily at midnight
    () => DatabaseService.deleteOutdatedHotels(),
    null,
    true,
    "Asia/Singapore"
  );
};
