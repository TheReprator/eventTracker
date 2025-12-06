import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ message, onRetry }) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme.theme);
  const { t } = useAppLocale();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title={t("homeScreen.retry")} onPress={onRetry} />
    </View>
  );
};


const makeStyles = ({ spacing, colors }: BaseTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: spacing.large
    },
    text: {
      color: colors.textPrimary
    }
  });