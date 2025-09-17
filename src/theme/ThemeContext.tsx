import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = {
  background: string;
  text: string;
  placeholder: string;
  primary: string;
  cardBackground: string;
  inputBackground: string;
  errorText: string;
  shadowColor: string;
};

const lightTheme: Theme = {
  background: '#f8f8f8',
  text: '#000',
  placeholder: '#555',
  primary: '#1e90ff',
  cardBackground: '#ffffff',
  inputBackground: '#f0f0f0',
  errorText: '#ff4d4d',
  shadowColor: '#00000033',
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#fff',
  placeholder: '#555',
  primary: '#1e90ff',
  cardBackground: '#1e1e1e',
  inputBackground: '#2a2a2a',
  errorText: '#ff4d4d',
  shadowColor: '#00000088',
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
