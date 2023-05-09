import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import noFavoriteImage from "../images/book_favorites.png";

export default function Favorites({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.favorites_text_container}>
        <Text style={styles.favorites_text}>Favorites</Text>
      </View>
      <View style={styles.no_favorite_image_container}>
        <Image source={noFavoriteImage} style={styles.no_favorite_image} />
      </View>
      <View style={styles.no_favorite_text}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            flexWrap: "wrap",
            padding: 10,
            paddingTop: 40,
          }}
        >
          Look likes you don't have favorite books yet!
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            flexWrap: "wrap",
            padding: 10,
          }}
        >
          Browse available books to find your favorite ones.
        </Text>
      </View>
      <View style={styles.browse_container}>
        <TouchableHighlight
          style={styles.browse_button}
          onPress={() => {
            navigation.navigate("BookHomePage");
          }}
        >
          <Text style={styles.browse_text}>Browse books</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    padding: 25,
  },
  favorites_text_container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  favorites_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#a84221",
  },
  no_favorite_image_container: {
    alignItems: "center",
    paddingTop: 50,
  },
  no_favorite_image: {
    width: 300,
    height: 300,
  },
  no_favorite_text: {
    alignItems: "center",
  },
  browse_container: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  browse_button: {
    backgroundColor: "#a84221",
    width: "70%",
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  browse_text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
