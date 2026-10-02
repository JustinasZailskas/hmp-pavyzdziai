import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
const PRODUCTS = [
  { id: 1, name: "Klaviatūra", price: 29 },
  { id: 2, name: "Pelė", price: 15 },
  { id: 3, name: "Monitorius", price: 140 },
];
export default function ProductListScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Produktai</Text>
      {PRODUCTS.map((item) => (
        <Button
          key={item.id}
          title={item.name}
          // Perduodame parametrus maršrutui kaip objektą
          onPress={() =>
            navigation.navigate("Product", {
              id: item.id,
              name: item.name,
              price: item.price,
            })
          }
        />
      ))}
    </View>
  );
}
