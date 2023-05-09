import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export const Navbar = () => {
    const navigation = useNavigation();

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
  
    /*const handleCartPage = () => {
        navigation.navigate('CartPage');
    }
*/
    return (

        <View style={styles.container}>



            <TouchableOpacity style={styles.iconContainer} onPress={handleFavoritePress}>
                <Icon name="heart" size={25} color="#a84221" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={handleSearchPress}>
                <Icon name="search" size={25} color="#a84221" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.specialIconContainer} onPress={handleHomePress} >
                <Icon name="home" size={35} color="#f0e3e0" />
            </TouchableOpacity>
           <TouchableOpacity style={styles.iconContainer} onPress >
                <Icon name="shopping-cart" size={25} color="#a84221" />
            </TouchableOpacity> 
            <TouchableOpacity style={styles.iconContainer} onPress={handleProfilePress}>
                <Icon name="user" size={25} color="#a84221" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0e3e0',
        height: 48,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    iconContainer: {
        alignItems: 'center',
    },
    specialIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#a84221',
        marginBottom: 30,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
});

export default Navbar;