import React, { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const storage = createAsyncStorage('krepsinis');
const SARASO_RAKTAS = 'krepsininkai';
const SENAS_RAKTAS = 'krepsininkas';

export default function App() {
  const [vardas, setVardas] = useState('');
  const [pavarde, setPavarde] = useState('');
  const [pozicija, setPozicija] = useState('');
  const [komanda, setKomanda] = useState('');

  const [krepsininkai, setKrepsininkai] = useState([]);
  const [pranesimas, setPranesimas] = useState('');
  const [kraunama, setKraunama] = useState(true);
  const [saugoma, setSaugoma] = useState(false);

  useEffect(() => {
    async function ikeltiDuomenis() {
      try {
        const tekstas = await storage.getItem(SARASO_RAKTAS);

        if (tekstas !== null) {
          setKrepsininkai(JSON.parse(tekstas));
        } else {
          // Perkeliame ankstesnio pavyzdžio žaidėją į sąrašą.
          const senasTekstas = await storage.getItem(SENAS_RAKTAS);

          if (senasTekstas !== null) {
            const zaidejas = {
              ...JSON.parse(senasTekstas),
              id: 'ankstesnis-zaidejas',
            };

            const sarasas = [zaidejas];

            await storage.setItem(
              SARASO_RAKTAS,
              JSON.stringify(sarasas)
            );

            setKrepsininkai(sarasas);
            await storage.removeItem(SENAS_RAKTAS);
          }
        }
      } catch (klaida) {
        console.error(klaida);
        setPranesimas('Nepavyko įkelti žaidėjų.');
      } finally {
        setKraunama(false);
      }
    }

    ikeltiDuomenis();
  }, []);

  async function pridetiZaideja() {
    if (saugoma) return;

    if (
      !vardas.trim() ||
      !pavarde.trim() ||
      !pozicija.trim() ||
      !komanda.trim()
    ) {
      setPranesimas('Užpildykite visus laukus.');
      return;
    }

    const naujasZaidejas = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      vardas: vardas.trim(),
      pavarde: pavarde.trim(),
      pozicija: pozicija.trim(),
      komanda: komanda.trim(),
    };

    const naujasSarasas = [...krepsininkai, naujasZaidejas];

    setSaugoma(true);
    setPranesimas('');

    try {
      await storage.setItem(
        SARASO_RAKTAS,
        JSON.stringify(naujasSarasas)
      );

      setKrepsininkai(naujasSarasas);

      // Išvalome formą, kad būtų galima pridėti kitą žaidėją.
      setVardas('');
      setPavarde('');
      setPozicija('');
      setKomanda('');

      setPranesimas('Žaidėjas pridėtas.');
    } catch (klaida) {
      console.error(klaida);
      setPranesimas('Nepavyko pridėti žaidėjo.');
    } finally {
      setSaugoma(false);
    }
  }

  async function pasalintiZaideja(id) {
    if (saugoma) return;

    // Paliekame visus žaidėjus, išskyrus pasirinktą.
    const naujasSarasas = krepsininkai.filter(
      (zaidejas) => zaidejas.id !== id
    );

    setSaugoma(true);
    setPranesimas('');

    try {
      // Išsaugome sąrašą be pašalinto žaidėjo.
      await storage.setItem(
        SARASO_RAKTAS,
        JSON.stringify(naujasSarasas)
      );

      setKrepsininkai(naujasSarasas);
      setPranesimas('Žaidėjas pašalintas.');
    } catch (klaida) {
      console.error(klaida);
      setPranesimas('Nepavyko pašalinti žaidėjo.');
    } finally {
      setSaugoma(false);
    }
  }
  async function pasalintiVisusZaidejus() {
    if (saugoma) return;

    setSaugoma(true);
    setPranesimas('');

    try {
      // Pašaliname visą išsaugotą sąrašą.
      await storage.removeItem(SARASO_RAKTAS);

      // Pašaliname seno pavyzdžio įrašą, kad jis nebūtų atkurtas.
      await storage.removeItem(SENAS_RAKTAS);

      // Išvalome ekrane rodomą sąrašą.
      setKrepsininkai([]);
      setPranesimas('Visi krepšininkai pašalinti.');
    } catch (klaida) {
      console.error(klaida);
      setPranesimas('Nepavyko pašalinti visų krepšininkų.');
    } finally {
      setSaugoma(false);
    }
  }

  return (
    <ScrollView
      style={styles.ekranas}
      contentContainerStyle={styles.turinys}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.antraste}>Krepšininkų sąrašas</Text>

      {kraunama ? (
        <Text>Įkeliami duomenys...</Text>
      ) : (
        <>
          <Text style={styles.uzrasas}>Vardas</Text>
          <TextInput
            style={styles.laukas}
            value={vardas}
            onChangeText={setVardas}
            placeholder="Jonas"
            editable={!saugoma}
          />

          <Text style={styles.uzrasas}>Pavardė</Text>
          <TextInput
            style={styles.laukas}
            value={pavarde}
            onChangeText={setPavarde}
            placeholder="Jonaitis"
            editable={!saugoma}
          />

          <Text style={styles.uzrasas}>Pozicija</Text>
          <TextInput
            style={styles.laukas}
            value={pozicija}
            onChangeText={setPozicija}
            placeholder="Įžaidėjas"
            editable={!saugoma}
          />

          <Text style={styles.uzrasas}>Komanda</Text>
          <TextInput
            style={styles.laukas}
            value={komanda}
            onChangeText={setKomanda}
            placeholder="Žalgiris"
            editable={!saugoma}
          />

          <Button
            title="Pridėti žaidėją"
            onPress={pridetiZaideja}
            disabled={saugoma}
          />

          <Text style={styles.pranesimas}>{pranesimas}</Text>

          <Text style={styles.paantraste}>
            Išsaugoti žaidėjai ({krepsininkai.length})
          </Text>
          <View style={{ marginBottom: 16 }}>
            <Button
              title="Pašalinti visus krepšininkus"
              color="#c62828"
              onPress={pasalintiVisusZaidejus}
              disabled={saugoma || krepsininkai.length === 0}
            />
          </View>

          {krepsininkai.length === 0 ? (
            <Text>Sąrašas tuščias.</Text>
          ) : (
            krepsininkai.map((zaidejas) => (
              <View key={zaidejas.id} style={styles.kortele}>
                <Text style={styles.vardas}>
                  {zaidejas.vardas} {zaidejas.pavarde}
                </Text>

                <Text style={styles.detale}>
                  Pozicija: {zaidejas.pozicija}
                </Text>

                <Text style={styles.detale}>
                  Komanda: {zaidejas.komanda}
                </Text>

                <View style={styles.mygtukas}>
                  <Button
                    title="Pašalinti"
                    color="#c62828"
                    onPress={() => pasalintiZaideja(zaidejas.id)}
                    disabled={saugoma}
                  />
                </View>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ekranas: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  turinys: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  antraste: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  uzrasas: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  laukas: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
  },
  pranesimas: {
    marginTop: 12,
    fontSize: 16,
  },
  paantraste: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  kortele: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  vardas: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detale: {
    fontSize: 16,
    marginTop: 4,
  },
  mygtukas: {
    marginTop: 16,
  },
});