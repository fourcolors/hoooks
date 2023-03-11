import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./components/BottomTabs";
import Login from "./screens/Login";
import { useWalletConnect } from "react-native-walletconnect";

const Stack = createStackNavigator();

function Routes() {
  const { session } = useWalletConnect();
  const isLoggedIn = !!session.length;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={BottomTabs} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
