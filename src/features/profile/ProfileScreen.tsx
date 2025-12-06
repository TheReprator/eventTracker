import { useAppLocale } from '@/appConfiguration/localization/LocaleContext';
import { useAppTheme } from '@/appConfiguration/theme/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyle';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {

  const insets = useSafeAreaInsets();
  
  const styles = useThemedStyles((theme, isRTL) => ({
    container: {
      flex:1,
      backgroundColor: theme.colors.background,
      paddingTop: insets.top, 
      paddingHorizontal: theme.spacing.large,
      gap: theme.spacing.large
    },
    title: {
      writingDirection: isRTL ? "rtl":'ltr',
      color: theme.colors.textPrimary,
    },
    label: {
      writingDirection: isRTL ? "rtl":'ltr',
      color: theme.colors.textSecondary,
    },
    button: {
      alignItems: "center",
      paddingVertical: theme.spacing.medium,
      paddingHorizontal: theme.spacing.large,
      borderRadius: theme.borderRadius.large,
      backgroundColor: theme.colors.primary,
      shadowRadius: theme.borderRadius.medium,
      elevation: theme.spacing.small,
    },
  }));


  const { t, language, toggleLocale } = useAppLocale();
  const appTheme = useAppTheme();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{t('profileScreen.title')}</Text>

      <Text style={styles.label}>Language: {language}</Text>

      <TouchableOpacity onPress={toggleLocale} style={styles.button}>
        <Text style={styles.title}>
          {t("profileScreen.toggleLanguage", { language: language })}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={appTheme.toggleTheme} style={styles.button}>
        <Text style={styles.title}>
          {t("profileScreen.toggleTheme")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}