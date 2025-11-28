import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventScreen from "@/features/event/EventScreen";
import ProfileScreen from "@/features/profile/ProfileScreen";
import { TAB_ROUTES, TabStackParamList } from "@/types/navigation";
import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useAppTheme } from "../theme/ThemeContext";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  Event: {
    active: "calendar",
    inactive: "calendar-outline",
  },
  Profile: {
    active: "person",
    inactive: "person-outline",
  },
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabsNavigator() {
  return <TabsWithLocaleAndIcons />;
}

function TabsWithLocaleAndIcons() {
  const { t } = useAppLocale();
  const { isDark, theme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icons = TAB_ICONS[route.name];

        return {
          headerShown: false,
          tabBarLabel: t(`rootTab.${route.name}`),

          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? icons.active : icons.inactive;
            return <Ionicons name={iconName} size={22} color={color} />;
          },

          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: isDark ? "#888" : "#666",
        };
      }}
    >
      <Tab.Screen name={TAB_ROUTES.Event} component={EventScreen} />
      <Tab.Screen name={TAB_ROUTES.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
