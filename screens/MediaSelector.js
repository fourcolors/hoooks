import React from "react";
import AnimatedButton from "../components/AnimatedButton";
import { View, StyleSheet } from "react-native";
import MusicBar from "../components/MusicBar";
import VideoSelector from "../components/VideoSelector";

export default function MediaSelector() {
  return (
    <View style={styles.container}>
      <VideoSelector />
      <MusicBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    alignItems: "center",
    positon: "relative",
  },
  button: {
    marginBottom: 50,
    position: "fixed",
    top: 50,
  },
});
