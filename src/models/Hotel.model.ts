import mongoose, { Schema, Model } from "mongoose";

import { Hotel } from "../interfaces/Hotel.interface";

const ImageSchema: Schema = new Schema(
  {
    link: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const HotelSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    destination_id: { type: Number, required: true },
    name: { type: String, required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
      city: { type: String },
      country: { type: String },
    },
    description: { type: String },
    amenities: { type: [String] },
    images: {
      rooms: { type: [ImageSchema] },
      site: { type: [ImageSchema] },
      amenities: { type: [ImageSchema] },
    },
    booking_conditions: { type: [String] },
  },
  { timestamps: true }
);

export const HotelModel: Model<Hotel> = mongoose.model<Hotel, Model<Hotel>>(
  "Hotel",
  HotelSchema
);
