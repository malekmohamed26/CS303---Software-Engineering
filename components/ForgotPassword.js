import myImage from '../images/p2.png';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { getAuth, updatePassword,fetchSignInMethodsForEmail } from 'firebase/auth';
import {auth , db}from '../firebase';

export default function ChangePassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const auth = getAuth();
  
    const handleResetPassword = () => {
      // Validate email
      if (!email) {
        setErrorMessage('Email is required');
        return;
      }
  
      // Check if email is registered
      fetchSignInMethodsForEmail(auth, email)
        .then((signInMethods) => {
          if (signInMethods.length === 0) {
            setErrorMessage('Email is not registered');
            return;
          }
  
          // Show password reset form
          setResetFormVisible(true);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };
  
    const handleResetFormSubmit = () => {
        if (password !== confirmPassword) {
          setPasswordMatchError('Passwords do not match');
          return;
        }
    
        // Reset password
        const user = auth.currentUser;
        if (user) {
          updatePassword(user, password)
            .then(() => {
              setSuccessMessage('Password reset successfully');
              setResetFormVisible(false);
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }
      };
  
    const [resetFormVisible, setResetFormVisible] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState('');
  
    return (
      <View style={styles.container}>
        <Image source={myImage} style={styles.bookImage} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
        <TouchableOpacity
          onPress={handleResetPassword}
          style={styles.resetPasswordButtonR}
        >
          <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
        </TouchableOpacity>
        {resetFormVisible ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {passwordMatchError ? <Text style={styles.errorMessage}>{passwordMatchError}</Text> : null}
            <TouchableOpacity
              onPress={handleResetFormSubmit}
              style={styles.resetPasswordButton}
            >
              <Text style={styles.resetPasswordButtonText}>Confirm changes</Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
      width: '80%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
resetPasswordButtonR:{
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom:30,
    paddingBottom:10
},
    resetPasswordButton: {
      backgroundColor: '#fff',
      paddingHorizontal: 40,
      paddingVertical: 10,
      borderRadius: 20,
      marginTop: 20,
      paddingBottom:20
    },
    resetPasswordButtonText: {
      backgroundColor: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    errorMessage: {
      color: 'red',
      marginBottom: 16,
      fontSize: 18,
      fontWeight: 'bold',
    },
    successMessage: {
      color: '#a84221',
      marginBottom: 16,
      fontSize: 18,
      fontWeight: 'bold',
    },
    formContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      paddingBottom: 20,
     
    },
  });
  