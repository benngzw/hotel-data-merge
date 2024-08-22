import mongoose from "mongoose";
import dotenv from "dotenv";

import { Hotel } from "../interfaces";
import { HotelModel } from "../models";

dotenv.config();

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST = "localhost",
  MONGODB_PORT = "27017",
  MONGODB_DBNAME,
} = process.env;

const RETENTION_PERIOD_DAYS = 3;

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}?authSource=admin`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

export async function getHotels(query: object): Promise<Hotel[]> {
  try {
    return await HotelModel.find(query)
      .select("-_id -__v -createdAt -updatedAt")
      .lean();
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Failed to fetch hotels");
  }
}

export async function addHotelsBatch(hotelsData: Hotel[]): Promise<void> {
  try {
    const bulkOps = hotelsData.map((hotel) => ({
      updateOne: {
        filter: { id: hotel.id },
        update: { $set: hotel },
        upsert: true,
      },
    }));

    await HotelModel.bulkWrite(bulkOps);
    console.log("Batch of hotels data saved successfully");
  } catch (err) {
    console.error("Error saving batch of hotels data", err);
    throw new Error("Failed to save hotels data");
  }
}

export async function deleteOutdatedHotels(): Promise<void> {
  const threeDaysAgoISOString = new Date(
    Date.now() - RETENTION_PERIOD_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  try {
    const result = await HotelModel.deleteMany({
      updatedAt: { $lt: threeDaysAgoISOString },
    });
    console.log(
      `Deleted ${result.deletedCount} hotels not updated in the past ${RETENTION_PERIOD_DAYS} days`
    );
  } catch (err) {
    console.error("Error deleting old hotels", err);
  }
}
