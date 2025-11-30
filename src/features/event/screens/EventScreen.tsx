import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHome } from "../hooks/useHome";
import { useAppDispatch } from "@/appConfiguration/store/hooks";
import { setKeyword, setSearch } from "../store/homeSlice";
import { SearchInputs } from "./components/SearchInputs";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/Error";
import { EmptyState } from "./components/EmptyState";
import { EventList } from "./components/EventList";
import { toggleFavorite } from "../store/favoritesSlice";
import { HomeModelItem } from "../types/homeModel";


const EventScreen: React.FC = () => {
  const {
    search,
    keyword,
    error,
    serverError,
    isFetching,
    events,
    validate,
    retry,
  } = useHome();

  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    if (isFetching) return;
    
    const ok = await validate();
    if (ok) retry();
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>

      <SearchInputs
        search={search}
        keyword={keyword}
        error={error}
        onSearchChange={(text) => dispatch(setSearch(text))}
        onKeywordChange={(text) => dispatch(setKeyword(text))}
        onSubmit={onSubmit}
      />

      {renderContent({
        serverError,
        isFetching,
        events,
        onToggleFavorite: (id) => dispatch(toggleFavorite(id)),
        retry
      })}
    </View>
  );
};

interface RenderContentProps {
  serverError: string | null;
  isFetching: boolean;
  events: HomeModelItem[];
  onToggleFavorite: (id: string) => void;
  retry: () => void
}

const renderContent = ({
  serverError,
  isFetching,
  events,
  onToggleFavorite,
  retry
}: RenderContentProps) => {

  if (isFetching) {
    return <Loader />;
  }

  if (serverError) {
    return <ErrorMessage message={serverError} onRetry={retry} />;
  }

  if (events.length === 0) {
    return <EmptyState />;
  }

  return (
    <EventList
      items={events}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export default EventScreen;
