/* Animated.Value ir interpolate aprašo animacijos mazgus, perduodamus Animated.View. */
/* eslint-disable react-hooks/refs */
import { useRef, useState } from 'react';
import { Animated, Button, Text, View } from 'react-native';

export default function FifthAnimationExampleComposition() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  function animate() {
    opacity.setValue(0);
    scale.setValue(1);
    rotate.setValue(0);
    setIsAnimating(true);

    Animated.sequence([
      // 1. Pasirodo per 300 ms.
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // 2. Palaukia 500 ms.
      Animated.delay(500),
      // 3. Vienu metu didėja ir sukasi.
      Animated.parallel([
        Animated.spring(scale, { toValue: 1.2, useNativeDriver: true }),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setIsAnimating(false));
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      <Button title="Start Animation" onPress={animate} disabled={isAnimating} />
      <Text>Pasirodo → pauzė → didėja + sukasi</Text>
      <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{
          width: 100,
          height: 100,
          backgroundColor: '#0077b6',
          opacity,
          transform: [{ scale }, { rotate: rotation }],
        }} />
      </View>
    </View>
  );
}
