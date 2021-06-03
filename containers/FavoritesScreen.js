import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function Favorites({ navigation, route }) {
  const [data, setData] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      const newData = JSON.parse(stored);
      setData(newData);
    };
    fetchData();
  }, [isFocused]);

  return data ? (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.code)}
        renderItem={({ item }) => (
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
        )}
      />
    </>
  ) : (
    <View>
      <Text>Is Loading...</Text>
    </View>
  );
}
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
