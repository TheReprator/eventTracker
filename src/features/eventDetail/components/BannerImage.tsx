import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import React from "react";
import { Image, StyleSheet } from "react-native";

export const BannerImage = ({ uri }: { uri: string }) => {
    if (!uri) return null;

    const theme = useAppTheme();
    const styles = makeStyles(theme.theme);

    return <Image source={{ uri }} style={styles.banner} />;
};

const makeStyles = ({ borderRadius }: BaseTheme) =>
    StyleSheet.create({
        banner: {
            width: "100%",
            height: 220,
            borderRadius: borderRadius.medium,
        }
    });