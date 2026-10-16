import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Animacijų pavyzdžiai
      </Text>

      <Text style={styles.description}>
        Pasirinkite paskaitos pavyzdį iš sąrašo.
      </Text>

      <Pressable
        onPress={() => navigation.navigate('UseRefExample')}
      >
        <Text style={styles.exampleTitle}>1. useState ir useRef</Text>
        <Text style={styles.exampleDescription}>Skaitikliai ir ekrano persipiešimas</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('FirstAnimationExampleUseRef')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>2. FadeIn su useRef</Text>
        <Text style={styles.exampleDescription}>Tekstas palaipsniui pasirodo per 1 sekundę</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('SecondAnimationExampleTiming')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>3. Animated.timing</Text>
        <Text style={styles.exampleDescription}>Kvadrato marginTop keičiasi nuo 20 iki 200</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('ThirdAnimationExampleSpring')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>4. Animated.spring</Text>
        <Text style={styles.exampleDescription}>Palyginame friction: 4 ir friction: 20</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('FourthAnimationExampleDecay')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>5. Animated.decay — inercija</Text>
        <Text style={styles.exampleDescription}>Kvadratas slysta į dešinę ir palaipsniui sustoja</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('FifthAnimationExampleComposition')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>6. Animacijų komponavimas</Text>
        <Text style={styles.exampleDescription}>sequence → delay → parallel</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('SixthAnimationExampleInterpolation')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>7. Interpoliacija</Text>
        <Text style={styles.exampleDescription}>Judėjimas, sukimasis ir extend / clamp</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('SeventhAnimationExampleTracking')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>8. Dinaminių reikšmių sekimas</Text>
        <Text style={styles.exampleDescription}>Sekantys apskritimai ir nuo pozicijos priklausantis opacity</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('EighthAnimationExampleGestureTracking')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>9. Gestų sekimas: Animated.event</Text>
        <Text style={styles.exampleDescription}>Kvadrato tempimas su PanResponder</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  example: {
    padding: 18,
    minHeight: 72,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dce3eb',
  },
  exampleTitle: { fontSize: 18, fontWeight: '600', color: '#0b5cab' },
  exampleDescription: { fontSize: 14, color: '#6b7280', marginTop: 6 },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
});
