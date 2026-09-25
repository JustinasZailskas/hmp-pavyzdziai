import { Image, StyleSheet, Text, View } from 'react-native';

export default function VairuotojoKortele({ vardas, vieta, nuotrauka }) {
  return (
    <View style={styles.kortele}>
      <Image
        source={{ uri: nuotrauka }}
        style={styles.nuotrauka}
        resizeMode="cover"
      />

      <View style={styles.informacija}>
        <Text style={styles.vardas}>{vardas}</Text>
        <Text style={styles.vieta}>Vieta sezono įskaitoje: {vieta}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kortele: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nuotrauka: {
    width: '100%',
    height: 200,
  },
  informacija: {
    padding: 16,
  },
  vardas: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  vieta: {
    fontSize: 16,
    color: '#555555',
    marginTop: 6,
  },
});
