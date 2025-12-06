import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DetailItem = ({ label, value }: {
    label: string; value: string;
}) => {
    const theme = useAppTheme();
    const styles = makeStyles(theme.theme);

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

const makeStyles = ({ spacing }: BaseTheme) =>
    StyleSheet.create({
        row: {
            flexDirection: "row",
            gap: spacing.large,
        },
        label: {
            fontWeight: "500",
            width: 100,
        },
        value: {
            flex: 1,
        },
    });