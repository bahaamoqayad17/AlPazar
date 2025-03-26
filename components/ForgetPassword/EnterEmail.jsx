import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import Mail from "../../icons/Mail";
import axios from "axios";

const EnterEmail = ({ onNext, setEmail, email }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    // Basic Email Validation
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("الرجاء إدخال بريد إلكتروني صالح");
      return;
    }
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}api/auth/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setError("");
      onNext();
    } catch (error) {
      console.log(JSON.stringify(error));
      setLoading(false);
      setError("الرجاء إدخال بريد إلكتروني صالح");
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Icon */}
      <View style={styles.iconContainer}>
        <Mail />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>نسيت كلمة المرور</Text>
      <Text style={styles.subtitle}>
        أدخل البريد الإلكتروني المسجل في الحقل التالي
      </Text>

      {/* Email Input Field */}
      <Text style={styles.label}>البريد الإلكتروني</Text>
      <TextInput
        placeholder="example@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!error}
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Submit Button */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleNext}
      >
        {loading ? <ActivityIndicator color="#fff" /> : "إرسال"}
      </Button>
    </View>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 50,
    backgroundColor: "#fff",
  },
  iconContainer: {
    alignItems: "center", // Center horizontally
    marginVertical: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
    color: "#004d40",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontFamily: "AvenirArabic-Medium",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontFamily: "AvenirArabic-Heavy",
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    fontFamily: "AvenirArabic-Medium",
  },
  button: {
    width: "100%",
    backgroundColor: "#004d40",
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Medium",
  },
});
