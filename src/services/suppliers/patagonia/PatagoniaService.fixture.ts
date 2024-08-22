import { PatagoniaHotel } from "./PatagoniaService";

export const patagoniaHotelsMock: PatagoniaHotel[] = [
  {
    id: "a1b2",
    destination: 1234,
    name: "Grand Palace Hotel",
    lat: 35.6895,
    lng: 139.6917,
    address: "1-1-1 Chiyoda, Tokyo",
    info: "A luxurious hotel located in the heart of Tokyo.",
    amenities: [
      "Pool",
      "Wifi",
      "Business center",
      "Dry cleaning",
      "Breakfast",
      "Air conditioning",
      "Tv",
      "Mini bar",
      "Coffee maker",
      "Safe",
    ],
    images: {
      rooms: [
        {
          url: "https://patagonia.com/room1.jpg",
          description: "Room view 1",
        },
        {
          url: "https://patagonia.com/room2.jpg",
          description: "Room view 2",
        },
      ],
      amenities: [
        {
          url: "https://patagonia.com/site1.jpg",
          description: "Amenity view 1",
        },
        {
          url: "https://patagonia.com/site2.jpg",
          description: "Amenity view 2",
        },
      ],
    },
  },
  {
    id: "c3d4",
    destination: 1234,
    name: "Ocean View Resort",
    lat: null,
    lng: null,
    address: null,
    info: "A beautiful resort with stunning ocean views.",
    amenities: [
      "Pool",
      "Wifi",
      "Spa",
      "Breakfast",
      "Bar",
      "Air conditioning",
      "Tv",
      "Mini bar",
      "Coffee maker",
      "Safe",
    ],
    images: {
      rooms: [
        {
          url: "https://patagonia.com/room3.jpg",
          description: "Room view 3",
        },
        {
          url: "https://patagonia.com/room4.jpg",
          description: "Room view 4",
        },
      ],
      amenities: [
        {
          url: "https://patagonia.com/site3.jpg",
          description: "Amenity view 3",
        },
        {
          url: "https://patagonia.com/site4.jpg",
          description: "Amenity view 4",
        },
      ],
    },
  },
  {
    id: "e5f6",
    destination: 9101,
    name: "Mountain Retreat",
    lat: 40.7128,
    lng: -74.006,
    address: "456 Mountain Road, New York",
    info: null,
    amenities: null,
    images: {
      rooms: [
        {
          url: "https://patagonia.com/room5.jpg",
          description: "Room view 5",
        },
        {
          url: "https://patagonia.com/room6.jpg",
          description: "Room view 6",
        },
      ],
      amenities: [
        {
          url: "https://patagonia.com/site5.jpg",
          description: "Amenity view 5",
        },
        {
          url: "https://patagonia.com/site6.jpg",
          description: "Amenity view 6",
        },
      ],
    },
  },
];

export const expectedParsedPatagoniaHotels = [
  {
    id: "a1b2",
    destination_id: 1234,
    name: "Grand Palace Hotel",
    location: {
      lat: 35.6895,
      lng: 139.6917,
      address: "1-1-1 Chiyoda, Tokyo",
      city: null,
      country: null,
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
          link: "https://patagonia.com/room1.jpg",
          description: "Room view 1",
        },
        {
          link: "https://patagonia.com/room2.jpg",
          description: "Room view 2",
        },
      ],
      amenities: [
        {
          link: "https://patagonia.com/site1.jpg",
          description: "Amenity view 1",
        },
        {
          link: "https://patagonia.com/site2.jpg",
          description: "Amenity view 2",
        },
      ],
      site: [],
    },
    booking_conditions: [],
  },
  {
    id: "c3d4",
    destination_id: 1234,
    name: "Ocean View Resort",
    location: {
      lat: null,
      lng: null,
      address: null,
      city: null,
      country: null,
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
          link: "https://patagonia.com/room3.jpg",
          description: "Room view 3",
        },
        {
          link: "https://patagonia.com/room4.jpg",
          description: "Room view 4",
        },
      ],
      amenities: [
        {
          link: "https://patagonia.com/site3.jpg",
          description: "Amenity view 3",
        },
        {
          link: "https://patagonia.com/site4.jpg",
          description: "Amenity view 4",
        },
      ],
      site: [],
    },
    booking_conditions: [],
  },
  {
    id: "e5f6",
    destination_id: 9101,
    name: "Mountain Retreat",
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "456 Mountain Road, New York",
      city: null,
      country: null,
    },
    description: null,
    amenities: [],
    images: {
      rooms: [
        {
          link: "https://patagonia.com/room5.jpg",
          description: "Room view 5",
        },
        {
          link: "https://patagonia.com/room6.jpg",
          description: "Room view 6",
        },
      ],
      amenities: [
        {
          link: "https://patagonia.com/site5.jpg",
          description: "Amenity view 5",
        },
        {
          link: "https://patagonia.com/site6.jpg",
          description: "Amenity view 6",
        },
      ],
      site: [],
    },
    booking_conditions: [],
  },
];
