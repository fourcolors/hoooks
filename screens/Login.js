import { StyleSheet, View, Image } from "react-native";
import LoginButton from "../components/LoginButton";
import React from "react";

import logo from "../assets/signup.png"; // import your image file

// do the challenge and then store in context
export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <LoginButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: "100%",
    marginBottom: 30,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
