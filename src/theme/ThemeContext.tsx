import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type Theme = {
  background: string;
  text: string;
  primary: string;
};

const lightTheme: Theme = {
  background: '#f8f8f8',
  text: '#333',
  primary: '#1e90ff',
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#fff',
  primary: '#1e90ff',
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  mode: 'light',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>(
    systemTheme === 'dark' ? 'dark' : 'light',
  );

  const toggleTheme = () =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
