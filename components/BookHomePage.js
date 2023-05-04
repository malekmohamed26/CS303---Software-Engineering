import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Font from "expo-font";

const BookHomePage = ({ kotob }) => {
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
          onPress={() => console.log("Added to cart")}
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
    </Card>
  );
};

const renderItem = ({ item }) => <BookHomePage kotob={item} />;

const BookItems = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>What do you like to read today?</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
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
    borderColor: "#517fa4",
  },
  cardButtonTitle: {
    color: "#517fa4",
    fontSize: 14,
    fontWeight: "bold",
  },
});
