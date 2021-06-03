import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cell from "../Components/Cell";
import { useIsFocused } from "@react-navigation/native";

export default function ProductsScreen() {
  //const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [list, setList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const productList = await AsyncStorage.getItem("productList");
      const productListObj = JSON.parse(productList);
      setList(productListObj);

      // console.log("productList ==>", productList);
    };
    fetchData();
  }, [isFocused]);

  return list ? (
    <View>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.code)}
        renderItem={({ item }) => <Cell item={item} />}
      />

      <Button
        onPress={() => {
          AsyncStorage.removeItem("productList");
        }}
        title="supprimer"
      ></Button>
    </View>
  ) : (
    <View>
      <Text>Scannez des produits</Text>
    </View>
  );
}
