import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Feed } from "@lens-protocol/react-native-lens-ui-kit";

export default function App() {
  return (
    <View style={styles.container}>
      <Feed hideLikes={true} hideMirrors={true} hideCollects={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
