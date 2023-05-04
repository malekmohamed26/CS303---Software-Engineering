import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import myImage from '../images/test1.png'; // import the image file
import auth from "../firebase";

export default function BookHomePage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={myImage} style={styles.image} />
        <View>
          <Text style={styles.text1}>Welcome {auth.currentUser.email}</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e3e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
