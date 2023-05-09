import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import myImage from "../images/test1.png";

export default function Home({ navigation }) {
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

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.content}>
        <Image source={myImage} style={styles.bookImage} />
        <Text style={styles.quote}>
          “A book is a dream that you hold in your hands”
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f0e3e0",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bookImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, // set border radius half of the width/height
  },
  bookImage2: {
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 50, // set border radius half of the width/height
  },
  quote: {
    fontSize: 20,
    fontFamily: "my-custom-font",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 50,
    marginBottom: 20,
    color: "#161617",
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  button2: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
