import * as DatabaseService from "./DatabaseService";
import { AcmeService, PaperFliesService, PatagoniaService } from "./suppliers";
import { Hotel, Image } from "../interfaces";

export async function updateHotelsData(): Promise<void> {
  let allHotels: Hotel[];
  try {
    allHotels = await hotelDataHelpers.downloadHotelData();
  } catch {
    throw new Error("Failed to update hotel data");
  }

  const mergedHotelsArray = hotelDataHelpers.mergeHotelData(allHotels);
  await DatabaseService.addHotelsBatch(mergedHotelsArray);
}

async function downloadHotelData(): Promise<Hotel[]> {
  const [acmeHotels, paperfliesHotels, patagoniaHotels] = await Promise.all([
    fetchDataWithRetry(AcmeService.fetchData, 3),
    fetchDataWithRetry(PaperFliesService.fetchData, 3),
    fetchDataWithRetry(PatagoniaService.fetchData, 3),
  ]);

  return [
    ...(acmeHotels || []),
    ...(paperfliesHotels || []),
    ...(patagoniaHotels || []),
  ];
}

async function fetchDataWithRetry(
  fetchFunction: () => Promise<Hotel[] | null>,
  retries: number
): Promise<Hotel[]> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const data = await fetchFunction();
    if (data !== null) return data;
  }
  return [];
}

function mergeHotelData(allHotels: Hotel[]): Hotel[] {
  const mergedHotels: { [id: string]: Hotel } = {};
  allHotels.forEach((hotel) => {
    if (mergedHotels[hotel.id]) {
      mergedHotels[hotel.id] = {
        ...mergedHotels[hotel.id],
        ...hotel,
        name: mergedHotels[hotel.id].name || hotel.name,
        location: {
          lat: mergedHotels[hotel.id].location?.lat || hotel.location?.lat,
          lng: mergedHotels[hotel.id].location?.lng || hotel.location?.lng,
          address:
            mergedHotels[hotel.id].location?.address || hotel.location?.address,
          city: mergedHotels[hotel.id].location?.city || hotel.location?.city,
          country:
            mergedHotels[hotel.id].location?.country || hotel.location?.country,
        },
        description: mergedHotels[hotel.id].description || hotel.description,
        amenities: mergeAmenities(
          mergedHotels[hotel.id].amenities,
          hotel.amenities
        ),
        images: {
          rooms: mergeImages(
            mergedHotels[hotel.id].images.rooms,
            hotel.images.rooms
          ),
          site: mergeImages(
            mergedHotels[hotel.id].images.site,
            hotel.images.site
          ),
          amenities: mergeImages(
            mergedHotels[hotel.id].images.amenities,
            hotel.images.amenities
          ),
        },
        booking_conditions: mergeBookingConditions(
          mergedHotels[hotel.id].booking_conditions,
          hotel.booking_conditions
        ),
      };
    } else {
      mergedHotels[hotel.id] = hotel;
    }
  });

  return Object.values(mergedHotels);
}

function mergeAmenities(
  firstAmenities: string[],
  secondAmenities: string[]
): string[] {
  const amenitiesSet: Set<string> = new Set(
    firstAmenities.concat(secondAmenities)
  );

  return Array.from(amenitiesSet);
}

function mergeImages(firstImages: Image[], secondImages: Image[]): Image[] {
  const mergedLinks = new Set<string>();
  const mergedImages = [];
  for (const image of firstImages.concat(secondImages)) {
    if (!mergedLinks.has(image.link)) {
      mergedLinks.add(image.link);
      mergedImages.push(image);
    }
  }

  return mergedImages;
}

function mergeBookingConditions(
  firstBookingConditions: string[],
  secondBookingConditions: string[]
): string[] {
  const bookingConditionsSet: Set<string> = new Set(
    firstBookingConditions.concat(secondBookingConditions)
  );

  return Array.from(bookingConditionsSet);
}

export const hotelDataHelpers = {
  downloadHotelData,
  mergeHotelData,
  mergeAmenities,
  mergeImages,
  mergeBookingConditions,
  fetchDataWithRetry,
};
