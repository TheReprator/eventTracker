import { useAppLocale } from '@/appConfiguration/localization/LocaleContext';
import { useAppTheme } from '@/appConfiguration/theme/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyle';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen() {

  const { t, language, toggleLocale } = useAppLocale();
  const appTheme = useAppTheme();

  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 20,
      marginBottom: 12,
    },
    label: {
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },
  }));

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{t('profileScreen.title')}</Text>

      <Text style={styles.label}>Language: {language}</Text>

      <Button title={t("profileScreen.toggleLanguage", { language: language })} onPress={toggleLocale} />

      <Button
        title={t('profileScreen.toggleTheme')}
        onPress={appTheme.toggleTheme}
      />
    </View>
  );
}