import { HomeModelItem } from "./homeModel";

export interface HomeState extends DebouncedValues{
  error: string | null;
}

export interface EventHomeScreenState{
  search: string;
  keyword: string;
  error: string | null;
  serverError: string | null;
  isFetching: boolean;
  events: HomeModelItem[];
  validate: () => Promise<boolean>;
  retry: () => void;
}

export interface DebouncedValues {
  keyword: string;
  search: string;
}

