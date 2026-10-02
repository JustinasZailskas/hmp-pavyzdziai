import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function ProductScreen() {
  const navigation = useNavigation();
  // Gauname maršruto objektą ir iš jo parametrus
  const route = useRoute();
  const { id, name, price } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Produktas #{id}: {name}
      </Text>
      <Text>Kaina: {price} EUR</Text>
      {/* push prideda NAUJĄ Product langą į steką su kitais duomenimis */}
      <Button
        title="Peržiūrėti kitą produktą"
        onPress={() =>
          navigation.push("Product", {
            id: id + 1,
            name: "Produktas " + (id + 1),
            price: price + 10,
          })
        }
      />
      {/* Grįžtame vienu langu atgal */}
      <Button title="Atgal" onPress={() => navigation.goBack()} />
      {/* Grįžtame į steko pradžią */}
      <Button title="Į sąrašo pradžią" onPress={() => navigation.popToTop()} />
    </View>
  );
}
