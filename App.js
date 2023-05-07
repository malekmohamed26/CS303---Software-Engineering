import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/Login";
import SignUp from "./components/Register";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import BookItems from "./components/BookHomePage";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";
import ShippingInfoPage from "./components/ShippingInfo";
import payment from "./components/payment";
import DeliveryConfirmationPage from "./components/DeliveryConfirmationPage"
import BookDetail from "./components/BookDetail";
import kotob from "./kotob";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
         gestureEnabled: true,
         gestureDirection: "horizontal",
       }}
      >
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="BookHomePage" options={{ headerShown: false }}>
          {() => <BookItems data={kotob} />}
        </Stack.Screen>

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />  */}
        {/* { <Stack.Screen
          name="ShippingInfoPage"
          component={ShippingInfoPage}
          options={{ headerShown: false }}
        /> } */}
           {/* <Stack.Screen
          name="payment"
          component={payment}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="DeliveryConfirmationPage"
          component={DeliveryConfirmationPage}
          options={{ headerShown: false }}
        />  */}
         <Stack.Screen name="BookHomePage" options={{ headerShown: false }}>
          {() => <BookItems data={kotob} />}
        </Stack.Screen>

        <Stack.Screen
          name="BookDetail"
          component={BookDetail}
          options={{ headerShown: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    alignItems: "center",
    justifyContent: "center",
  },
});
