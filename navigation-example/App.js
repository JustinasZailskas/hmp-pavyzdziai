import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NativeStackNavigator from "./src/navigation/NativeStackNavigator";

export default function App() {
  return <NativeStackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
