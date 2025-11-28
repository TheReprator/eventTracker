export const ROUTES = {
  Splash: 'Splash',
  Tab: 'Tab',
  EventDetail: 'EventDetail',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];

export type RootStackParamList = {
  Splash: undefined;
  Tab: undefined;
  EventDetail: { id: string };
};

export const TAB_ROUTES = {
  Event: 'Event',
  Profile: 'Profile',
} as const;

export type TabRouteNames = typeof TAB_ROUTES[keyof typeof TAB_ROUTES];

export type TabStackParamList = {
  Event: undefined;
  Profile: undefined;
};