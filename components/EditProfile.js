import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  alert,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

export default function EditProfile(navigation) {
  const { colors } = useTheme();
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [formReady, setFormReady] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
      }
    } else {
      toggleDatepicker();
      setDateOfBirth(currentDate.toDateString());
    }
  };
  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatepicker();
  };

  /*const onSubmit = () => {
   alert(`${dateOfBirth}`);
  };*/

  useEffect(() => {
    setFormReady(dateOfBirth);
    return () => {
      setFormReady(false);
    };
  }, [dateOfBirth]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground source={{ uri: image }} style={styles.bookImage}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={25}
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Manar Ashraf{" "}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          {showPicker && (
            <DateTimePicker
              mode="calender"
              display="spinner"
              value={date}
              onChange={onChange}
              style={styles.datePicker}
            />
          )}
          {showPicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.pickerButton,
                  { backgroundColor: "#666666" },
                ]}
                onPress={toggleDatepicker}
              >
                <Text style={[styles.buttonText, { color: "#666666" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.pickerButton,
                  { backgroundColor: "#666666" },
                ]}
                onPress={confirmIOSDate}
              >
                <Text style={[styles.buttonText, { color: "#666666" }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!showPicker && (
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.textInput}
                placeholder=" Date : Sat Aug 21 2004 "
                placeholderTextColor="#666666"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                editable={false}
                onPressIn={toggleDatepicker}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.action}>
          <FontAwesome name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone Number"
            keyboardType="number-pad"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="city"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}> Submit</Text>
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
  bookImage: {
    width: 100,
    height: 100,
    borderRadius: 200, // set border radius half of the width/height
    justifyContent: "left",
    alignItems: "center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
    backgroundColor: "black",
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  action: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },

  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "black",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});
