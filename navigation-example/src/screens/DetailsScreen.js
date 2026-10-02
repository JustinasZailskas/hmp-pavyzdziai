import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function DetailsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detalių langas</Text>
      {/* Programiškai grįžtame į ankstesnį langą steke */}
      <Button title="Grįžti atgal" onPress={() => navigation.goBack()} />
    </View>
  );
}
