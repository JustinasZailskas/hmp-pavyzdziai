import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NativeStackNavigator from "./src/navigation/NativeStackNavigator";
import Navigation from "./src/navigation/NativeStackNavigatorStatic";
import TabNavigation from "./src/navigation/BottomTabNavigator";

export default function App() {
  return <TabNavigation />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
