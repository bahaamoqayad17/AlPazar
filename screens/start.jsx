import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";

const StartScreen = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const auth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.navigate("Main");
        }
      } catch (error) {
        console.log(error);
      }
    };
    auth();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/start.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View>
          <Text style={[styles.title, { color: theme.colors.surface }]}>
            إبدأ بيع منتجاتك بسهولة!
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.subtitle}>مع تطبيق </Text>
            <Text style={[styles.subtitle, { color: "#E2D784" }]}>
              عالبازار
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Pressable
            onPress={() => navigation.navigate("HomeGuest")}
            style={[
              styles.customButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <View style={styles.buttonContent}>
              <Text
                style={[styles.buttonText, { color: theme.colors.surface }]}
              >
                ابدأ الآن
              </Text>
              <Ionicons
                name="arrow-back"
                size={20}
                color={theme.colors.surface}
              />
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <View style={styles.buttonContent}>
              <Text style={styles.loginText}>هل لديك حساب؟</Text>
              <Text style={[styles.loginText, styles.login]}>سجل دخول</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "AvenirArabic-Heavy",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
    fontFamily: "AvenirArabic-Heavy",
  },
  customButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginRight: 8,
    fontFamily: "AvenirArabic-Medium",
  },
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "AvenirArabic-Medium",
  },
  login: {
    color: "#E2D784",
    marginLeft: 7,
  },
});

export default StartScreen;
