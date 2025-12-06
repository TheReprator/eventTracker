export interface HomeModelItem {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  date: string;
  venueInfo: HomeModelVenueDetail;
  isFavorite: boolean;
}

export type HomeModelVenueDetail = {
  name: string;
  city: string;
  address: string;
  location: {
    longitude: number;
    latitude: number;
  };
}