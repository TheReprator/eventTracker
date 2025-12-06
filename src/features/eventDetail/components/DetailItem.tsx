import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DetailItem = ({ label, value }: {
    label: string; value: string;
}) => {
    const theme = useAppTheme();
    const appLocale = useAppLocale();
    const styles = makeStyles(theme.theme, appLocale.isRTL);

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <Text numberOfLines={2} style={styles.value}>{value}</Text>
        </View>
    )
}

const makeStyles = ({ spacing }: BaseTheme, isRTL: boolean) =>
    StyleSheet.create({
        row: {
            flexDirection: "row",
            gap: spacing.large,
        },
        label: {
            fontWeight: "500",
            width: 100,
            writingDirection: isRTL ? "rtl":'ltr',
        },
        value: {
            flex: 1,
            writingDirection: isRTL ? "rtl":'ltr',
        },
    });