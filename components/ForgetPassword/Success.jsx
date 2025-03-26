import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import SuccessIcon from "../../icons/Success";

const Success = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <SuccessIcon />

      {/* Success Message */}
      <Text style={styles.title}>تمت بنجاح</Text>
      <Text style={styles.subtitle}>
        لقد أنشأت كلمة سر جديدة، من فضلك لا تشاركها مع أحد
      </Text>

      {/* Finish Button */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate("Login")}
      >
        اذهب لتسجيل الدخول
      </Button>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
    color: "#004d40",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "AvenirArabic-Medium",
  },
  button: {
    width: "100%",
    backgroundColor: "#004d40",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Medium",
  },
});
