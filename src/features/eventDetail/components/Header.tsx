import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import Ionicons from "@react-native-vector-icons/ionicons";

interface Props {
    back: () => void;
}

export const Header: React.FC<Props> = ({ back }) => {
    const theme = useAppTheme();
    const styles = makeStyles(theme.theme);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={back}>
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color={theme.theme.colors.textPrimary}
                />
            </TouchableOpacity>

        </View>
    );
};

const makeStyles = ({ spacing }: BaseTheme) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: spacing.medium,
        }
    });
