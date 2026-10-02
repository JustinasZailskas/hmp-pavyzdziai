import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Pagrindinis skirtukas: pradinis langas steko viduje
export function FeedScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Naujienų srautas</Text>
      <Button
        title="Atidaryti straipsnį"
        onPress={() =>
          navigation.navigate("Article", { title: "Hibridinės programėlės" })
        }
      />
    </View>
  );
}
// Antras langas steko viduje, gauna parametrą
export function ArticleScreen({ route }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Straipsnis: {route.params.title}</Text>
      <Button title="Atgal" onPress={() => navigation.goBack()} />
    </View>
  );
}
export function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Vartotojo profilis</Text>
    </View>
  );
}
export function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Nustatymai</Text>
      {/* Per skirtuką pereiname į kitą skirtuką pagal jo pavadinimą */}
      <Button
        title="Eiti į profilį"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}
