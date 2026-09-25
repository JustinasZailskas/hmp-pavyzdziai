import { SectionList, StyleSheet, Text } from 'react-native';

import VairuotojoKortele from './VairuotojoKortele';

export default function VairuotojuSectionList({ sekcijos }) {
  return (
    <SectionList
      sections={sekcijos}
      keyExtractor={(vairuotojas) => vairuotojas.id}
      renderItem={({ item }) => (
        <VairuotojoKortele
          vardas={item.vardas}
          vieta={item.vieta}
          nuotrauka={item.nuotrauka}
        />
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sezonoAntraste}>{section.title}</Text>
      )}
      ListHeaderComponent={
        <Text style={styles.antraste}>Drift Masters rezultatai</Text>
      }
      contentContainerStyle={styles.turinys}
      stickySectionHeadersEnabled={false}
    />
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
  sezonoAntraste: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
});
