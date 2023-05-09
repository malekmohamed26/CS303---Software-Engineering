import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/Login";
import SignUp from "./components/Register";
import SplashScreen from "./Screens/SplashScreen";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import BookItems from "./Screens/BookHomePage";
import EditProfile from "./Screens/EditProfile";
import Profile from "./Screens/Profile";
import ShippingInfoPage from "./components/ShippingInfo";
import payment from "./components/payment";
import DeliveryConfirmationPage from "./components/DeliveryConfirmationPage";
import BookDetail from "./components/BookDetail";
import kotob from "./kotob";
import CartPage from "./components/CartPage";
import Favorites from "./components/Favorites";
import GetStarted from "./Screens/GetStarted";
import Navbar from "./components/Navbar";

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
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
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
          name="BookDetail"
          component={BookDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CartPage"
          component={CartPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShippingInfoPage"
          component={ShippingInfoPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="payment"
          component={payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeliveryConfirmationPage"
          component={DeliveryConfirmationPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e3e0",
    alignItems: "center",
    justifyContent: "center",
  },
});
