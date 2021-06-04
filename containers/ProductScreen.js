import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import AddToFavorites from "../Components/AddToFavorites";

export default function ProductScreen({ apiData, route }) {
  //let apiData2 = null;
  let apiData2 = {};

  console.log("route ==>", route);

  const setData = () => {
    if (apiData && apiData.status_verbose !== "product not found") {
      // console.log("from scan");

      apiData2 = {
        name: apiData.product.product_name,
        brand: apiData.product.brands,
        nutriScore: apiData.product.nutriscore_grade,
        ecoScore: apiData.product.ecoscore_data.grade,
        novaScore: apiData.product.nova_group,
        code: apiData.code,
        imageUrl: apiData.product.image_front_small_url,
      };

      // console.log("apiData2==>", "from Api", apiData2);
      return apiData2;
    } else if (route) {
      apiData2 = {
        name: route.params.name,
        brand: route.params.brand,
        nutriScore: route.params.nutriScore,
        ecoScore: route.params.ecoScore,
        novaScore: route.params.novaScore,
        code: route.params.code,
        imageUrl: route.params.imageUrl,
      };

      // console.log("apiData2 ==>", "from scan", apiData2);
      return apiData2;
    }
  };

  setData();

  const addToProductList = () => {
    let list = [];

    const addToList = async () => {
      const data = await AsyncStorage.getItem("productList");

      if (data) {
        const dataArr = JSON.parse(data);
        list = [...dataArr];
      }

      list.push(apiData2);
      const strList = JSON.stringify(list);
      await AsyncStorage.setItem("productList", strList);
    };
    addToList();
  };

  const checkProductList = async () => {
    const data = await AsyncStorage.getItem("productList");
    const dataArr = JSON.parse(data);

    if (dataArr) {
      !dataArr.find((elem) => elem.name === apiData2.name) &&
        addToProductList();
    } else {
      addToProductList();
    }
  };

  checkProductList();

  const nutriscore = (info) => {
    if (info === "a") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>
          <View style={styles.letterView}>
            <Text>{info.toUpperCase()}</Text>
          </View>

          <Text> Bonne </Text>
        </View>
      );
    } else if (info === "b") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>
          <View style={{ ...styles.letterView, backgroundColor: "#8BBD00" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>

          <Text> Assez bonnes </Text>
        </View>
      );
    } else if (info === "c") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>

          <View style={{ ...styles.letterView, backgroundColor: "#F8CB00" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Faibles </Text>
        </View>
      );
    } else if (info === "d") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>

          <View style={{ ...styles.letterView, backgroundColor: "#E47700" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Mauvaises</Text>
        </View>
      );
    } else if (info === "e") {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#D61F00" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Très mauvaises qualité nutritionelles</Text>
        </View>
      );
    }
  };

  const ecoScore = (info) => {
    if (info === "a") {
      return (
        <View style={styles.infoLine}>
          <View style={styles.letterView}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Faible impact environnemental</Text>
        </View>
      );
    } else if (info === "b") {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#8BBD00" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Faible impact environnemental</Text>
        </View>
      );
    } else if (info === "c") {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#F8CB00" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Impact modéré sur environnemental</Text>
        </View>
      );
    } else if (info === "d") {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#E47700" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Fort impact environnemental</Text>
        </View>
      );
    } else if (info === "e") {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#D61F00" }}>
            <Text>{info.toUpperCase()}</Text>
          </View>
          <Text> Très fort impact environnemental</Text>
        </View>
      );
    }
  };

  const novaScore = (info) => {
    if (info === 1) {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#04A902" }}>
            <Text>{info}</Text>
          </View>
          <Text> Aliments non transformés ou transformés minimalement</Text>
        </View>
      );
    } else if (info === 2) {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#F8CB00" }}>
            <Text>{info}</Text>
          </View>
          <Text> Ingrédients culinaires transformés</Text>
        </View>
      );
    } else if (info === 3) {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#E47700" }}>
            <Text>{info}</Text>
          </View>
          <Text> Aliments transformés</Text>
        </View>
      );
    } else if (info === 4) {
      return (
        <View style={styles.infoLine}>
          <View style={{ ...styles.letterView, backgroundColor: "#D61F00" }}>
            <Text>{info}</Text>
          </View>
          <Text> Produits alimentaires et boissons ultra-transformés</Text>
        </View>
      );
    }
  };

  return apiData && apiData.status_verbose === "product not found" ? (
    <View>
      <Text>Nous n'avons pas d'info sur ce produit</Text>
    </View>
  ) : (
    <View>
      <View style={styles.center}>
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {apiData2.name}
          </Text>
          <Text style={styles.brand}>{apiData2.brand}</Text>
        </View>
        {apiData2.imageUrl && (
          <Image
            style={{ height: 200, width: 140 }}
            resizeMode="contain"
            source={{
              uri: apiData2.imageUrl,
            }}
          />
        )}
      </View>

      {apiData2.ecoScore && (
        <View style={styles.scoreView}>
          <Text style={styles.scoreTitle}>Eco Score:</Text>
          {ecoScore(apiData2.ecoScore)}
        </View>
      )}
      {apiData2.novaScore && (
        <View style={styles.scoreView}>
          <Text style={styles.scoreTitle}>Nova Score:</Text>
          {novaScore(apiData2.novaScore)}
        </View>
      )}
      {apiData2.nutriScore && (
        <View style={styles.scoreView}>
          <Text style={styles.scoreTitle}>Nutri Score:</Text>
          {nutriscore(apiData2.nutriScore)}
        </View>
      )}
      <AddToFavorites
        article={{
          ...apiData2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productScreen: {
    backgroundColor: "lightblue",
  },
  infoLine: {
    flexDirection: "row",
    //  backgroundColor: "lightgreen",
  },
  letterView: {
    color: "white",
    backgroundColor: "#00823C",
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  part1: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    //marginBottom: 5,
    marginTop: 5,
    // backgroundColor: "lightblue",
  },
  brand: {
    fontWeight: "300",
    color: "gray",
    fontSize: 20,
    // backgroundColor: "lightblue",
  },

  scoreView: {
    backgroundColor: "lightpink",
    marginBottom: 5,
  },

  scoreTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
});
