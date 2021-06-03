import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default Cell = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cell}
      onPress={() => {
        navigation.navigate("Product", item);
      }}
    >
      <Image style={styles.img} source={{ uri: item.imageUrl }} />
      <View>
        <Text>{item.name}</Text>
        <Text>{item.brand}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    padding: 15,
  },
  img: {
    height: 100,
    width: 80,
    marginRight: 10,
  },
});
