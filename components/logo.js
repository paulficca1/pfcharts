import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Logo() {
  return (
    <View
      style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Image source={require("../assets/logo.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 100,
  },
});
