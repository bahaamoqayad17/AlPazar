import { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import Mail from "../../icons/Mail";
import axios from "axios";

const SendCode = ({ email, onNext, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Now 4 digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return; // Only allow one digit per input

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input field if the digit is entered
    if (text !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const enteredCode = otp.join("");
    if (enteredCode.length !== 4) {
      setError("الكود غير صالح");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}api/auth/verify-otp`,
        { email, otp: otp.join("") },
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
      setError("الكود غير صالح");
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Icon */}
      <View style={{ marginBottom: 20 }}>
        <Mail />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>تحقق من بريدك الإلكتروني</Text>
      <Text style={styles.subtitle}>لقد أرسلنا رمز التحقق إلى: {email}</Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Resend Code Option */}

      {/* Submit Button */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleSubmit}
      >
        {loading ? <ActivityIndicator color="#fff" /> : "إرسال الكود"}
      </Button>

      <TouchableOpacity onPress={onResend}>
        <Text style={styles.resendText}>إعادة إرسال الرمز</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    fontFamily: "AvenirArabic-Medium",
  },
  title: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
    color: "#004d40",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#616161",
    textAlign: "center",
    marginVertical: 16,
    maxWidth: 240,
    fontFamily: "AvenirArabic-Medium",
  },
  emailText: {
    fontFamily: "AvenirArabic-Heavy",
    color: "#004d40",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    width: "80%", // Adjusted width for 4 digits
    marginBottom: 20,
    marginTop: 10,
  },
  otpInput: {
    width: 58, // Slightly larger for better visibility
    height: 54,
    borderWidth: 1,
    borderColor: "#878787",
    borderRadius: 8,
    fontSize: 20,
    textAlign: "center",
  },
  resendText: {
    color: "#004d40",
    fontFamily: "AvenirArabic-Heavy",
    marginVertical: 18,
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    backgroundColor: "#004d40",
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Medium",
  },
});
