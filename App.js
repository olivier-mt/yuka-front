import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import ProductsScreen from "./containers/ProductsScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import CameraScreen from "./containers/CameraScreen";
import SplashScreen from "./containers/SplashScreen";
import ProductScreen from "./containers/ProductScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Products"
                  options={{
                    tabBarLabel: "Products",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="fruit-cherries"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "My App",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <ProductsScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Camera"
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="barcode-scan"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => {
                    return <CameraScreen />;
                  }}
                </Tab.Screen>

                <Tab.Screen
                  name="Favorites"
                  options={{
                    tabBarLabel: "Favoris",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="staro" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Favorites"
                        options={{ title: "Favoris", tabBarLabel: "Favorites" }}
                      >
                        {(props) => <FavoritesScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
          {/*PRODUCT*/}
          <Stack.Screen name="Product" options={{ title: "Product" }}>
            {(props) => <ProductScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
