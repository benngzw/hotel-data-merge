import { Request, Response } from "express";
import * as DatabaseService from "../services/DatabaseService";
import * as HotelDataService from "../services/HotelDataService";

export const getHotels = async (req: Request, res: Response) => {
  try {
    const { destination, hotels } = req.query;

    const query: any = {};
    if (destination) query.destination_id = destination;
    if (hotels) query.id = { $in: (hotels as string).split(",") };
    const hotelList = await DatabaseService.getHotels(query);

    res.json(hotelList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

export const updateHotels = async (req: Request, res: Response) => {
  try {
    await HotelDataService.updateHotelsData();
    res.status(200).json({ message: "Hotel data updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update hotel data" });
  }
};
