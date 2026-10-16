import { useRef } from 'react';
import { Animated, Button, Text, View } from 'react-native';

export default function SecondAnimationExampleTiming() {
  // eslint-disable-next-line react-hooks/refs
  const marginTop = useRef(new Animated.Value(20)).current;

  function animateForward() {
    // Grąžiname pradžią, kad pavyzdį būtų galima pakartoti.
    marginTop.setValue(20);
    Animated.timing(marginTop, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false, // Keičiame layout savybę.
    }).start();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Animate Box" onPress={animateForward} />
      <Animated.View
        style={{ width: 100, height: 100, backgroundColor: '#0077b6', marginTop }}
      />
      <Text style={{ marginTop: 20 }}>Elementas apačioje</Text>
    </View>
  );
}
