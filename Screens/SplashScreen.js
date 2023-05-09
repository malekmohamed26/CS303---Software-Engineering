import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Logo from "../images/test1.png";
import * as Font from "expo-font";

export default function SplashScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "my-custom-font": require("../fonts/Lobster/Lobster-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  setTimeout(() => {
    navigation.navigate("GetStarted");
  }, 2000);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.app_name}>Bookotopia</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    alignItems: "center",
  },
  logo: {
    marginTop: 360,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  app_name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#a84221",
    paddingTop: 20,
    fontFamily: "my-custom-font",
  },
});
