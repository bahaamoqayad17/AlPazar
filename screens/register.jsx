import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

const Register = ({ navigation }) => {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleRegister = async () => {
    // Check if the password meets minimum length
    if (!item.password || item.password.length < 8) {
      Alert.alert("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    // Check if passwords match
    if (item.password !== item.confirmPassword) {
      Alert.alert("كلمتا المرور غير متطابقتين");
      return;
    }

    // Check if user agreed to terms
    if (!agreeTerms) {
      Alert.alert("يجب الموافقة على الشروط والأحكام");
      return;
    }

    const expo_token = await getPushToken();

    setLoading(true);
    try {
      const res = await axios.post("auth/register", { ...item, expo_token });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      setLoading(false);

      setSnackbarMessage("تم إنشاء الحساب بنجاح");
      setSnackbarType("success");
      setSnackbarVisible(true);

      setTimeout(() => {
        navigation.navigate("Main");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("يرجى التأكد من صحة البيانات المدخلة");
      setSnackbarType("error");
      setSnackbarVisible(true);
      console.log(error);
    }
  };

  return (
    <View style={styles.parent}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: 30,
        }}
      >
        {/* Form Container */}
        <View style={styles.box}>
          <View>
            <View style={styles.topContainer}>
              <Text style={styles.title}>
                انضم إلينا وابدأ ببيع وشراء المنتجات{" "}
              </Text>
              <Text style={styles.subtitle}>
                قم بإنشاء حسابك وابدأ التسوق والبيع بسهولة
              </Text>
            </View>

            {/* Email Field */}
            <Text style={styles.label}>الاسم</Text>
            <TextInput
              placeholder="أحمد علي"
              value={item?.name}
              onChangeText={(name) => setItem({ ...item, name })}
              keyboardType="default"
              autoCapitalize="none"
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
            />

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

            {/* Confirm Password Field */}
            <Text style={styles.label}>تأكيد كلمة المرور</Text>
            <TextInput
              placeholder="**************"
              value={item?.passwordConfirm}
              onChangeText={(passwordConfirm) =>
                setItem({ ...item, passwordConfirm })
              }
              secureTextEntry={secureConfirmPassword}
              style={styles.input}
              contentStyle={{ fontFamily: "AvenirArabic-Medium" }}
              right={
                <TextInput.Icon
                  icon={secureConfirmPassword ? "eye-off" : "eye"}
                  onPress={() =>
                    setSecureConfirmPassword(!secureConfirmPassword)
                  }
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
                <Pressable
                  onPress={() => navigation.navigate("TermsConditions")}
                >
                  <Text style={styles.rememberText}>
                    أوافق على الشروط والأحكام
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Bottom Actions Box */}
          <View>
            <Button
              mode="contained"
              style={styles.registerButton}
              labelStyle={styles.buttonText}
              onPress={() => handleRegister()}
            >
              {loading ? <ActivityIndicator color="#fff" /> : "إنشاء حساب"}
            </Button>

            {/* Already have an account? */}
            <View style={styles.signupContainer}>
              <Text>هل لديك حساب؟</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signupText}>تسجيل الدخول</Text>
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={() => navigation.navigate("Main")}
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
              style={[
                { bottom: 0 },
                snackbarType === "success"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" },
              ]}
            >
              {snackbarMessage}
            </Snackbar>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

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
    fontSize: 22,
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
    color: "#05595B",
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
