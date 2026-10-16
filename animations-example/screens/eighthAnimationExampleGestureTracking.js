/* Animated.ValueXY ir PanResponder saugomi tarp renderinimų. */
/* eslint-disable react-hooks/refs */
import { useEffect, useRef } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';

export default function EighthAnimationExampleGestureTracking() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.stopAnimation();
      // Išsaugome esamą poziciją kaip poslinkį, kad sugriebus nešokteltų.
      pan.extractOffset();
    },
    // Pirmą argumentą (įvykį) praleidžiame, iš antro imame dx ir dy.
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }, // PanResponder gestai apdorojami JS pusėje.
    ),
    onPanResponderRelease: reset,
    onPanResponderTerminate: reset,
  })).current;

  function reset() {
    pan.flattenOffset();
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => () => pan.stopAnimation(), [pan]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Tempk kvadratą. Paleidus jis grįš į pradžią.</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#0077b6',
            transform: pan.getTranslateTransform(),
          }}
        />
      </View>
    </View>
  );
}
