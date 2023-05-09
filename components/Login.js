import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import myImage from "../images/p1.png"; // import the image file
import {
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth, db } from "../firebase";
import Icon from "react-native-vector-icons/FontAwesome"; //remember to install this library

const google_provider = new GoogleAuthProvider();
const facebook_provider = new FacebookAuthProvider();
google_provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
facebook_provider.addScope("user_birthday");

auth.languageCode = "it";
google_provider.setCustomParameters({
  login_hint: "user@example.com",
});
facebook_provider.setCustomParameters({
  display: "popup",
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const handleLogin = () => {
    // Validate email and password
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }
    // if (email.length)
    if (!password) {
      setErrorMessage("Password is required");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password should be of length 8 or more");
      return;
    }
    //full validation here

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged In");
        const user = userCredential.user;
        // Navigate to the next screen
        navigation.navigate("BookHomePage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User not found");
        setErrorMessage("User does not exist");
      });
  };

  const handle_google_signIn = () => {
    signInWithPopup(auth, google_provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // getAdditionalUserInfo(user, token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log("Logged in with Google successfully");
            // Navigate to the next screen
            navigation.navigate("BookHomePage");
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
        // Navigate to the next screen
        navigation.navigate("BookHomePage");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  //Should work if Facebook Authentication is enabled in Firebase website
  const handle_facebook_signIn = () => {
    signInWithPopup(auth, facebook_provider)
      .then((result) => {
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log("Logged in with Facebook successfully");
            // Navigate to the next screen
            navigation.navigate("BookHomePage");
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
        // Navigate to the next screen
        navigation.navigate("BookHomePage");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <View style={styles.container}>
      <Image source={myImage} style={styles.bookImage} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.password_container}>
        <TextInput
          style={styles.password_input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: 16 }}
          onPress={togglePasswordVisibility}
        >
          <Icon
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          LOG IN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
        style={styles.forgotPasswordButton}
      >
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Text
        style={{
          opacity: 0.5,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        or continue using
      </Text>

      <View /*style={{ display: inline }}*/>
        <TouchableOpacity
          onPress={handle_google_signIn}
          style={styles.googleButton}
        >
          <Text style={styles.loginButtonText}>
            <Image
              style={{
                width: 20,
                height: 20,
                top: 2,
                right: 10,
                tintColor: "white",
              }}
              source={{
                uri: "https://img.icons8.com/ios-filled/50/null/google-logo.png",
              }}
            />
            Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handle_facebook_signIn}
          style={styles.facebookButton}
        >
          <Text style={styles.loginButtonText}>
            <Image
              style={{
                width: 20,
                height: 20,
                top: 2,
                right: 10,
                tintColor: "white",
              }}
              source={{
                uri: "https://img.icons8.com/material-sharp/24/null/facebook-f.png",
              }}
            />
            Facebook
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUp_container}>
        <Text style={styles.registerButtonText1}>
          Don't have an account?
          <Text
            style={styles.registerButtonText2}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f0e3e0",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  bookImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  password_container: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 45,
  },
  password_input: {
    height: 40,
    fontSize: 14,
    paddingLeft: 1,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: "#000",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  googleButton: {
    backgroundColor: "#DB4437",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: "#0165E1",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUp_container: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginTop: 20,
  },
  registerButtonText1: {
    fontSize: 14,
  },
  registerButtonText2: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#FFF",
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
});
