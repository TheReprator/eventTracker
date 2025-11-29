import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppDispatch } from "@/appConfiguration/store/hooks";
import { toggleFavorite } from "../store/favoritesSlice";
import { HomeModelItem } from "../types/homeModel";

export default function EventCard({ item }: { item: HomeModelItem }) {
  const dispatch = useAppDispatch();

  return (
    <View style={{ padding: 12, flexDirection: "row" }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 80, height: 80, borderRadius: 6 }}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text>{item.name}</Text>
        <Text>{item.date}</Text>
        <Text>{item.city}</Text>
      </View>

      {/* Favorite Icon */}
      <TouchableOpacity onPress={() => dispatch(toggleFavorite(item.id))}>
        <Text style={{ fontSize: 22 }}>
          {item.isFavorite ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
