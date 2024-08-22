import axios from "axios";

import {
  convertLatitude,
  convertLongitude,
  formatAmenities,
  trimValue,
} from "../../../utils/helper";
import { Hotel, Image } from "../../../interfaces";

export const PATAGONIA_URL =
  "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia";

interface PatagoniaImage {
  url: string;
  description: string;
}

export interface PatagoniaHotel {
  id: string;
  destination: number;
  name: string;
  lat: number | null;
  lng: number | null;
  address: string | null;
  info: string | null;
  amenities: string[] | null;
  images: {
    rooms: PatagoniaImage[];
    amenities: PatagoniaImage[];
  };
}

export async function fetchData(): Promise<Hotel[] | null> {
  const patagoniaHotels = await patagoniaServiceHelpers.downloadData();
  if (!patagoniaHotels) return null;

  return patagoniaServiceHelpers.parseData(patagoniaHotels);
}

async function downloadData(): Promise<PatagoniaHotel[] | null> {
  try {
    const response = await axios.get<PatagoniaHotel[]>(PATAGONIA_URL);
    return response.data;
  } catch {
    console.log("Error retrieving Patagonia data");
    return null;
  }
}

function parseData(patagoniaHotels: PatagoniaHotel[]): Hotel[] {
  return patagoniaHotels.map((patagoniaHotel) => ({
    id: patagoniaHotel.id,
    destination_id: patagoniaHotel.destination,
    name: trimValue(patagoniaHotel.name),
    location: {
      lat: convertLatitude(patagoniaHotel.lat),
      lng: convertLongitude(patagoniaHotel.lng),
      address: trimValue(patagoniaHotel.address),
      city: null,
      country: null,
    },
    description: trimValue(patagoniaHotel.info),
    amenities: formatAmenities(patagoniaHotel.amenities),
    images: {
      rooms: parseImages(patagoniaHotel.images.rooms),
      amenities: parseImages(patagoniaHotel.images.amenities),
      site: [],
    },
    booking_conditions: [],
  }));
}

function parseImages(images: PatagoniaImage[] | null): Image[] {
  if (!images) return [];

  const roomImages: Image[] = images.map((image) => {
    return {
      link: image.url,
      description: image.description,
    };
  });

  return roomImages;
}

export const patagoniaServiceHelpers = {
  downloadData,
  parseData,
};
