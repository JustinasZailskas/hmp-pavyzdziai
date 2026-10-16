import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
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
        onPress={() => navigation.navigate('FadeInExample')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.exampleTitle}>2. FadeIn su useRef</Text>
        <Text style={styles.exampleDescription}>Tekstas palaipsniui pasirodo per 1 sekundę</Text>
      </Pressable>
    </View>
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
    flex: 1,
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
