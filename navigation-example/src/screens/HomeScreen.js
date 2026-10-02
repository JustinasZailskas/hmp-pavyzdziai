import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function HomeScreen() {
  // Gauname navigacijos objektą
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pradinis langas</Text>
      {/* Pereiname į langą, kurio maršruto pavadinimas yra 'Details' */}
      <Button
        title="Eiti į detales"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
