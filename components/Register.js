import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import myImage from '../images/p1.png'; // import the image file
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";



export default function SignUp({ navigation }) {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');


  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Registered");
        const user = userCredential.user;
        navigation.navigate('BookHomePage');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Check your inputs");
      });
  }
  return (

    <View style={styles.container}>
      <Image source={myImage} style={styles.bookImage} />

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}

      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}

      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>


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
  bookImage: {
    width: 150,
    height: 150,
    marginBottom: 20,

  },
  input: {
    width: "90%",
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 25,
  },
  button: {
    //width: "90%",
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',

  },
});