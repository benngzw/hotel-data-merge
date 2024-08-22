export interface Image {
  link: string;
  description: string;
}

export interface Hotel {
  id: string;
  destination_id: number;
  name: string | null;
  location: {
    lat: number | null;
    lng: number | null;
    address: string | null;
    city: string | null;
    country: string | null;
  };
  description: string | null;
  amenities: string[];
  images: {
    rooms: Image[];
    site: Image[];
    amenities: Image[];
  };
  booking_conditions: string[];
}
