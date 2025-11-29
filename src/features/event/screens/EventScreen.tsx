import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useHome } from "../hooks/useHome";
import EventList from "../components/EventList";
import { useAppDispatch } from "@/appConfiguration/store/hooks";
import { setKeyword, setSearch } from "../store/homeSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const onSearch = async () => {
    const ok = await validate();
    if (ok) retry();
  };

  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>

      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={(t) => dispatch(setSearch(t))}
      />

      <TextInput
        placeholder="Keyword"
        value={keyword}
        // onChangeText={(t) => dispatch(setKeyword(t))}
      />

      {/* Yup validation error */}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Button title="Search" onPress={onSearch} />

      <EventList
        items={events}
        isLoading={isFetching}
        error={(serverError as any)?.message ?? null}
        onRetry={retry}
      />
    </View>
  );
}
export default EventScreen;