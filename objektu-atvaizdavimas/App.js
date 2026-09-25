import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import VairuotojoKortele from './components/VairuotojoKortele';

const vairuotojai = [
  {
    id: '1',
    vardas: 'James Deane',
    vieta: 4,
    nuotrauka:
      'https://dm.gp/media/elql12fy/dmgp-2026-r5-latvia-hires-02-friday-paddy-mcgrath-294.jpg?width=800&height=600',
  },
  {
    id: '2',
    vardas: 'Conor Shanahan',
    vieta: 2,
    nuotrauka:
      'https://dm.gp/media/jmqg32yo/dmgp-2026-r4-finland-3x2-paddy-mcgrath-321618.jpg?width=800&height=600',
  },
  {
    id: '3',
    vardas: 'Benediktas Čirba',
    vieta: 12,
    nuotrauka:
      'https://dm.gp/media/3p0nla3p/dmgp-2026-r5-latvia-hires-02-friday-paddy-mcgrath-281.jpg?width=800&height=600',
  },
  {
    id: '4',
    vardas: 'Simen Olsen',
    vieta: 21,
    nuotrauka:
      'https://dm.gp/media/foycsift/dmgp-2026-r5-latvia-hires-02-friday-paddy-mcgrath-249.jpg?width=800&height=600',
  },
  {
    id: '5',
    vardas: 'Piotr Więcek',
    vieta: 3,
    nuotrauka:
      'https://dm.gp/media/jtrni0uw/dmgp-2026-r5-latvia-hires-02-friday-paddy-mcgrath-292.jpg?width=800&height=600',
  },
];

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.turinys}>
      <Text style={styles.antraste}>Drift Masters 2026</Text>

      {vairuotojai.map((vairuotojas) => (
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
