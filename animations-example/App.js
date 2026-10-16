import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import UseRefExample from './screens/UseRefExample';
import FirstAnimationExampleUseRef from './screens/firstAnimationExampleUseRef';
import SecondAnimationExampleTiming from './screens/secondAnimationExampleTiming';
import ThirdAnimationExampleSpring from './screens/thirdAnimationExampleSpring';
import FourthAnimationExampleDecay from './screens/fourthAnimationExampleDecay';
import FifthAnimationExampleComposition from './screens/fifthAnimationExampleComposition';
import SixthAnimationExampleInterpolation from './screens/sixthAnimationExampleInterpolation';

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
          name="FirstAnimationExampleUseRef"
          component={FirstAnimationExampleUseRef}
          options={{ title: 'FadeIn su useRef' }}
        />
        <Stack.Screen
          name="SecondAnimationExampleTiming"
          component={SecondAnimationExampleTiming}
          options={{ title: 'Antra animacija: timing' }}
        />
        <Stack.Screen
          name="ThirdAnimationExampleSpring"
          component={ThirdAnimationExampleSpring}
          options={{ title: 'Trečia animacija: spring' }}
        />
        <Stack.Screen
          name="FourthAnimationExampleDecay"
          component={FourthAnimationExampleDecay}
          options={{ title: 'Ketvirta animacija: decay' }}
        />
        <Stack.Screen
          name="FifthAnimationExampleComposition"
          component={FifthAnimationExampleComposition}
          options={{ title: 'Penkta animacija: komponavimas' }}
        />
        <Stack.Screen
          name="SixthAnimationExampleInterpolation"
          component={SixthAnimationExampleInterpolation}
          options={{ title: 'Šešta animacija: interpoliacija' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
