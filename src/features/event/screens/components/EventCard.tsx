import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { HomeModelItem } from "../../types/homeModel";

interface Props {
  item: HomeModelItem;
  onToggleFavorite: (id: string) => void;
}

export const EventCard: React.FC<Props> = ({ item, onToggleFavorite }) => {

  return (
    <View style={{ padding: 12, flexDirection: "row" }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 80, height: 80, borderRadius: 6 }}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text numberOfLines={2}>{item.name}</Text>
        <Text>{item.date}</Text>
        <Text>{item.city}</Text>
      </View>


      <TouchableOpacity onPress={() => onToggleFavorite(item.id)}   style={{
          justifyContent: "center"
        }}>
        <Text style={{ fontSize: 22 }}>
          {item.isFavorite ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
