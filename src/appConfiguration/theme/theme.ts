import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export interface BaseTheme extends Theme {
    spacing: {
        small: number;
        medium: number;
        large: number;
    };
    borderRadius: {
        small: number;
        medium: number;
        large: number;
    };
    colors: Theme["colors"] & {
        splashBackground: string;
        primaryLight: string;
        primaryDark: string;
        surface: string;
        textPrimary: string;
        textSecondary: string;
        textTertiary: string;
        borderLight: string;
    }
}

const commonBaseTheme = {
    spacing: {
        small: 4,
        medium: 8,
        large: 12
    },
    borderRadius: {
        small: 4,
        medium: 8,
        large: 12
    },
    colors: {
        notification: '#FF453A',
    }
}

export const LightAppTheme: BaseTheme = {
    ...DefaultTheme,
    ...commonBaseTheme,
    colors: {
        ...DefaultTheme.colors,
        splashBackground: '#49e918ff',
        primary: '#007AFF',
        primaryLight: '#4DA3FF',
        primaryDark: '#005FCC',

        background: '#F5F6FA',
        card: '#FFFFFF',
        surface: '#FAFAFA',

        textPrimary: '#1C1C1E',
        textSecondary: '#6C6C70',
        textTertiary: '#9A9AA0',

        border: '#D9D9D9',
        borderLight: '#E5E5E5'
    }
};

export const DarkAppTheme: BaseTheme = {
    ...DefaultTheme,
    ...commonBaseTheme,
    colors: {
        ...DarkTheme.colors,

        splashBackground: '#730bd5ff',

        primary: '#0A84FF',
        primaryLight: '#409CFF',
        primaryDark: '#0060DF',

        background: '#000000',
        surface: '#1E1E1E',
        card: '#2A2A2D',

        textPrimary: '#FFFFFF',
        textSecondary: '#B3B3B8',
        textTertiary: '#8A8A8F',

        border: '#3A3A3C',
        borderLight: '#48484A',
    }
};
