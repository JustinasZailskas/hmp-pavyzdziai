/* Animated.Value perduodamos Animated.View animacijoms. */
/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, ScrollView, Text, View } from 'react-native';

export default function NinthAnimationExampleCurrentValue() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
      <ListenerExample />
      <StopAnimationExample />
    </ScrollView>
  );
}

function ListenerExample() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = fadeAnim.addListener(({ value }) => {
      if (value > 0.9) setDone(true);
    });

    return () => {
      fadeAnim.removeListener(id);
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim]);

  function animate() {
    fadeAnim.setValue(0);
    setDone(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>1. addListener: reaguojame, kai opacity viršija 0.9</Text>
      <Button title="Start Fade" onPress={animate} />
      <Animated.View style={{
        width: 80, height: 80, backgroundColor: '#0077b6', opacity: fadeAnim,
      }} />
      <Text>{done ? 'Reikšmė viršijo 0.9!' : 'Laukiame reikšmės > 0.9'}</Text>
    </View>
  );
}

function StopAnimationExample() {
  const translateY = useRef(new Animated.Value(0)).current;
  const [finalValue, setFinalValue] = useState(null);

  useEffect(() => () => translateY.stopAnimation(), [translateY]);

  function animate() {
    translateY.setValue(0);
    setFinalValue(null);
    Animated.timing(translateY, {
      toValue: 200,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  function stop() {
    // Dabartinę reikšmę gauname callback, net naudojant native driver.
    translateY.stopAnimation((value) => {
      console.log('Final value:', value);
      setFinalValue(value);
    });
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>2. stopAnimation: sustabdome ir gauname dabartinę poziciją</Text>
      <Button title="Start Movement" onPress={animate} />
      <Button title="Stop and Read Value" onPress={stop} />
      <Text>
        {finalValue === null ? 'Sustabdymo pozicija: —' : `Sustabdymo pozicija: ${finalValue.toFixed(1)}`}
      </Text>
      <View style={{ height: 280 }}>
        <Animated.View style={{
          width: 80, height: 80, backgroundColor: '#4daf8e',
          transform: [{ translateY }],
        }} />
      </View>
    </View>
  );
}
