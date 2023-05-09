import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import myImage from '../images/test1.png';

import {
  Caption,
  IconButton,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

export default function Profile({ navigation }) {
  // add the use state to store profile data in it
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country , setCountry] = useState('');
  const [date , setDateOfBirth] = useState('');
  const auth = getAuth();
  //const auth = getAuth(); // de 5alt el mafrod auth tegy mn mlf firebase
  const handleFavoritePress = () => {
    navigation.navigate('Favorite');
  };
  const handleHomePress = () => {
    navigation.navigate('BookHomePage');
  };
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };
  // use effect 3ashan ngeb el data awl ma el saf7a tfta7
  useEffect(() => {
    getUserData();
  });
  //function to get data of user from fire store
  const getUserData = async () => {
    // el mfrod user de esm el data we bdl el id dh ykon auth.cuurentUser.uid
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      //n5zn el data fe el state
      setEmail(data.email);
      setName(data.name);
      setPhone(data.phone);
      setCountry(data.country);
      setDateOfBirth(data.date);
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('logged out');
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar onButtonPress={handleFavoritePress} />
      <Navbar onButtonPress={handleHomePress} />
      <Navbar onButtonPress={handleSearchPress} />
      <Navbar onButtonPress={handleProfilePress} />
      <View style={styles.my_profile_bar}>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="power-off" size={20} color={'#a84221'} />
        </TouchableOpacity>

        <Text style={styles.my_profile_text}>My profile</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BookHomePage');
          }}
        >
          <Icon name="chevron-right" size={20} color={'#a84221'} />
        </TouchableOpacity>
      </View>
      <View style={styles.profile_interface}>
        <View style={styles.user_basic_info_container}>
          <View style={styles.profile_image_container}>
            <Image source={myImage} style={styles.profile_image} />
          </View>
          <View style={styles.name_container}>
            <Text
              style={{
                paddingBottom: 10,
                paddingLeft: 10,
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                textAlign: 'left',
              }}
            >
              {name}
            </Text>
            <Caption
              style={{ textAlign: 'left', paddingLeft: 10, fontSize: 15 }}
            >
              @{name}205
            </Caption>
          </View>

          <Icon
            name="user-edit"
            size={20}
            color={'#777777'}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
            style={{ alignSelf: 'center', marginTop: -35 }}
          />
        </View>
        <View style={styles.user_full_info_container}>
          <View style={styles.user_detail_item}>
            <Icon
              name="envelope"
              size={20}
              color={'black'}
              style={styles.icon}
            />
            <Text
              style={{
                color: '#777777',
              }}
            >
              {email}
            </Text>
          </View>
          <View style={styles.user_detail_item}>
            <MaterialIcon
              name="location-pin"
              size={20}
              color={'black'}
              style={styles.icon}
            />
            <Text
              style={{
                color: '#777777',
              }}
            >
              {country}
            </Text>
          </View>
          <View style={styles.user_detail_item}>
            <Icon
              name="birthday-cake"
              size={20}
              color={'black'}
              style={styles.icon}
            />
            <Text
              style={{
                color: '#777777',
              }}
            >
             {date}
            </Text>
          </View>
          <View style={styles.user_detail_item}>
            <Icon name="phone" size={20} color={'black'} style={styles.icon} />
            <Text
              style={{
                color: '#777777',
              }}
            >
              {phone}
            </Text>
          </View>
        </View>
      </View>
      {/* all of the views inside user_preferences is NOT views, i setted them as
      a placeholder //since i can't handle TouchableOpacity design, cuz these
      items are CLICKABLE */}
      <View style={styles.user_preferences}>
        <View style={styles.user_detail_item}>
          <FontAwesomeIcon
            name="heart-o"
            size={20}
            color={'black'}
            onPress={() => {
              navigation.navigate('');
            }}
            style={styles.icon}
          />
          <Text
            style={{
              color: '#777777',
            }}
          >
            Favorites
          </Text>
        </View>
        <View style={styles.user_detail_item}>
          <FontAwesomeIcon
            name="lock"
            size={20}
            color={'black'}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}
            style={styles.icon}
          />
          <Text
            style={{
              color: '#777777',
            }}
          >
            Change Password
          </Text>
        </View>
        <View style={styles.user_detail_item}>
          <Icon
            name="dollar-sign"
            size={20}
            color={'black'}
            onPress={() => {
              navigation.navigate('');
            }}
            style={styles.icon}
          />
          <Text
            style={{
              color: '#777777',
            }}
          >
            Payment Settings
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e3e0',
  },
  my_profile_bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a84221',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  my_profile_text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  profile_interface: {
    margin: 10,
    height: 410,
    borderBottomWidth: 1,
    borderBottomColor: '#a8422180',
  },
  profile_image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    paddingBottom: 55,
    paddingHorizontal: 55,
  },
  name_container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '60%',
  },
  user_basic_info_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  user_full_info_container: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  user_detail_item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    color: '#777777',
  },
  icon: {
    paddingRight: '4%',
  },
  user_preferences: {
    margin: 10,
    flexDirection: 'column',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection: 'column',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});
