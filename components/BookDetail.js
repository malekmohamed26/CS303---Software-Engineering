import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Font from "expo-font";
import Navbar from "./Navbar";

const BookDetail = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.length;
  const { kotob } = route.params;
  const [fontLoaded, setFontLoaded] = useState(false);

  const handleFavoritePress = () => {
    navigation.navigate("Favorite");
  };
  const handleHomePress = () => {
    navigation.navigate("BookHomePage");
  };
  const handleSearchPress = () => {
    navigation.navigate("Search");
  };
  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };
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
      <Navbar onButtonPress={handleFavoritePress} />
      <Navbar onButtonPress={handleHomePress} />
      <Navbar onButtonPress={handleSearchPress} />
      <Navbar onButtonPress={handleProfilePress} />
      <Image source={kotob.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{kotob.title}</Text>
        <Text style={styles.author}>{kotob.author}</Text>
        <Text style={styles.description}>{kotob.description}</Text>
        <Text style={styles.price}>${kotob.price.toFixed(2)}</Text>
      </View>
      <View style={styles.cardButtonsContainer}>
        <Button
          type="outline"
          icon={
            <Icon name="shopping-cart" type="font-awesome" color="#a84221" />
          }
          containerStyle={styles.cardButtonContainer}
          buttonStyle={styles.cardButtonStyle}
          titleStyle={styles.cardButtonTitle}
          onPress={() => {
            setCartItems([...cartItems, kotob]);
            console.log("Added to cart");
          }}
          title={` (${cartCount})`}
        />
        <Button
          type="outline"
          icon={<Icon name="heart" type="font-awesome" color="#a84221" />}
          containerStyle={styles.cardButtonContainer}
          buttonStyle={styles.cardButtonStyle}
          titleStyle={styles.cardButtonTitle}
          onPress={() => console.log("Added to favorites")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    paddingTop: 50,
  },
  image: {
    height: 500,
    width: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#a84221",
    fontFamily: "my-custom-font",
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color: "#b89076",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    color: "#7f604b",
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#54646a",
  },
  cardButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  cardButtonContainer: {
    width: 120,
    marginRight: 10,
  },
  cardButtonStyle: {
    borderWidth: 1,
    borderColor: "#517fa4",
  },
  cardButtonTitle: {
    color: "#517fa4",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BookDetail;
