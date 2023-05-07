import React, { useState ,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from "expo-font";

  
const payment = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const handlePayment = () => {
    if (payOnDelivery) {
      // Handle payment on delivery
    } else {
      // Handle payment with card
      if (!cardNumber || !expiryDate || !cvv) {
        // Show an error message or prevent payment submission
        return;
      }
     
    }
    navigation.navigate("DeliveryConfirmationPage");
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Information</Text>
      <View style={styles.paymentTypeContainer}>
        <TouchableOpacity
          style={[styles.paymentTypeButton, payOnDelivery && styles.selectedPaymentTypeButton]}
          onPress={() => setPayOnDelivery(true)}
        >
          <Text style={styles.paymentTypeButtonText}>Pay on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentTypeButton, !payOnDelivery && styles.selectedPaymentTypeButton]}
          onPress={() => setPayOnDelivery(false)}
        >
          <Text style={styles.paymentTypeButtonText}>Pay with Card</Text>
        </TouchableOpacity>
      </View>
      {!payOnDelivery && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={(value) => setCardNumber(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date"
            value={expiryDate}
            onChangeText={(value) => setExpiryDate(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={cvv}
            onChangeText={(value) => setCvv(value)}
          />
        </>
      )}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#f0e3e0",
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: "my-custom-font",
    color:'#a84221',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  paymentTypeButton: {
    backgroundColor: '#f0e3e0',
    padding: 10,
    borderRadius: 5,
    borderColor:'#161617',
    width: '48%',
    alignItems: 'center',

  },
  selectedPaymentTypeButton: {
    backgroundColor: '#a6796e',
 
  },
  paymentTypeButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#a6796e',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default payment;
