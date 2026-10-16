import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import UseRefExample from './screens/UseRefExample';
import FadeInExample from './screens/FadeInExample';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0b5cab',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'React Native animacijos' }}
        />
        <Stack.Screen
          name="UseRefExample"
          component={UseRefExample}
          options={{ title: 'useState ir useRef' }}
        />
        <Stack.Screen
          name="FadeInExample"
          component={FadeInExample}
          options={{ title: 'FadeIn su useRef' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
