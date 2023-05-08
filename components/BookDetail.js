import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Font from "expo-font";
const BookDetail = ({ route }) => {
  const { kotob } = route.params;
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
      <Image source={kotob.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{kotob.title}</Text>
        <Text style={styles.author}>{kotob.author}</Text>
        <Text style={styles.description}>{kotob.description}</Text>
        <Text style={styles.price}>${kotob.price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e3e0',
    paddingTop:50,
  },
  image: {
   
    height: 500,
    width: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#a84221',
    fontFamily: "my-custom-font",
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color:'#b89076'
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    color:'#7f604b'
   
  },
});

export default BookDetail;
