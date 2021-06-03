import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductsScreen() {
  //const navigation = useNavigation();
  const [list, setList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const productList = await AsyncStorage.getItem("productList");
      const productListObj = JSON.parse(productList);

      console.log("productList ==>", productList);
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
}
