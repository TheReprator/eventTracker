export const NavigationContainer = ({ children }: any) => children;

export const DefaultTheme = {
  dark: false,
  colors: {
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
    primary: '#007AFF',
    notification: '#ff453a',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    card: '#121212',
    text: '#ffffff',
    border: '#272727',
    primary: '#0A84FF',
    notification: '#ff453a',
  },
};

export const useTheme = () => DefaultTheme;

export const useNavigation = () => ({
  navigate: jest.fn(),
});
