import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import AddToFavorites from "../Components/AddToFavorites";

export default function ProductScreen({ apiData }) {
  // console.log(apiData);

  // useEffect(() => {}, [apiData]);

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

  return apiData.status_verbose === "product not found" ? (
    <View>
      <Text>Nous n'avons pas d'info sur ce produit</Text>
    </View>
  ) : (
    <View>
      {apiData.product.image_front_small_url && (
        <Image
          style={{ height: 200, width: 90 }}
          source={{ uri: apiData.product.image_front_small_url }}
        />
      )}
      <Text style={styles.productScreen}>{apiData.product.product_name}</Text>
      <Text style={styles.productScreen}>{apiData.product.brands}</Text>
      {apiData.product.ecoscore_data.grade &&
        /* <Text style={styles.productScreen}>
          eco score {apiData.product.ecoscore_data.grade}
        </Text>*/
        ecoScore(apiData.product.ecoscore_data.grade)}
      {apiData.product.nova_group &&
        /*<Text style={styles.productScreen}>
          transformation {apiData.product.nova_group}
        </Text>*/
        novaScore(apiData.product.nova_group)}
      {apiData.product.nutriscore_grade &&
        /*<Text style={styles.productScreen}>
          nutri-score {apiData.product.nutriscore_grade}
        </Text>*/
        nutriscore(apiData.product.nutriscore_grade)}
      <AddToFavorites
        article={{
          name: apiData.product.product_name,
          brand: apiData.product.brands,
          nutriScore: apiData.product.nutriscore_grade,
          ecoScore: apiData.product.ecoscore_data.grade,
          novaScore: apiData.product.nova_group,
          code: apiData.code,
          imageUrl: apiData.product.image_front_small_url,
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
