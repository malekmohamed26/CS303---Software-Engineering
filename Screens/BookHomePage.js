import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";


const BookHomePage = ({ kotob }) => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.length;
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
    <TouchableOpacity
      onPress={() => navigation.navigate("BookDetail", { kotob })}
    >
      <Card containerStyle={styles.cardContainer}>
        <Card.Image source={kotob.image} style={styles.cardImage} />
        <Card.Title style={styles.cardTitle}>{kotob.title}</Card.Title>
        <Card.Divider />
        <View>
          <Text style={styles.cardText}>{kotob.author}</Text>
          <Text style={styles.cardText}>{kotob.description}</Text>
          <Text style={styles.cardText}>${kotob.price.toFixed(2)}</Text>
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
              setCartItems([...cartItems, {id: kotob.id, author: kotob.author, title: kotob.title , price: kotob.price}]);
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
        <Button
          type="outline"
          icon={<Icon name="shopping-cart" type="font-awesome" color="#a84221" />}
          containerStyle={styles.cardButtonContainer}
          buttonStyle={styles.cardButtonStyle}
          titleStyle={styles.cardButtonTitle}
          onPress={() => navigation.navigate('CartPage', {cartItems})}

          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const renderItem = ({ item }) => <BookHomePage kotob={item} />;


const BookItems = ({ navigation, data }) => {
  const handleFavoritePress = () => {
    console.log("Function call from Navbar");
  };
  const handleHomePress = () => {
    console.log("Function call from Navbar");
  };
  const handleSearchPress = () => {
    console.log("Function call from Navbar");
  };
  const handleProfilePress = () => {
    console.log("Function call from Navbar");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>What do you like to read today?</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
      <Navbar onButtonPress={handleFavoritePress} />
      <Navbar onButtonPress={handleHomePress} />
      <Navbar onButtonPress={handleSearchPress} />
      <Navbar onButtonPress={handleProfilePress} />
    </View>
  );
};

export default BookItems;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "my-custom-font",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#161617",
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#f0e3e0",
    borderRadius: 10,
    overflow: "hidden",
    paddingTop: 50,
  },
  cardImage: {
    height: 500,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "bold",
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
    borderColor: "black",
  },
  cardButtonTitle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});
