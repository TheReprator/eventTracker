import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";

export const Loader = () => {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};
