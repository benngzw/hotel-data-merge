import { Hotel } from "../interfaces";

export const expectedMergedHotels: Hotel[] = [
  {
    id: "a1b2",
    destination_id: 1234,
    name: "Grand Palace Hotel",
    location: {
      lat: 35.6895,
      lng: 139.6917,
      address: "1-1-1 Chiyoda, Tokyo",
      city: "Tokyo",
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
        {
          link: "https://patagonia.com/room1.jpg",
          description: "Room view 1",
        },
        {
          link: "https://patagonia.com/room2.jpg",
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
      city: "Sydney",
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
        {
          link: "https://patagonia.com/room3.jpg",
          description: "Room view 3",
        },
        {
          link: "https://patagonia.com/room4.jpg",
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
    },
    booking_conditions: ["No smoking", "Check-in after 3 PM"],
  },
  {
    id: "e5f6",
    destination_id: 9101,
    name: "Mountain Retreat",
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "456 Mountain Road, New York",
      city: "New York",
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
        {
          link: "https://patagonia.com/room5.jpg",
          description: "Room view 5",
        },
        {
          link: "https://patagonia.com/room6.jpg",
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
    },
    booking_conditions: ["No pets allowed", "Check-in after 4 PM"],
  },
];
