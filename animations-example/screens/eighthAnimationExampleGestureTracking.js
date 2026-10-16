/* Animated.ValueXY ir PanResponder saugomi tarp renderinimų. */
/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, Text, View } from 'react-native';

export default function EighthAnimationExampleGestureTracking() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);
  const [dragAreaHeight, setDragAreaHeight] = useState(480);

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: () => {
      setIsDragging(true);
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
    setIsDragging(false);
    pan.flattenOffset();
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => () => pan.stopAnimation(), [pan]);

  return (
    <ScrollView
      scrollEnabled={!isDragging}
      onLayout={(event) => setDragAreaHeight(Math.max(360, event.nativeEvent.layout.height - 100))}
      contentContainerStyle={{ padding: 20, gap: 20 }}
    >
      <Text>Tempk kvadratą. Paleidus jis grįš į pradžią.</Text>
      <View style={{
        height: dragAreaHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        backgroundColor: '#f8fafc',
      }}>
        <View style={{
          position: 'absolute', width: 80, height: 80,
          borderWidth: 1, borderStyle: 'dashed', borderColor: '#94a3b8',
        }} />
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            width: 80,
            height: 80,
            backgroundColor: isDragging ? '#005587' : '#0077b6',
            transform: [...pan.getTranslateTransform(), { scale: isDragging ? 1.1 : 1 }],
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 28 }}>
            {isDragging ? 'Tempiama' : 'Tempk'}
          </Text>
        </Animated.View>
      </View>
      <CarouselExample />
    </ScrollView>
  );
}

function CarouselExample() {
  const [width, setWidth] = useState(0);

  return (
    <View style={{ gap: 12 }} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      <Text>Slink korteles horizontaliai: scrollX → scale ir opacity</Text>
      {width > 0 && <Carousel key={width} width={width} />}
    </View>
  );
}

function Carousel({ width }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const cardWidth = width * 0.6;

  return (
    <View style={{ gap: 12 }}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: (width - cardWidth) / 2 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
      >
        {[0, 1, 2].map((index) => {
          const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth,
          ];
          const scale = scrollX.interpolate({
            inputRange, outputRange: [0.8, 1, 0.8], extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp',
          });

          return (
            <View key={index} style={{ width: cardWidth, height: 200, justifyContent: 'center' }}>
              <Animated.View style={{
                height: 160,
                marginHorizontal: 10,
                borderRadius: 8,
                backgroundColor: '#3077bd',
                opacity,
                transform: [{ scale }],
              }} />
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        {[0, 1, 2].map((index) => (
          <Animated.View key={index} style={{
            width: 12, height: 12, borderRadius: 6, backgroundColor: '#3077bd',
            opacity: scrollX.interpolate({
              inputRange: [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth],
              outputRange: [0.25, 1, 0.25],
              extrapolate: 'clamp',
            }),
          }} />
        ))}
      </View>
    </View>
  );
}
