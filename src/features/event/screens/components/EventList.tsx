import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { HomeModelItem } from "../../types/homeModel";
import { EventCard } from "./EventCard";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";

interface Props {
  items: HomeModelItem[];
  onToggleFavorite: (id: string) => void;
  onItemClick: (item: HomeModelItem) => void;
}

const ItemSeparator = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme.theme);

  return (<View style={styles.separator} />)
};

export const EventList: React.FC<Props> = ({ items, onToggleFavorite, onItemClick }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <EventCard item={item} onToggleFavorite={onToggleFavorite}
          onItemClick={onItemClick} />
      )}
    />
  );
};

const makeStyles = ({ spacing }: BaseTheme) =>
  StyleSheet.create({
    separator: {
      height: spacing.large,
      backgroundColor: 'transparent',
    }
  });

