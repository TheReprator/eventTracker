import { HomeModelItem, HomeModelVenueDetail } from "../types/homeModel";
import { RawEventContainer, RawEventItem, RawEventVenue } from "../types/rawServerResponseTypes";

export const mapEventContainer = (
  favoriteIds: string[],
  container?: RawEventContainer,
): HomeModelItem[] => {
  const events = container?._embedded?.events ?? [];
  return events.map((item: RawEventItem, index: number) => mapEventItem(item, index, favoriteIds));
};

const mapEventItem = (
  item: RawEventItem,
  index: number,
  favoriteIds: string[]
): HomeModelItem => {
  const id = item.id ?? index.toString();

  const venueInfo: HomeModelVenueDetail = mapVenueDetail(item._embedded?.venues?.[0])

  const date = item.dates?.start?.localDate ?? "";
  const imageUrl = item.images?.[0]?.url ?? "";
  const isFavorite = favoriteIds.includes(id);

  return {
    id,
    name: item.name ?? "",
    type: item.type ?? "",
    imageUrl,
    date,
    venueInfo,
    isFavorite,
  };
};


const mapVenueDetail = (venue?: RawEventVenue): HomeModelVenueDetail => ({
  name: venue?.name ?? "",
  city: venue?.city?.name ?? "",
  address: venue?.address?.line1 ?? "",
  location: {
    longitude: Number(venue?.location?.longitude ?? 0),
    latitude: Number(venue?.location?.latitude ?? 0),
  },
});