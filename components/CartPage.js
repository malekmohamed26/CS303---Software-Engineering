import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import * as Font from "expo-font";

const CartPage = ({ route,navigation }) => {
  const { cartItems } = route.params;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.headerSubTitle}>
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemTitle}>{item.title}</Text>
            <Text style={styles.cartItemAuthor}>by {item.author}</Text>
            <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.totalPriceTitle}>Total Price:</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        <View style={styles.checkoutButton}>
  
  <TouchableOpacity onPress={() => navigation.navigate('ShippingInfoPage')}>
    <Text style={styles.checkoutButtonText}>Checkout</Text>
  </TouchableOpacity>
</View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily:'my-custom-font'
  },
  headerSubTitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemAuthor: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  cartItemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 10,
  },
  totalPriceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#b89076',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



export default CartPage;
