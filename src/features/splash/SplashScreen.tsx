import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, ROUTES } from '@/types/navigation';
import { BaseTheme } from '@/appConfiguration/theme/theme';
import { useAppTheme } from '@/appConfiguration/theme/ThemeContext';
import { useAppLocale } from '@/appConfiguration/localization/LocaleContext';

type SplashNavProp = NativeStackNavigationProp<RootStackParamList, typeof ROUTES.Splash>;

const SPLASH_TIMEOUT = 2000;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavProp>();

  const { t } = useAppLocale();

  useEffect(() => {
    const timeOut = setTimeout(() => navigation.replace(ROUTES.Tab), SPLASH_TIMEOUT);
    return () => clearTimeout(timeOut);
  }, []);

  const theme = useAppTheme();
  const styles = makeStyles(theme.theme);

  return (
    <View style={styles.container}>
      <Text>{t("splashScreen.message")}</Text>
    </View>
  );
}

const makeStyles = ({ colors }: BaseTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.splashBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SplashScreen;