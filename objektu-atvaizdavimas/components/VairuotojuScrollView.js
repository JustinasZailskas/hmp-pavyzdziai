import { ScrollView, StyleSheet, Text } from 'react-native';

import VairuotojoKortele from './VairuotojoKortele';

export default function VairuotojuScrollView({ duomenys }) {
  return (
    <ScrollView contentContainerStyle={styles.turinys}>
      <Text style={styles.antraste}>Drift Masters 2026</Text>

      {duomenys.map((vairuotojas) => (
        <VairuotojoKortele
          key={vairuotojas.id}
          vardas={vairuotojas.vardas}
          vieta={vairuotojas.vieta}
          nuotrauka={vairuotojas.nuotrauka}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  turinys: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f2f2f2',
  },
  antraste: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
