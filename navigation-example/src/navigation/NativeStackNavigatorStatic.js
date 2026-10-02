import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import ProductListScreen from "../screens/ProductListScreen";
import ProductScreen from "../screens/ProductScreen";
// Statinė konfigūracija: aprašoma iš anksto ir programos veikimo metu nekeičiama
const RootStack = createNativeStackNavigator({
  initialRouteName: "ProductList",
  // screenOptions taikomos visiems langams
  screenOptions: { headerTintColor: "#0a58ca" },
  screens: {
    ProductList: {
      screen: ProductListScreen,
      options: { title: "Produktų sąrašas" },
    },
    Product: {
      screen: ProductScreen,
      // Antraštę galima keisti pagal gautus parametrus
      options: ({ route }) => ({ title: route.params.name }),
    },
  },
});
// Sukuriame komponentą, kurį atvaizduosime programoje
const Navigation = createStaticNavigation(RootStack);

export default Navigation;
