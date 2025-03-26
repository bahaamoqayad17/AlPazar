import { useEffect } from "react";
import { Provider as PaperProvider, FAB } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { I18nManager, StatusBar, StyleSheet } from "react-native";
import { theme } from "./theme";
import ReceivingNotifications from "./components/ReceivingNotifications";
import HomeScreen from "./screens/home";
import Favorite from "./screens/favorite";
import Login from "./screens/login";
import Register from "./screens/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "./screens/messages";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import StartScreen from "./screens/start";
import { Provider as UrqlProvider } from "urql";
import client from "./lib/client";
import ForgotPassword from "./screens/forgetPassword";
import PostDetails from "./screens/PostDetails";
import ProfileScreen from "./screens/profile";
import MoreScreen from "./screens/more";
import AboutUs from "./screens/AboutUs";
import TermsConditions from "./screens/TermsConditions";
import FAQ from "./screens/FAQ";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Contact from "./screens/Contact";
import NotificationsScreen from "./screens/Notifications";
import ChatScreen from "./screens/Chat";
import NewPostScreen from "./screens/NewPost";
import Home from "./icons/home";
import MessagesIcon from "./icons/messages";
import Heart from "./icons/heart";
import More from "./icons/more";
import Plus from "./icons/Plus";
import HomeGuest from "./screens/HomeGuest";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const TabsItems = [
  {
    name: "home",
    title: "الرئيسية",
    icon: (color) => <Home color={color} />,
    component: HomeScreen,
  },
  {
    name: "messages",
    title: "الرسائل",
    icon: (color) => <MessagesIcon color={color} />,
    component: Messages,
  },
  {
    name: "favorite",
    title: "المفضلة",
    icon: (color) => <Heart color={color} />,
    component: Favorite,
  },
  {
    name: "more",
    title: "المزيد",
    icon: (color) => <More color={color} />, // Use function to pass dynamic color
    component: MoreScreen,
  },
];

const TabNavigator = () => {
  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: "#878787",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          tabBarLabelStyle: {
            fontFamily: "AvenirArabic-Heavy",
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 70,
            paddingTop: 10,
            position: "absolute",
            shadowColor: "#05595B",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 15,
            elevation: 5,
          },
        }}
      >
        {TabsItems.map((item) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              title: item.title,
              tabBarIcon: ({ focused }) =>
                item.icon(focused ? theme.colors.primary : "#878787"),
            }}
          />
        ))}
      </Tab.Navigator>

      <FAB
        icon={() => <Plus />}
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate("NewPost")}
        size="large"
      />
    </>
  );
};

export default function App() {
  const [loaded, error] = useFonts({
    "AvenirArabic-Black": require("./assets/fonts/AvenirArabic-Black.otf"),
    "AvenirArabic-Heavy": require("./assets/fonts/AvenirArabic-Heavy.otf"),
    "AvenirArabic-Light": require("./assets/fonts/AvenirArabic-Light.otf"),
    "AvenirArabic-Medium": require("./assets/fonts/AvenirArabic-Medium.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <UrqlProvider value={client}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <ReceivingNotifications />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="Login" component={Login} />
            {/* Authentication Screens */}
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
            {/* Main App (Tab Navigator) */}
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="PostDetails" component={PostDetails} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="HomeGuest" component={HomeGuest} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="More" component={MoreScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />

            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="NewPost" component={NewPostScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UrqlProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#67A3A5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
