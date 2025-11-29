import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventScreen from "@/features/event/screens/EventScreen";
import ProfileScreen from "@/features/profile/ProfileScreen";
import { TAB_ROUTES, TabRouteNames, TabStackParamList } from "@/types/navigation";
import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import Ionicons from "@react-native-vector-icons/ionicons";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<TabRouteNames, { active: IconName; inactive: IconName }> = {
  [TAB_ROUTES.Event]: {
    active: "calendar",
    inactive: "calendar-outline",
  },
  [TAB_ROUTES.Profile]: {
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
        };
      }}
    >

      <Tab.Screen name={TAB_ROUTES.Event} component={EventScreen} />
      <Tab.Screen name={TAB_ROUTES.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
