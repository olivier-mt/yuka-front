import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from "react-native";
//import { useEffect } from "react/cjs/react.development";
import ProductScreen from "../containers/ProductScreen";

export default function ProductModal({
  modalVisible,
  setModalVisible,
  apiData,
  scanned,
  setScanned,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={scanned} //{modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHead}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setScanned(false);
              }}
            >
              <Text style={styles.textStyle}></Text>
            </TouchableHighlight>
          </View>

          {apiData ? (
            //<Text style={styles.modalText}>{apiData.product.product_name}</Text>
            <ProductScreen apiData={apiData} />
          ) : (
            <Text style={styles.modalText}>Please wait...</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    padding: 20,
    width: "90%",
    height: "50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHead: {
    backgroundColor: "lightgrey",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 40,
    height: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
