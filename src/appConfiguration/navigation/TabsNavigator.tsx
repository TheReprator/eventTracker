import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventScreen from '@/features/event/EventScreen';
import ProfileScreen from '@/features/profile/ProfileScreen';
import { TAB_ROUTES, TabStackParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false})}>

        <Tab.Screen name={TAB_ROUTES.Event} component={EventScreen} />
        <Tab.Screen name={TAB_ROUTES.Profile} component={ProfileScreen} />

    </Tab.Navigator>
  );
}
