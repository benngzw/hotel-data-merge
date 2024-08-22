import axios from "axios";

import {
  convertLatitude,
  convertLongitude,
  formatAmenities,
  formatCountry,
  trimValue,
} from "../../../utils/helper";
import { Hotel } from "../../../interfaces";

export const ACME_URL =
  "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme";

export interface AcmeHotel {
  Id: string;
  DestinationId: number;
  Name: string;
  Latitude: number | string | null;
  Longitude: number | string | null;
  Address: string;
  City: string;
  Country: string;
  PostalCode: string;
  Description: string;
  Facilities: string[];
}

export async function fetchData(): Promise<Hotel[] | null> {
  const acmeHotels = await acmeServiceHelpers.downloadData();
  if (!acmeHotels) return null;

  return acmeServiceHelpers.parseData(acmeHotels);
}

export async function downloadData(): Promise<AcmeHotel[] | null> {
  try {
    const response = await axios.get<AcmeHotel[]>(ACME_URL);
    return response.data;
  } catch {
    console.log("Error retrieving Acme data");
    return null;
  }
}

export function parseData(acmeHotels: AcmeHotel[]): Hotel[] {
  return acmeHotels.map((acmeHotel) => {
    return {
      id: acmeHotel.Id,
      destination_id: acmeHotel.DestinationId,
      name: trimValue(acmeHotel.Name),
      location: {
        lat: convertLatitude(acmeHotel.Latitude),
        lng: convertLongitude(acmeHotel.Longitude),
        address: trimValue(acmeHotel.Address),
        city: trimValue(acmeHotel.City),
        country: formatCountry(acmeHotel.Country),
      },
      description: trimValue(acmeHotel.Description),
      amenities: formatAmenities(acmeHotel.Facilities),
      images: {
        rooms: [],
        site: [],
        amenities: [],
      },
      booking_conditions: [],
    };
  });
}

export const acmeServiceHelpers = {
  downloadData,
  parseData,
};
