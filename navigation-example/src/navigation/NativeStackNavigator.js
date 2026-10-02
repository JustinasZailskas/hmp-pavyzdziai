import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
// Funkcija grąžina objektą su savybėmis Navigator ir Screen
const Stack = createStackNavigator();
export default function NativeStackNavigator() {
  return (
    <NavigationContainer>
      {/* initialRouteName nurodo, kuris langas rodomas pirmas */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerStyle: { backgroundColor: "#e6f0ff" } }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Pradžia" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalės" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
