import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { useThemedStyles } from "@/hooks/useThemedStyle";
import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

interface Props {
  search: string;
  keyword: string;
  onSearchChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onSubmit: () => void;
  error?: string | null;
}

export const SearchInputs: React.FC<Props> = ({
  search,
  keyword,
  onSearchChange,
  onKeywordChange,
  onSubmit,
  error,
}) => {

  const styles = useThemedStyles((theme, isRTL) => ({
    container: {
      gap: theme.spacing.large
    },
    textLayout: {
      textAlign: isRTL ? 'right' : 'left',
      padding: theme.spacing.large,
      borderRadius: theme.borderRadius.medium,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.card,
    },
    error: {
      color: theme.colors.notification,
      marginVertical: theme.spacing.medium
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: theme.spacing.medium,
      paddingHorizontal: theme.spacing.large,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.primary,
      shadowRadius: theme.borderRadius.medium,
      elevation: theme.spacing.small,
    },
    text: {
      color: theme.colors.textPrimary
    },
  }));

  const appTheme = useAppTheme();
  const { t } = useAppLocale();

  return (
    <View style = {styles.container}>

      <TextInput
        style={styles.textLayout}
        placeholder={t("homeScreen.search")}
        placeholderTextColor={appTheme.theme.colors.textSecondary}
        value={search}
        onChangeText={onSearchChange}
      />

      <TextInput
        style={styles.textLayout}
        placeholder={t("homeScreen.keyword")}
        placeholderTextColor={appTheme.theme.colors.textSecondary}
        value={keyword}
        onChangeText={onKeywordChange}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>
          {t("homeScreen.submit")}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

