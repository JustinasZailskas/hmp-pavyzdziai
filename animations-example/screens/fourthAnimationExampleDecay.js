import { useRef } from 'react';
import { Animated, Button, View } from 'react-native';

export default function FourthAnimationExampleDecay() {
  // eslint-disable-next-line react-hooks/refs
  const translateX = useRef(new Animated.Value(0)).current;

  function animate() {
    translateX.setValue(0); // Atstatome reikšmę prieš animaciją.
    Animated.decay(translateX, {
      velocity: 1, // Pradinis greitis.
      deceleration: 0.995, // Kuo arčiau 1, tuo lėčiau sustoja.
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Start Decay Animation" onPress={animate} />
      <Animated.View
        style={{
          width: 40,
          height: 40,
          marginTop: 20,
          backgroundColor: '#3077bd',
          transform: [{ translateX }],
        }}
      />
    </View>
  );
}
