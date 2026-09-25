import { FlatList, StyleSheet, Text } from 'react-native';

// Vieno vairuotojo išvaizda aprašyta atskirame komponente,
// todėl tą pačią kortelę galima naudoti ir kituose sąrašuose.
import VairuotojoKortele from './VairuotojoKortele';

// Komponentas gauna vairuotojų masyvą per „duomenys“ parametrą (props).
export default function VairuotojuFlatList({ duomenys }) {
  // „FlatList“ perduoda vieną masyvo elementą kaip „item“.
  // Iš jo duomenų sukuriama viena vairuotojo kortelė.
  const atvaizduotiVairuotoja = ({ item }) => (
    <VairuotojoKortele
      vardas={item.vardas}
      vieta={item.vieta}
      nuotrauka={item.nuotrauka}
    />
  );

  return (
    <FlatList
      // Nurodo, kurį duomenų masyvą turi atvaizduoti sąrašas.
      data={duomenys}
      // Grąžina unikalų kiekvieno vairuotojo raktą.
      // Jis padeda „React“ efektyviai atnaujinti sąrašo elementus.
      keyExtractor={(vairuotojas) => vairuotojas.id}
      // Nurodo funkciją, kuri atvaizduoja kiekvieną masyvo elementą.
      renderItem={atvaizduotiVairuotoja}
      // Atvaizduoja antraštę prieš pirmąjį sąrašo elementą.
      ListHeaderComponent={
        <Text style={styles.antraste}>Drift Masters 2026</Text>
      }
      // Pritaiko stilius visam slenkamam sąrašo turiniui.
      contentContainerStyle={styles.turinys}
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
});
