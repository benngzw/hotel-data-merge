import { Hotel } from "../../../interfaces";
import { PaperFliesHotel } from "./PaperFliesService";

export const paperFliesHotelsMock: PaperFliesHotel[] = [
  {
    hotel_id: "a1b2",
    destination_id: 1234,
    hotel_name: "Grand Palace Hotel",
    location: {
      address: "1-1-1 Chiyoda, Tokyo",
      country: "Japan",
    },
    details: "A luxurious hotel located in the heart of Tokyo.",
    amenities: {
      general: ["pool", "wifi", "business center", "dry cleaning", "breakfast"],
      room: ["air conditioning", "tv", "mini bar", "coffee maker", "safe"],
    },
    images: {
      rooms: [
        {
          link: "https://paperflies.com/room1.jpg",
          caption: "Room view 1",
        },
        {
          link: "https://paperflies.com/room2.jpg",
          caption: "Room view 2",
        },
      ],
      site: [
        {
          link: "https://paperflies.com/site1.jpg",
          caption: "Site view 1",
        },
        {
          link: "https://paperflies.com/site2.jpg",
          caption: "Site view 2",
        },
      ],
    },
    booking_conditions: ["No pets allowed", "Check-in after 2 PM"],
  },
  {
    hotel_id: "c3d4",
    destination_id: 1234,
    hotel_name: "Ocean View Resort",
    location: {
      address: "123 Beach Road, Sydney",
      country: "Australia",
    },
    details: "A beautiful resort with stunning ocean views.",
    amenities: {
      general: ["pool", "wifi", "spa", "breakfast", "bar"],
      room: ["air conditioning", "tv", "mini bar", "coffee maker", "safe"],
    },
    images: {
      rooms: [
        {
          link: "https://paperflies.com/room3.jpg",
          caption: "Room view 3",
        },
        {
          link: "https://paperflies.com/room4.jpg",
          caption: "Room view 4",
        },
      ],
      site: [
        {
          link: "https://paperflies.com/site3.jpg",
          caption: "Site view 1",
        },
        {
          link: "https://paperflies.com/site4.jpg",
          caption: "Site view 4",
        },
      ],
    },
    booking_conditions: ["No smoking", "Check-in after 3 PM"],
  },
  {
    hotel_id: "e5f6",
    destination_id: 9101,
    hotel_name: "Mountain Retreat",
    location: {
      address: "456 Mountain Road, New York",
      country: "United States",
    },
    details: "A serene retreat located in the mountains.",
    amenities: {
      general: ["wifi", "breakfast", "hiking trails", "fireplace"],
      room: ["air conditioning", "tv", "mini bar", "coffee maker", "safe"],
    },
    images: {
      rooms: [
        {
          link: "https://paperflies.com/room5.jpg",
          caption: "Room view 5",
        },
        {
          link: "https://paperflies.com/room6.jpg",
          caption: "Room view 6",
        },
      ],
      site: [
        {
          link: "https://paperflies.com/site5.jpg",
          caption: "Site view 5",
        },
        {
          link: "https://paperflies.com/site6.jpg",
          caption: "Site view 6",
        },
      ],
    },
    booking_conditions: ["No pets allowed", "Check-in after 4 PM"],
  },
];

export const expectedParsedPaperFliesHotels: Hotel[] = [
  {
    id: "a1b2",
    destination_id: 1234,
    name: "Grand Palace Hotel",
    location: {
      lat: null,
      lng: null,
      address: "1-1-1 Chiyoda, Tokyo",
      city: null,
      country: "Japan",
    },
    description: "A luxurious hotel located in the heart of Tokyo.",
    amenities: [
      "pool",
      "wifi",
      "business center",
      "dry cleaning",
      "breakfast",
      "air conditioning",
      "tv",
      "mini bar",
      "coffee maker",
      "safe",
    ],
    images: {
      rooms: [
        {
          link: "https://paperflies.com/room1.jpg",
          description: "Room view 1",
        },
        {
          link: "https://paperflies.com/room2.jpg",
          description: "Room view 2",
        },
      ],
      site: [
        {
          link: "https://paperflies.com/site1.jpg",
          description: "Site view 1",
        },
        {
          link: "https://paperflies.com/site2.jpg",
          description: "Site view 2",
        },
      ],
      amenities: [],
    },
    booking_conditions: ["No pets allowed", "Check-in after 2 PM"],
  },
  {
    id: "c3d4",
    destination_id: 1234,
    name: "Ocean View Resort",
    location: {
      lat: null,
      lng: null,
      address: "123 Beach Road, Sydney",
      city: null,
      country: "Australia",
    },
    description: "A beautiful resort with stunning ocean views.",
    amenities: [
      "pool",
      "wifi",
      "spa",
      "breakfast",
      "bar",
      "air conditioning",
      "tv",
      "mini bar",
      "coffee maker",
      "safe",
    ],
    images: {
      rooms: [
        {
          link: "https://paperflies.com/room3.jpg",
          description: "Room view 3",
        },
        {
          link: "https://paperflies.com/room4.jpg",
          description: "Room view 4",
        },
      ],
      site: [
        {
          link: "https://paperflies.com/site3.jpg",
          description: "Site view 1",
        },
        {
          link: "https://paperflies.com/site4.jpg",
          description: "Site view 4",
        },
      ],
      amenities: [],
    },
    booking_conditions: ["No smoking", "Check-in after 3 PM"],
  },
  {
    id: "e5f6",
    destination_id: 9101,
    name: "Mountain Retreat",
    location: {
      lat: null,
      lng: null,
      address: "456 Mountain Road, New York",
      city: null,
      country: "United States",
    },
    description: "A serene retreat located in the mountains.",
    amenities: [
      "wifi",
      "breakfast",
      "hiking trails",
      "fireplace",
      "air conditioning",
      "tv",
      "mini bar",
      "coffee maker",
      "safe",
    ],
    images: {
      rooms: [
        {
          link: "https://paperflies.com/room5.jpg",
          description: "Room view 5",
        },
        {
          link: "https://paperflies.com/room6.jpg",
          description: "Room view 6",
        },
      ],
      site: [
        {
          link: "https://paperflies.com/site5.jpg",
          description: "Site view 5",
        },
        {
          link: "https://paperflies.com/site6.jpg",
          description: "Site view 6",
        },
      ],
      amenities: [],
    },
    booking_conditions: ["No pets allowed", "Check-in after 4 PM"],
  },
];
