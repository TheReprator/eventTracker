import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DetailSection = ({ title, children }: {
    title: string;
    children: React.ReactNode;
}) => {

    const theme = useAppTheme();
    const appLocale = useAppLocale();
    const styles = makeStyles(theme.theme, appLocale.isRTL);

    return (
        <View style={styles.section}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    )
};

const makeStyles = ({ borderRadius, colors, spacing }: BaseTheme, isRTL: boolean) =>
    StyleSheet.create({
        section: {
            padding: spacing.large,
            backgroundColor: colors.card,
            borderRadius: borderRadius.medium,
        },
        title: {
            writingDirection: isRTL ? "rtl":'ltr',
            fontSize: 18,
            fontWeight: "600",
            marginBottom: spacing.large,
        },
    });
