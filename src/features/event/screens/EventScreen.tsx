import React from "react";
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from "react-native";
import { useHome } from "../hooks/useHome";
import { useAppDispatch } from "@/appConfiguration/store/hooks";
import { setKeyword, setSearch } from "../store/homeSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EventCard from "../components/EventCard";

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

  const onSubmit = async () => {
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
        onChangeText={(t) => dispatch(setKeyword(t))}
      />

      {/* Validation Error */}
      {error && (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      )}

      <Button title="Search" onPress={onSubmit} />

      {/* Loader */}
      {isFetching && <ActivityIndicator style={{ marginTop: 20 }} />}


      {/* Server Error */}
      {serverError && !isFetching ? (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "red" }}>{serverError}</Text>
          <Button title="Retry" onPress={retry} />
        </View>
      ): null }


      {/* Empty State */}
      {!isFetching && events.length === 0 && !serverError && (
        <Text style={{ marginTop: 20 }}>No events found.</Text>
      )}

      {/* Event List */}
      {!isFetching && !serverError && events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard item={item} />}
          style={{ marginTop: 20 }}
        />
      ) : null}
    </View>
  );
}
export default EventScreen;
