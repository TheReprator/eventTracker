import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EmptyState = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme.theme);
  const { t } = useAppLocale();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t("homeScreen.searchNoData")}
      </Text>
    </View>
  );
};


const makeStyles = ({ spacing, colors }: BaseTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: spacing.large
    },
    text: {
      textAlign: "center", 
      marginTop: 20,
      color: colors.textSecondary
    },
  });