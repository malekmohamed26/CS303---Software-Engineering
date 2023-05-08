import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Picker } from 'react-native';
import * as Font from "expo-font";
import CartPage from './CartPage';
  
const ShippingInfoPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, SetPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [errors, setErrors] = useState({});
 

  useEffect(() => {
    // Fetch the list of countries and their codes from the REST Countries API
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then((response) => response.json())
      .then((data) => {
        const countries = data
          .map((country) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a, b) => (a.name > b.name ? 1 : -1)); // sort by name
        setCountries(countries);
        setCountry(countries[0].code);
      })
      .catch((error) => console.error(error));
  }, []);
  
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

//   useEffect(() => {
//     // Fetch the list of cities for the selected country
//     if (country) {
//       fetch(`https://countriesnow.space/api/v0.1/countries/cities?&country=${country}`)
//         .then((response) => response.json())
//         .then((data) => setCities(data.data))
//         .catch((error) => console.error(error));
//     }
//   }, [country]);

const handleSubmit = () => {
  // Handle submitting shipping information
  if (!name || !address || !city || !zip || !/^\d+$/.test(zip)) {
    // Update errors object with error messages for each field
    setErrors({
      name: !name ? 'Name is required' : '',
      address: !address ? 'Address is required' : '',
      city: !city ? 'City is required' : '',
      zip: !zip ? 'Zip code is required' : /^\d+$/.test(zip) ? 'Zip code should contain digits only' : '',
    });
    return;
  }
  navigation.navigate("payment");
  console.log(name, address, country, city, state, zip);
};

  const handleCountryChange = (value) => {
    setCountry(value);
    setCity('');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Shipping Information</Text>
      <Text style={styles.section}>Personal Info</Text>
      <TextInput
      style={styles.input}
      placeholder="Name"
      value={name}
      onChangeText={(value) => setName(value)}
      required
    />
    {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
    <TextInput
      style={styles.input}
      placeholder="Phone Number"
      value={phone}
      onChangeText={(value) => SetPhone(value)}
    />
    <Text style={styles.section}>Address</Text>
    <TextInput
      style={styles.input}
      placeholder="Address 1*"
      value={address}
      onChangeText={(value) => setAddress(value)}
      required
    />
     {errors.address ? <Text style={styles.error}>{errors.address}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Address 2"
        value={address2}
        onChangeText={(value) => setAddress2(value)}
      />
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={country}
            onValueChange={handleCountryChange}
          >
            {countries.map((country) => (
              <Picker.Item
                key={country.code}
                label={country.name}
                value={country.code}
              />
            ))}
          </Picker>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="City*"
        value={city}
        onChangeText={(value) => setCity(value)}
      />
       {errors.city ? <Text style={styles.error}>{errors.city}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={(value) => setState(value)}
      />
      <TextInput
        style={[styles.input, styles.zipInput]}
        placeholder="Zip"
        value={zip}
        onChangeText={(value) => setZip(value)}
        keyboardType="numeric"
        required
      />
    
    {errors.zip ? <Text style={styles.error}>{errors.zip}</Text> : null}
    <TouchableOpacity
      style={styles.button}
      onPress={handleSubmit}
    >
        <Text style={styles.buttonText}>Continue</Text>
       
      </TouchableOpacity>
    </View>
  );
  
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f0e3e0",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "my-custom-font",
      color:'#a84221',
    },
    section:{
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 10,
        color:"#a84221",
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "#a6796e",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    pickerContainer: {
      flex: 1,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      overflow: "hidden",
   
    },
    picker: {
      width: "100%",
      height:40,
      backgroundColor: "#f0e3e0",
    },
    error: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
      marginBottom: 10,
    },
  });
  
  export default ShippingInfoPage;