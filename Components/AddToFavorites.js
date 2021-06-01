import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default AddToFavorites = ({ article }) => {
  const [favorites, setFavorites] = useState();
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    const fetchAsyncStorage = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      console.log("stored==>", stored);
      const arrayStored = JSON.parse(stored);
      setFavorites(arrayStored);
      checkFavorites(arrayStored);
    };
    fetchAsyncStorage();
  }, [article]);

  const add = async () => {
    if (!favorites) {
      const newFavorites = [];
      newFavorites.push(article);
      const toString = JSON.stringify(newFavorites);
      await AsyncStorage.setItem("favorites", toString);
      setFavorites(toString);
    } else if (favorites) {
      const newFavorites = [...favorites];
      newFavorites.push(article);
      const toString = JSON.stringify(newFavorites);
      await AsyncStorage.setItem("favorites", toString);
      setFavorites(newFavorites);
    }

    setInFavorites(true);
  };

  const remove = async () => {
    const newFavorites = [...favorites];

    for (let i = 0; i < newFavorites.length; i++) {
      if (newFavorites[i].name === article.name) {
        newFavorites.splice(i, 1);

        const toString = JSON.stringify(newFavorites);

        await AsyncStorage.setItem("favorites", toString);

        setFavorites(newFavorites);
        setInFavorites(false);
      }
    }
  };

  const checkFavorites = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === article.name) {
        console.log("in the array");
        setInFavorites(true);
        break;
      } else {
        setInFavorites(false);
      }
    }
  };

  return (
    <>
      {inFavorites ? (
        <TouchableOpacity style={styles.btn} onPress={remove}>
          <Text>Retirer des favoris</Text>
          {<AntDesign name="staro" size={24} color="yellow" />}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={add}>
          <Text>Ajouter aux favoris</Text>
          {<AntDesign name="staro" size={24} color="black" />}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "lightpink",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
