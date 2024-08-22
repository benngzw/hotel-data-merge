import express from "express";

import { DatabaseService, HotelDataService } from "./services";
import { hotelRoutes } from "./routes";
import { setupHotelCronJobs } from "./utils/scheduler";

DatabaseService.connect();
HotelDataService.updateHotelsData();

setupHotelCronJobs();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(hotelRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
