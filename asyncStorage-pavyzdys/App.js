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
const PLAYERS_KEY = 'krepsininkai';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [team, setTeam] = useState('');

  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const storedText = await storage.getItem(PLAYERS_KEY);

        if (storedText !== null) {
          const savedPlayers = JSON.parse(storedText);

          if (!Array.isArray(savedPlayers)) {
            throw new Error('Išsaugoti duomenys nėra krepšininkų sąrašas.');
          }

          setPlayers(savedPlayers);
        }
      } catch (error) {
        console.error(error);
        setMessage('Nepavyko įkelti žaidėjų.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPlayers();
  }, []);

  async function addPlayer() {
    if (isSaving) return;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !position.trim() ||
      !team.trim()
    ) {
      setMessage('Užpildykite visus laukus.');
      return;
    }

    const newPlayer = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      'vardas': firstName.trim(),
      'pavarde': lastName.trim(),
      'pozicija': position.trim(),
      'komanda': team.trim(),
    };

    const updatedPlayers = [...players, newPlayer];

    setIsSaving(true);
    setMessage('');

    try {
      await storage.setItem(
        PLAYERS_KEY,
        JSON.stringify(updatedPlayers)
      );

      setPlayers(updatedPlayers);

      // Išvalome formą, kad būtų galima pridėti kitą žaidėją.
      setFirstName('');
      setLastName('');
      setPosition('');
      setTeam('');

      setMessage('Žaidėjas pridėtas.');
    } catch (error) {
      console.error(error);
      setMessage('Nepavyko pridėti žaidėjo.');
    } finally {
      setIsSaving(false);
    }
  }

  async function removePlayer(id) {
    if (isSaving) return;

    // Paliekame visus žaidėjus, išskyrus pasirinktą.
    const updatedPlayers = players.filter(
      (player) => player.id !== id
    );

    setIsSaving(true);
    setMessage('');

    try {
      // Išsaugome sąrašą be pašalinto žaidėjo.
      await storage.setItem(
        PLAYERS_KEY,
        JSON.stringify(updatedPlayers)
      );

      setPlayers(updatedPlayers);
      setMessage('Žaidėjas pašalintas.');
    } catch (error) {
      console.error(error);
      setMessage('Nepavyko pašalinti žaidėjo.');
    } finally {
      setIsSaving(false);
    }
  }

  async function removeAllPlayers() {
    if (isSaving) return;

    setIsSaving(true);
    setMessage('');

    try {
      // Pašaliname visą išsaugotą sąrašą.
      await storage.removeItem(PLAYERS_KEY);

      // Išvalome ekrane rodomą sąrašą.
      setPlayers([]);
      setMessage('Visi krepšininkai pašalinti.');
    } catch (error) {
      console.error(error);
      setMessage('Nepavyko pašalinti visų krepšininkų.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Krepšininkų sąrašas</Text>

      {isLoading ? (
        <Text>Įkeliami duomenys...</Text>
      ) : (
        <>
          <Text style={styles.label}>Vardas</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Jonas"
            editable={!isSaving}
          />

          <Text style={styles.label}>Pavardė</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Jonaitis"
            editable={!isSaving}
          />

          <Text style={styles.label}>Pozicija</Text>
          <TextInput
            style={styles.input}
            value={position}
            onChangeText={setPosition}
            placeholder="Įžaidėjas"
            editable={!isSaving}
          />

          <Text style={styles.label}>Komanda</Text>
          <TextInput
            style={styles.input}
            value={team}
            onChangeText={setTeam}
            placeholder="Žalgiris"
            editable={!isSaving}
          />

          <Button
            title="Pridėti žaidėją"
            onPress={addPlayer}
            disabled={isSaving}
          />

          <Text style={styles.message}>{message}</Text>

          <Text style={styles.subheading}>
            Išsaugoti žaidėjai ({players.length})
          </Text>
          <View style={{ marginBottom: 16 }}>
            <Button
              title="Pašalinti visus krepšininkus"
              color="#c62828"
              onPress={removeAllPlayers}
              disabled={isSaving || players.length === 0}
            />
          </View>

          {players.length === 0 ? (
            <Text>Sąrašas tuščias.</Text>
          ) : (
            players.map((player) => (
              <View key={player.id} style={styles.card}>
                <Text style={styles.playerName}>
                  {player['vardas']} {player['pavarde']}
                </Text>

                <Text style={styles.detail}>
                  Pozicija: {player['pozicija']}
                </Text>

                <Text style={styles.detail}>
                  Komanda: {player['komanda']}
                </Text>

                <View style={styles.button}>
                  <Button
                    title="Pašalinti"
                    color="#c62828"
                    onPress={() => removePlayer(player.id)}
                    disabled={isSaving}
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
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  playerName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    marginTop: 16,
  },
});
