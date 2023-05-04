import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import myImage from "../images/test1.png";
import {
  Caption,
  IconButton,
  Title,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.my_profile_bar}>
        <Text style={styles.my_profile_text}>My profile</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BookHomePage");
          }}
        >
          <Icon name="chevron-right" size={30} color={"#a84221"} />
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
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textAlign: "left",
              }}
            >
              Malek Mohamed
            </Text>
            <Caption
              style={{ textAlign: "left", paddingLeft: 10, fontSize: 15 }}
            >
              @malek26
            </Caption>
          </View>
          <Icon
            name="user-edit"
            size={30}
            color={"#a84221"}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            style={{ alignSelf: "center", marginTop: -35 }}
          />
        </View>
        <View style={styles.user_full_info_container}>
          <View style={styles.user_detail_item}>
            <Icon
              name="envelope"
              size={30}
              color={"#a84221"}
              style={styles.icon}
            />
            <Text>malekmohamed234@gmail.com</Text>
          </View>
          <View style={styles.user_detail_item}>
            <MaterialIcon
              name="location-pin"
              size={30}
              color={"#a84221"}
              style={styles.icon}
            />
            <Text>Cairo, Egypt</Text>
          </View>
          <View style={styles.user_detail_item}>
            <Icon
              name="calendar"
              size={30}
              color={"#a84221"}
              style={styles.icon}
            />
            <Text>26 of June, 2000</Text>
          </View>
          <View style={styles.user_detail_item}>
            <Icon
              name="mobile-alt"
              size={30}
              color={"#a84221"}
              style={styles.icon}
            />
            <Text>01011302148</Text>
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
            size={30}
            color={"#a84221"}
            style={styles.icon}
          />
          <Text>Favourites</Text>
        </View>
        <View style={styles.user_detail_item}>
          <FontAwesomeIcon
            name="lock"
            size={30}
            color={"#a84221"}
            style={styles.icon}
          />
          <Text>Change Password</Text>
        </View>
        <View style={styles.user_detail_item}>
          <Icon
            name="dollar-sign"
            size={30}
            color={"#a84221"}
            style={styles.icon}
          />
          <Text>Payment Settings</Text>
        </View>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity>
          <Icon name="power-off" size={30} color={"#ff0000"} />
          <Text style={{ fontSize: 20, color: "#ff0000" }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
  },
  my_profile_bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#a84221",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  my_profile_text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  profile_interface: {
    margin: 10,
    height: 410,
    borderBottomWidth: 1,
    borderBottomColor: "#a8422180",
  },
  profile_image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name_container: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "60%",
  },
  user_basic_info_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  user_full_info_container: {
    flexDirection: "column",
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  user_detail_item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  icon: {
    paddingRight: "4%",
  },
  user_preferences: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#a8422180",
  },
  logout: {
    margin: 10,
    flexDirection: "row",
  },
});
