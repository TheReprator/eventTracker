import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

type StyleCreator<T> = (theme: BaseTheme) => T;

export function useThemedStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  creator: StyleCreator<T>
): T {
  const { theme } = useAppTheme();

  return useMemo(() => StyleSheet.create(creator(theme)), [theme, creator]);
}
