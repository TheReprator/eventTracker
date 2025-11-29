import React from "react";
import { FlatList, ActivityIndicator, View, Text, Button } from "react-native";
import EventCard from "./EventCard";
import { HomeModelItem } from "../types/homeModel";

interface EventListProps {
  items: HomeModelItem[];
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function EventList({
  items,
  isLoading,
  error,
  onRetry,
}: EventListProps) {

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (error) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        {onRetry && (
          <Button title="Retry" onPress={onRetry} />
        )}
      </View>
    );
  }

  if (!items?.length) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>No data found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventCard item={item} />}
    />
  );
}
