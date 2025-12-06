
import React, { createContext, useContext, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/appConfiguration/store/rootStore';
import { toggleTheme as toggleThemeAction } from '@/appConfiguration/store/slices/themeSlice';
import { DarkAppTheme, LightAppTheme, BaseTheme } from './theme';

interface ThemeContextType {
  theme: BaseTheme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const isDark = useSelector((s: RootState) => s.theme.isDark);
  const theme = useMemo(() => (isDark ? DarkAppTheme : LightAppTheme), [isDark]);

  const toggleTheme = () => dispatch(toggleThemeAction());



  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <NavigationContainer theme={theme}>
        {children}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useAppTheme must be used inside ReduxThemeProvider');
  return ctx;
};