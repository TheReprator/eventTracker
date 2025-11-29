import { HomeModelItem } from "../types/homeModel";
import { RawEventContainer, RawEventItem } from "../types/rawTypes";

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

  // Extract venue
  const venue = item._embedded?.venues?.[0];
  const venueName = venue?.name ?? "";
  const city = venue?.city?.name ?? "";

  // Extract date
  const date = item.dates?.start?.localDate ?? "";

  // Extract image (pick the best available)
  const imageUrl = item.images?.[0]?.url ?? "";

  // Is it a favorite?
  const isFavorite = favoriteIds.includes(id);

  return {
    id,
    name: item.name ?? "",
    imageUrl,
    date,
    venueName,
    city,
    isFavorite,
  };
};
