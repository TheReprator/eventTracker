import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { HomeModelItem } from "../../types/homeModel";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";

interface Props {
  item: HomeModelItem;
  onToggleFavorite: (id: string) => void;
  onItemClick: (item: HomeModelItem) => void;
}

export const EventCard: React.FC<Props> = ({ item, onToggleFavorite, onItemClick }) => {

  const theme = useAppTheme();
  const styles = makeStyles(theme.theme);

  return (
    <TouchableOpacity
      onPress={() => onItemClick(item)} style={styles.container}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.imageDimension}
      />

      <View style={styles.infoContainer}>
        <Text numberOfLines={2} style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.text}>{item.venueInfo.city}</Text>
      </View>

      <TouchableOpacity onPress={() => onToggleFavorite(item.id)} style={styles.bookMark}>
        <Text style={{ fontSize: 22 }}>
          {item.isFavorite ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}


const makeStyles = ({ spacing, borderRadius, colors }: BaseTheme) =>
  StyleSheet.create({
    container: {
      padding: spacing.large,
      flexDirection: "row",
      backgroundColor: colors.card,
      gap: spacing.large,
      borderRadius: borderRadius.medium,
    },
    imageDimension: {
      width: 80, height: 80, borderRadius: borderRadius.medium
    },
    infoContainer: {
      marginHorizontal: spacing.medium, gap: spacing.small
    },
    text: {
      color: colors.textPrimary
    },
    bookMark: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.medium,
    }
  });