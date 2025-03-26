import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import getPushToken from "../lib/getPushToken";
import OAuth from "../components/OAuth";
import axios from "../lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [securePassword, setSecurePassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleLogin = async () => {
    const expo_token = await getPushToken();
    setLoading(true);
    try {
      const res = await axios.post("auth/login", { ...item, expo_token });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      setLoading(false);

      setSnackbarMessage("تم تسجيل الدخول بنجاح");
      setSnackbarType("success");
      setSnackbarVisible(true);

      setTimeout(() => {
        navigation.navigate("Main");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("خطأ في البريد الإلكتروني أو كلمة المرور");
      setSnackbarType("error");
      setSnackbarVisible(true);
      console.log(error);
    }
  };

  return (
    <View style={styles.parent}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {/* Form Container */}
        <View style={styles.box}>
          <View>
            <View style={styles.topContainer}>
              <Text style={styles.title}>مرحبا بعودتك !</Text>
              <Text style={styles.subtitle}>
                سجّل دخولك للوصول إلى حسابك وابدأ البيع والشراء بكل سهولة
              </Text>
            </View>

            {/* Email Field */}
            <Text style={styles.label}>البريد الإلكتروني</Text>
            <TextInput
              placeholder="example12@123.com"
              value={item?.email}
              onChangeText={(email) => setItem({ ...item, email })}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
            />

            {/* Password Field */}
            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput
              placeholder="**************"
              value={item?.password}
              onChangeText={(password) => setItem({ ...item, password })}
              secureTextEntry={securePassword}
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
              right={
                <TextInput.Icon
                  icon={securePassword ? "eye-off" : "eye"}
                  onPress={() => setSecurePassword(!securePassword)}
                />
              }
            />

            {/* Agree to Terms */}
            <View style={styles.optionsContainer}>
              <View style={styles.rememberMeContainer}>
                <Checkbox
                  status={agreeTerms ? "checked" : "unchecked"}
                  onPress={() => setAgreeTerms(!agreeTerms)}
                  color="#004d40"
                />
                <Text style={styles.rememberText}>تذكرني</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                <Text
                  style={{
                    color: "#05595B",
                    fontFamily: "AvenirArabic-Heavy",
                    marginVertical: 10,
                  }}
                >
                  نسيت كلمة المرور ؟
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Actions Box */}
          <View>
            <Button
              mode="contained"
              style={styles.registerButton}
              labelStyle={styles.buttonText}
              onPress={() => handleLogin()}
            >
              {loading ? <ActivityIndicator color="#fff" /> : "تسجيل دخول"}
            </Button>

            {/* Already have an account? */}
            <View style={styles.signupContainer}>
              <Text
                style={{ color: "#605D5D", fontFamily: "AvenirArabic-Medium" }}
              >
                ليس لديك حساب؟
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signupText}>إنشاء حساب</Text>
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={() => navigation.navigate("HomeGuest")}
              style={styles.customButton}
            >
              <View style={styles.buttonContent}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: "#05595B",
                      marginRight: 8,
                      fontFamily: "AvenirArabic-Heavy",
                    },
                  ]}
                >
                  متابعة كزائر
                </Text>
                <Ionicons name="arrow-back" size={20} color={"#05595B"} />
              </View>
            </Pressable>

            {/* Social Media Signup */}
            <Text style={styles.orText}>أو التسجيل من خلال</Text>

            <OAuth />

            <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              duration={4000}
              style={
                snackbarType === "success"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {snackbarMessage}
            </Snackbar>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#05595B",
  },
  topContainer: {
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "AvenirArabic-Heavy",
    color: "#062C30",
  },
  subtitle: {
    fontSize: 14,
    color: "#616161",
    marginTop: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  label: {
    fontSize: 14,
    fontFamily: "AvenirArabic-Heavy",
    marginBottom: 8,
    color: "#616161",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "AvenirArabic-Medium",
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 30,
    marginHorizontal: 20,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: "#004d40",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "AvenirArabic-Heavy",
  },
  signupContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  signupText: {
    color: "#004d40",
    fontFamily: "AvenirArabic-Heavy",
    marginLeft: 5,
  },
  customButton: {
    marginTop: 10,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#05595B",
    borderWidth: 1,
  },
  orText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#605D5D",
    fontFamily: "AvenirArabic-Medium",
  },
});
