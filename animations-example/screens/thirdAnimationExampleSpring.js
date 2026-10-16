import { useRef } from 'react';
import { Animated, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ThirdAnimationExampleSpring() {
  // eslint-disable-next-line react-hooks/refs
  const translateYLow = useRef(new Animated.Value(0)).current;
  // eslint-disable-next-line react-hooks/refs
  const translateYHigh = useRef(new Animated.Value(0)).current;

  function animateTo(toValue) {
    Animated.spring(translateYLow, {
      toValue,
      friction: 4, // Mažesnis slopinimas — daugiau atšokimų.
      tension: 80,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateYHigh, {
      toValue,
      friction: 20,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }

  function animate() {
    animateTo(250);
  }

  function reset() {
    animateTo(0);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Spring Animate!" onPress={animate} />
      <Button title="Reset" onPress={reset} />

      <View style={styles.comparison}>
        <View style={styles.column}>
          <Text>friction: 4</Text>
          <View style={styles.track}>
            <View style={styles.line} />
            <Animated.View style={[
              styles.box,
              { backgroundColor: '#3077bd', transform: [{ translateY: translateYLow }] },
            ]} />
          </View>
        </View>
        <View style={styles.column}>
          <Text>friction: 20</Text>
          <View style={styles.track}>
            <View style={styles.line} />
            <Animated.View style={[
              styles.box,
              { backgroundColor: '#4daf8e', transform: [{ translateY: translateYHigh }] },
            ]} />
          </View>
        </View>
      </View>

      <Text style={{ textAlign: 'center' }}>tension: 80 (vienodas)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  comparison: { flexDirection: 'row' },
  column: { flex: 1, alignItems: 'center', gap: 12 },
  track: { width: 40, height: 400, alignItems: 'center' },
  line: { position: 'absolute', width: 2, height: 400, backgroundColor: '#cbd5e1' },
  box: { width: 40, height: 40 },
});
