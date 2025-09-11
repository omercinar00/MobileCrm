import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/theme/ThemeContext';

import screensConfig from './screensAppConfig.json';

// Screens importları
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AllListScreen from './src/screens/AllListScreen';
import RequestsScreen from './src/screens/RequestsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const componentMap: Record<string, any> = {
  LoginScreen,
  HomeScreen,
  ProfileScreen,
  AllListScreen,
  RequestsScreen,
  SettingsScreen,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      setInitialRoute(user ? 'Home' : 'Login');
    };
    checkUser();
  }, []);

  if (isLoading)
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <SplashScreen onFinish={() => setIsLoading(false)} />
        </ThemeProvider>
      </SafeAreaProvider>
    );

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            {screensConfig.map(screen => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={componentMap[screen.component]}
                options={{
                  headerShown: screen.headerShown,
                  headerTitle: screen.headerTitle || screen.name,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
