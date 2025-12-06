import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";

interface Props {
    back: () => void;
}

export const Header: React.FC<Props> = ({ back }) => {
    const theme = useAppTheme();
    const styles = makeStyles(theme.theme);
    const appLocale = useAppLocale();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={back}>
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color={theme.theme.colors.textPrimary}
                     style={{
                        transform: [{ scaleX: appLocale.isRTL ? -1 : 1 }],
                    }}
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
