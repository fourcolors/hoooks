import { Image, StyleSheet } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import MediaSelector from "../screens/MediaSelector";

const BottomTab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", borderTopWidth: 0 },
        headerShown: false,
        tabBarActiveTintColor: "white",
      }}
    >
      <BottomTab.Screen
        name="Discover"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/home.png")}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MediaSelector"
        component={MediaSelector}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/hoooksfavi.png")}
              style={styles.newVideoButton}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/user.png")}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  bottomTabIconFocused: {
    tintColor: "white",
  },
  newVideoButton: {
    width: 50,
    height: 25,
  },
});
