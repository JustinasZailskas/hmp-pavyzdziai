/* Animated reikšmes perduodame kitiems animacijos mazgams. */
/* eslint-disable react-hooks/refs */
import { useEffect, useRef } from 'react';
import { Animated, Button, ScrollView, Text, View } from 'react-native';

export default function SeventhAnimationExampleTracking() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
      <SpringTrackingExample />
      <OpacityTrackingExample />
    </ScrollView>
  );
}

function SpringTrackingExample() {
  const leader = useRef(new Animated.Value(0)).current;
  const follower1 = useRef(new Animated.Value(0)).current;
  const follower2 = useRef(new Animated.Value(0)).current;
  const follower3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // toValue yra kita Animated.Value, todėl tikslas nuolat atnaujinamas.
    const first = Animated.spring(follower1, { toValue: leader, useNativeDriver: false });
    const second = Animated.spring(follower2, { toValue: follower1, useNativeDriver: false });
    const third = Animated.spring(follower3, { toValue: follower2, useNativeDriver: false });
    first.start();
    second.start();
    third.start();

    return () => {
      first.stop();
      second.stop();
      third.stop();
      leader.stopAnimation();
    };
  }, [leader, follower1, follower2, follower3]);

  function move(toValue) {
    Animated.timing(leader, {
      toValue,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>1. leader → follower1 → follower2 → follower3</Text>
      <Button title="Move Leader" onPress={() => move(180)} />
      <Button title="Reset" onPress={() => move(0)} />
      {[leader, follower1, follower2, follower3].map((value, index) => (
        <Animated.View key={index} style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: index === 0 ? '#0077b6' : '#4daf8e',
          alignItems: 'center', justifyContent: 'center',
          transform: [{ translateX: value }],
        }}>
          <Text style={{ color: 'white' }}>{index}</Text>
        </Animated.View>
      ))}
    </View>
  );
}

function OpacityTrackingExample() {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const tracking = Animated.timing(opacity, {
      toValue: pan.x.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
      duration: 0,
      useNativeDriver: false,
    });
    tracking.start();

    return () => {
      tracking.stop();
      pan.stopAnimation();
    };
  }, [pan, opacity]);

  // Trumpesnis kelias, kad kvadratas tilptų ir siaurame ekrane.
  const translateX = pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 180],
  });

  function move(toValue) {
    Animated.timing(pan.x, {
      toValue,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>2. pan.x: 0 → 300, opacity: 1 → 0</Text>
      <Text>opacity seka interpoliuotą pan.x reikšmę (duration: 0).</Text>
      <Button title="Move and Fade" onPress={() => move(300)} />
      <Button title="Reset" onPress={() => move(0)} />
      <Animated.View style={{
        width: 40, height: 40, backgroundColor: '#0077b6',
        opacity, transform: [{ translateX }],
      }} />
    </View>
  );
}
