import { SectionList, StyleSheet, Text } from 'react-native';

// Šis komponentas aprašo, kaip atrodo vienas sąrašo vairuotojas.
import VairuotojoKortele from './VairuotojoKortele';

// Komponentas per „sekcijos“ parametrą gauna sezonų sąrašą.
// Kiekviena sekcija turi „title“ ir jai priklausantį „data“ masyvą.
export default function VairuotojuSectionList({ sekcijos }) {
  return (
    <SectionList
      // Duomenys, suskirstyti į atskiras sekcijas pagal sezoną.
      sections={sekcijos}

      // Grąžina unikalų kiekvieno vairuotojo raktą.
      // Jis padeda „React“ atpažinti ir efektyviai atnaujinti elementus.
      keyExtractor={(vairuotojas) => vairuotojas.id}

      // „item“ yra vienas vairuotojas iš sekcijos „data“ masyvo.
      // Kiekvienam vairuotojui sukuriamas kortelės komponentas.
      renderItem={({ item }) => (
        <VairuotojoKortele
          vardas={item.vardas}
          vieta={item.vieta}
          nuotrauka={item.nuotrauka}
        />
      )}

      // Atvaizduoja kiekvienos sekcijos antraštę, pavyzdžiui,
      // „2026 sezonas“ arba „2025 sezonas“.
      renderSectionHeader={({ section }) => (
        <Text style={styles.sezonoAntraste}>{section.title}</Text>
      )}

      // Atvaizduoja bendrą antraštę prieš visas sezonų sekcijas.
      ListHeaderComponent={
        <Text style={styles.antraste}>Drift Masters rezultatai</Text>
      }

      // Pritaiko stilius visam slenkamam sąrašo turiniui.
      contentContainerStyle={styles.turinys}

      // „false“ reiškia, kad sezono antraštė neprilips prie ekrano viršaus.
      stickySectionHeadersEnabled={false}
    />
  );
}

// „StyleSheet“ saugo šiame komponente naudojamus stilius.
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
