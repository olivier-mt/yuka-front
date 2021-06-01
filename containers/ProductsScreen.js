import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function ProductsScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
}
