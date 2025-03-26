import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import Lock from "../../icons/Lock";
import axios from "../../lib/axios";

const ChangePassword = ({ onNext, email }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secureOld, setSecureOld] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      setError("يجب ملء جميع الحقول");
      return;
    }

    if (oldPassword !== newPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    if (newPassword.length < 8) {
      setError("يجب أن تكون كلمة المرور أكثر من 8 أحرف");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}api/auth/reset-password`,
        {
          email,
          password: oldPassword,
          passwordConfirm: newPassword,
        },
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
      setError("تأكد من كلمات المرور أو وجود مشكلة في الاتصال بالخادم");
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      {/* Header Icon */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Lock />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>تغيير كلمة المرور</Text>
      <Text style={styles.subtitle}>قم بكتابة كلمة المرور الجديدة</Text>

      {/* Old Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="كلمة المرور الجديدة"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={secureOld}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={secureOld ? "eye-off" : "eye"}
              onPress={() => setSecureOld(!secureOld)}
            />
          }
        />
      </View>

      {/* New Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="تأكيد كلمة المرور الجديدة"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={secureNew}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={secureNew ? "eye-off" : "eye"}
              onPress={() => setSecureNew(!secureNew)}
            />
          }
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Submit Button */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleSubmit}
      >
        {loading ? <ActivityIndicator color="#fff" /> : "إرسال"}
      </Button>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
    color: "#616161",
    marginBottom: 8,
    fontFamily: "AvenirArabic-Medium",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  button: {
    width: "100%",
    backgroundColor: "#004d40",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Medium",
  },
});
