import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from "expo-font";
const DeliveryConfirmationPage = (navigation) => {
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
      };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Happy Reading!</Text>
      <Text style={styles.text}>Your books will be delivered soon.</Text>
      <Text style={styles.text}>If you have any questions, please contact us at:</Text>
      <Text style={styles.email}>Booktopia@gmail.com</Text>
      <Text style={styles.text}>Thank you for choosing our service!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0e3e0",
    paddingHorizontal: 20,

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: "my-custom-font",
    color:'#a84221',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color:'#7f604b',
    fontFamily: "my-custom-font",
  },
  email: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "my-custom-font",
    color: '#7f604b',
    textDecorationLine: 'underline',
    marginVertical: 10,

  },
});

export default DeliveryConfirmationPage;
