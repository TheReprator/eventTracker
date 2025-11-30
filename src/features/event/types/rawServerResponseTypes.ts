export interface RawEventContainer {
  _embedded?: RawEventEmbeddedContainer;
  page?: RawEventPage;
}

type RawEventEmbeddedContainer = {
  events?: RawEventItem[]
}

type RawEventPage = {
  size?: number
  totalElements?: number
  totalPages?: number
  number?: number
}

export interface RawEventItem {
  id?: string;
  name?: string;
  info?: string;
  images?: RawEventImage[];
  dates?: RawEventDates;
  _embedded?: RawEventEmbedded;
}

interface RawEventImage {
  url?: string;
  width?: number;
  height?: number;
  ratio?: string;
}

interface RawEventDates {
  start?: {
    localDate: string;
    localTime?: string;
    dateTime?: string;
  };
  timezone?: string;
  status?: string;
}

interface RawEventEmbedded {
  venues?: RawEventVenue[];
  attractions?: RawEventAttraction[];
}

interface RawEventVenue {
  id?: string;
  name?: string;
  images?: RawEventImage[];
  city?: { name: string };
  country?: { countryCode: string };
  address?: { line1: string };
  location?: {
    longitude: string;
    latitude: string;
  };
}

interface RawEventAttraction {
  id?: string;
  name?: string;
  type?: string;
}