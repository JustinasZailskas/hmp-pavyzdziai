import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import {
  FeedScreen,
  ArticleScreen,
  ProfileScreen,
  SettingsScreen,
} from "../screens/SimpleScreens";
// Vidinis stekas, kuris bus rodomas pirmame skirtuke
const HomeStack = createNativeStackNavigator({
  screens: {
    Feed: { screen: FeedScreen, options: { title: "Naujienos" } },
    Article: { screen: ArticleScreen, options: { title: "Straipsnis" } },
  },
});
// Apatinių skirtukų navigatorius
const MyTabs = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: { tabBarActiveTintColor: "#0a58ca" },
  screens: {
    Home: {
      screen: HomeStack, // skirtuko turinys - visas stekas
      options: { title: "Pagrindinis", headerShown: false },
    },
    Profile: { screen: ProfileScreen, options: { title: "Profilis" } },
    Settings: { screen: SettingsScreen, options: { title: "Nustatymai" } },
  },
});
const TabNavigation = createStaticNavigation(MyTabs);

export default TabNavigation;