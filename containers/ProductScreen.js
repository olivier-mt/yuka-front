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
          <Text style={styles.letterView}>{info.toUpperCase()}</Text>
          <Text> Bonne </Text>
        </View>
      );
    } else if (info === "b") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>
          <Text style={{ ...styles.letterView, backgroundColor: "#8BBD00" }}>
            {info.toUpperCase()}
          </Text>
          <Text> Assez bonnes </Text>
        </View>
      );
    } else if (info === "c") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>

          <Text style={{ ...styles.letterView, backgroundColor: "#F8CB00" }}>
            {info.toUpperCase()}
          </Text>
          <Text> Faibles </Text>
        </View>
      );
    } else if (info === "d") {
      return (
        <View style={styles.infoLine}>
          <Text>Qualités nutritionelles: </Text>
          <Text style={{ ...styles.letterView, backgroundColor: "#E47700" }}>
            {info.toUpperCase()}
          </Text>
          <Text> Mauvaises</Text>
        </View>
      );
    } else if (info === "e") {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#D61F00" }}>
              {info.toUpperCase()}
            </Text>
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
          <View>
            <Text style={styles.letterView}>{info.toUpperCase()}</Text>
          </View>
          <Text> Faible impact environnemental</Text>
        </View>
      );
    } else if (info === "b") {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#8BBD00" }}>
              {info.toUpperCase()}
            </Text>
          </View>
          <Text> Faible impact environnemental</Text>
        </View>
      );
    } else if (info === "c") {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#F8CB00" }}>
              {info.toUpperCase()}
            </Text>
          </View>
          <Text> Impact modéré sur environnemental</Text>
        </View>
      );
    } else if (info === "d") {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#E47700" }}>
              {info.toUpperCase()}
            </Text>
          </View>
          <Text> Fort impact environnemental</Text>
        </View>
      );
    } else if (info === "e") {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#D61F00" }}>
              {info.toUpperCase()}
            </Text>
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
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#04A902" }}>
              {info}
            </Text>
          </View>
          <Text> Aliments non transformés ou transformés minimalement</Text>
        </View>
      );
    } else if (info === 2) {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#F8CB00" }}>
              {info}
            </Text>
          </View>
          <Text> Ingrédients culinaires transformés</Text>
        </View>
      );
    } else if (info === 3) {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#E47700" }}>
              {info}
            </Text>
          </View>
          <Text> Aliments transformés</Text>
        </View>
      );
    } else if (info === 4) {
      return (
        <View style={styles.infoLine}>
          <View>
            <Text style={{ ...styles.letterView, backgroundColor: "#D61F00" }}>
              {info}
            </Text>
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
    /* <View>
      {apiData2.product.image_front_small_url && (
        <Image
          style={{ height: 200, width: 90 }}
          source={{
            uri: apiData2.product.image_front_small_url,
          }}
        />
      )}
      <Text style={styles.productScreen}>{apiData2.product.product_name}</Text>
      <Text style={styles.productScreen}>{apiData2.product.brands}</Text>
      {apiData2.product.ecoscore_data.grade &&
        ecoScore(apiData2.product.ecoscore_data.grade)}
      {apiData2.product.nova_group && novaScore(apiData2.product.nova_group)}
      {apiData2.product.nutriscore_grade &&
        nutriscore(apiData2.product.nutriscore_grade)}
      <AddToFavorites
        article={{
          name: apiData2.product.product_name,
          brand: apiData2.product.brands,
          nutriScore: apiData2.product.nutriscore_grade,
          ecoScore: apiData2.product.ecoscore_data.grade,
          novaScore: apiData2.product.nova_group,
          code: apiData2.code,
          imageUrl: apiData2.product.image_front_small_url,
        }}
      />
    </View>*/
    <View>
      {apiData2.imageUrl && (
        <Image
          style={{ height: 200, width: 90 }}
          source={{
            uri: apiData2.imageUrl,
          }}
        />
      )}
      <Text style={styles.productScreen}>{apiData2.name}</Text>
      <Text style={styles.productScreen}>{apiData2.brand}</Text>
      {apiData2.ecoScore && ecoScore(apiData2.ecoScore)}
      {apiData2.novaScore && novaScore(apiData2.novaScore)}
      {apiData2.nutriScore && nutriscore(apiData2.nutriScore)}
      <AddToFavorites
        article={{
          /*  name: apiData2.product.product_name,
          brand: apiData2.product.brands,
          nutriScore: apiData2.product.nutriscore_grade,
          ecoScore: apiData2.product.ecoscore_data.grade,
          novaScore: apiData2.product.nova_group,
          code: apiData2.code,
          imageUrl: apiData2.product.image_front_small_url,*/
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
    backgroundColor: "lightgreen",
  },
  letterView: {
    color: "white",
    backgroundColor: "#00823C",
  },
});
