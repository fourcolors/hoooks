import React from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";

export default function AnimatedButton({ title, onPress }) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4E73D5",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
