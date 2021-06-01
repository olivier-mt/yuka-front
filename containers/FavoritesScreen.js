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

export default function Favorites() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      const newData = JSON.parse(stored);
      setData(newData);
    };
    fetchData();
  }, []);

  const seeMore = () => {
    console.log("see more");
  };

  return data ? (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.code)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cell} onPress={seeMore}>
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
