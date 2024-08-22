import request from "supertest";
import express from "express";
import { hotelRoutes } from "./routes";
import { DatabaseService, HotelDataService } from "./services";
import { expectedMergedHotels } from "./services/HotelDataService.fixture";

const app = express();

app.use(express.json());
app.use(hotelRoutes);

describe("HotelController", () => {
  let getHotelsSpy = jest.spyOn(DatabaseService, "getHotels");
  let updateHotelsDataSpy = jest.spyOn(HotelDataService, "updateHotelsData");

  describe("GET /hotels", () => {
    it("should return a list of hotels based on query parameters", async () => {
      getHotelsSpy.mockResolvedValue(expectedMergedHotels);
      const response = await request(app)
        .get("/hotels")
        .query({ destination: "123", hotels: "1,2,3" })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(getHotelsSpy).toHaveBeenCalledWith({
        destination_id: "123",
        id: { $in: ["1", "2", "3"] },
      });
      expect(response.body).toEqual(expectedMergedHotels);
    });

    it("should return a 500 error if fetching hotels fails", async () => {
      getHotelsSpy.mockRejectedValue("Failed to fetch hotels");

      const response = await request(app)
        .get("/hotels")
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body).toEqual({ error: "Failed to fetch hotels" });
    });
  });

  describe("POST /update-hotels", () => {
    it("should update hotel data and return a success message", async () => {
      updateHotelsDataSpy.mockResolvedValue();
      const response = await request(app)
        .post("/update-hotels")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(updateHotelsDataSpy).toHaveBeenCalled();
      expect(response.body).toEqual({
        message: "Hotel data updated successfully",
      });
    });

    it("should return a 500 error if updating hotel data fails", async () => {
      updateHotelsDataSpy.mockRejectedValue("Failed to update hotel data");

      const response = await request(app)
        .post("/update-hotels")
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body).toEqual({ error: "Failed to update hotel data" });
    });
  });
});
