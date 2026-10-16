/* Animated.Value ir interpolate aprašo Animated.View animacijos mazgus. */
/* eslint-disable react-hooks/refs */
import { useRef } from 'react';
import { Animated, Button, Easing, ScrollView, Text, View } from 'react-native';

export default function SixthAnimationExampleInterpolation() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
      <FadeMoveExample />
      <RotationExample />
      <ExtrapolationExample />
    </ScrollView>
  );
}

function FadeMoveExample() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });

  function animate() {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>1. Viena reikšmė: opacity 0 → 1, translateY 150 → 0</Text>
      <Button title="Fade and Move" onPress={animate} />
      <View style={{ height: 210, alignItems: 'center' }}>
        <Animated.View style={{
          width: 60, height: 60, backgroundColor: '#3077bd',
          opacity: fadeAnim, transform: [{ translateY }],
        }} />
      </View>
    </View>
  );
}

function RotationExample() {
  const value = useRef(new Animated.Value(0)).current;
  const rotate = value.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'clamp',
  });

  function animate() {
    value.setValue(0);
    Animated.timing(value, {
      toValue: 360,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>2. Skaičius 0 → 360 paverčiamas į kampą 0deg → 360deg</Text>
      <Button title="Rotate" onPress={animate} />
      <View style={{ height: 110, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{
          width: 80, height: 40, backgroundColor: '#4daf8e', transform: [{ rotate }],
        }} />
      </View>
    </View>
  );
}

function ExtrapolationExample() {
  const value = useRef(new Animated.Value(-0.5)).current;
  const extend = value.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 120],
    extrapolate: 'extend',
  });
  const clamp = value.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 120],
    extrapolate: 'clamp',
  });

  function animate() {
    value.setValue(-0.5);
    Animated.timing(value, {
      toValue: 1.5,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>3. extend ir clamp: įvestis −0.5 → 1.5</Text>
      <Text>inputRange: [0, 1], outputRange: [40, 120]</Text>
      <Button title="Compare Extrapolation" onPress={animate} />
      <Text>extend: tęsia judėjimą už intervalo (0 → 160)</Text>
      <View style={{ height: 40 }}>
        <Animated.View style={{
          width: 30, height: 30, backgroundColor: '#3077bd',
          transform: [{ translateX: extend }],
        }} />
      </View>
      <Text>clamp: riboja judėjimą (40 → 120)</Text>
      <View style={{ height: 40 }}>
        <Animated.View style={{
          width: 30, height: 30, backgroundColor: '#4daf8e',
          transform: [{ translateX: clamp }],
        }} />
      </View>
    </View>
  );
}
