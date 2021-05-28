import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Modal,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ProductModal from "../Components/ProductModal";
import axios from "axios";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const sendrequest = async (barCode) => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barCode}.json`
      );

      setApiData(response.data);

      // console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    //  alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    sendrequest(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
      />
      <ProductModal
        modalVisible={apiData ? true : false} //{modalVisible}
        setModalVisible={setModalVisible}
        apiData={apiData}
        scanned={scanned}
        setScanned={setScanned}
      />
      {/*<Button
        title="Open modal"
        onPress={() => {
          setModalVisible(true);
        }}
    />*/}

      {/* scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )*/}
    </View>
  );
};

export default CameraScreen;
