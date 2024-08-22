import axios from "axios";

import { Hotel, Image } from "../../../interfaces";
import {
  formatAmenities,
  formatCountry,
  trimValue,
} from "../../../utils/helper";

export const PAPERFLIES_URL =
  "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies";

interface PaperFliesImage {
  link: string;
  caption: string;
}

export interface PaperFliesHotel {
  hotel_id: string;
  destination_id: number;
  hotel_name: string;
  location: {
    address: string | null;
    country: string;
  };
  details: string | null;
  amenities: {
    general: string[];
    room: string[];
  };
  images: {
    rooms: PaperFliesImage[];
    site: PaperFliesImage[];
  };
  booking_conditions: string[];
}

export async function fetchData(): Promise<Hotel[] | null> {
  const paperfliesHotels = await paperFliesServiceHelpers.downloadData();
  if (!paperfliesHotels) return null;

  return paperFliesServiceHelpers.parseData(paperfliesHotels);
}

async function downloadData(): Promise<PaperFliesHotel[] | null> {
  try {
    const response = await axios.get<PaperFliesHotel[]>(PAPERFLIES_URL);
    return response.data;
  } catch {
    console.log("Error retrieving PaperFlies data");
    return null;
  }
}

function parseData(paperfliesHotels: PaperFliesHotel[]): Hotel[] {
  return paperfliesHotels.map((paperfliesHotel) => ({
    id: paperfliesHotel.hotel_id,
    destination_id: paperfliesHotel.destination_id,
    name: trimValue(paperfliesHotel.hotel_name),
    location: {
      lat: null,
      lng: null,
      address: trimValue(paperfliesHotel.location?.address),
      city: null,
      country: formatCountry(paperfliesHotel.location.country),
    },
    description: trimValue(paperfliesHotel.details),
    amenities: formatAmenities(paperfliesHotel.amenities?.general).concat(
      formatAmenities(paperfliesHotel.amenities?.room)
    ),
    images: {
      rooms: parseImages(paperfliesHotel.images.rooms),
      site: parseImages(paperfliesHotel.images.site),
      amenities: [],
    },
    booking_conditions: paperfliesHotel.booking_conditions.map((condition) =>
      condition.trim()
    ),
  }));
}

function parseImages(images: PaperFliesImage[] | null): Image[] {
  if (!images) return [];

  const roomImages: Image[] = images.map((image) => {
    return {
      link: image.link,
      description: image.caption,
    };
  });

  return roomImages;
}

export const paperFliesServiceHelpers = {
  downloadData,
  parseData,
};
