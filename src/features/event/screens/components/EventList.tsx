import React from "react";
import { FlatList } from "react-native";
import { HomeModelItem } from "../../types/homeModel";
import { EventCard } from "./EventCard";

interface Props {
  items: HomeModelItem[];
  onToggleFavorite: (id: string) => void;
  onItemClick: (id: string) => void;
}

export const EventList: React.FC<Props> = ({ items, onToggleFavorite, onItemClick }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventCard item={item} onToggleFavorite={onToggleFavorite}
          onItemClick={onItemClick} />
      )}
    />
  );
};
