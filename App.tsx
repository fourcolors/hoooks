import "./app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Profiles,
  LensProvider,
} from "@lens-protocol/react-native-lens-ui-kit";
import { Ionicons } from "@expo/vector-icons";

import ProfileView from "./ProfileView";
import Mash from "./Mash";
import Feed from "./Feed";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { LensConfig, staging } from "@lens-protocol/react";
import { localStorage } from "@lens-protocol/react/web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

const { provider, webSocketProvider } = configureChains(
  [polygon, mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: AsyncStorage,
};

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileComponent({ navigation }) {
  return (
    <Profiles
      onProfilePress={(profile) => {
        return navigation.navigate("Profile", { profile });
      }}
    />
  );
}

function getTabBarIcon(route: { name: string }, focused: boolean) {
  let iconName: string;
  switch (route.name) {
    case "Feed":
      iconName = focused
        ? "ios-information-circle"
        : "ios-information-circle-outline";
      break;
    case "Profile":
      iconName = focused ? "ios-people" : "ios-people-outline";
      break;
    case "Mash":
      iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
      break;
    default:
      iconName = "";
  }
  return (
    <Ionicons name={iconName} size={24} color={focused ? "#007AFF" : "gray"} />
  );
}

export default function App() {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                return getTabBarIcon(route, focused);
              },
              tabBarActiveTintColor: "#007AFF",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Mash" component={Mash} />
            <Tab.Screen name="Profile" component={ProfileView} />
          </Tab.Navigator>
        </NavigationContainer>
      </LensProvider>
    </WagmiConfig>
  );
}
