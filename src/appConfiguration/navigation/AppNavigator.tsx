import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import SplashScreen from '@/features/splash/SplashScreen';
import { RootStackParamList, ROUTES } from '@/types/navigation';
import EventDetailScreen from '@/features/eventDetail/EventDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.Splash} component={SplashScreen} />
        <Stack.Screen name={ROUTES.Tab} component={TabsNavigator} />
        <Stack.Screen name={ROUTES.EventDetail} component={EventDetailScreen} />
      </Stack.Navigator>
  );
}
