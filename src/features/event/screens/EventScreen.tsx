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
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ROUTES } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";

type EventDetailNavProp = NativeStackNavigationProp<RootStackParamList, typeof ROUTES.EventDetail>;

const EventScreen: React.FC = () => {

  const navigation = useNavigation<EventDetailNavProp>();

  const openEventDetail = (item: HomeModelItem) => {
    navigation.navigate(ROUTES.EventDetail, { item });
  };

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

  const theme = useAppTheme();

  return (
    <View style={{
      paddingTop: insets.top, flex: 1, paddingHorizontal: theme.theme.spacing.medium,
      gap: theme.theme.spacing.large
    }}>

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
        onItemClick: openEventDetail,
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
  onItemClick: (item: HomeModelItem) => void;
  retry: () => void
}

const renderContent = ({
  serverError,
  isFetching,
  events,
  onToggleFavorite,
  onItemClick,
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
      onItemClick={onItemClick}
    />
  );
};

export default EventScreen;
