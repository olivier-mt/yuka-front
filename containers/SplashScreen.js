import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.view}>
      <AntDesign name="barcode" size={50} color="black" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
