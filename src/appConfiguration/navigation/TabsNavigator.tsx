import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventScreen from '@/features/event/EventScreen';
import ProfileScreen from '@/features/profile/ProfileScreen';
import { TAB_ROUTES, TabStackParamList } from '@/types/navigation';
import { useAppLocale } from '../localization/LocaleContext';

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabsNavigator() {
  return <TabsWithLocale />;
}

function TabsWithLocale() {
  const { t } = useAppLocale();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: t(`rootTab.${route.name}`)
      })}
    >
      <Tab.Screen name={TAB_ROUTES.Event} component={EventScreen} />
      <Tab.Screen name={TAB_ROUTES.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}