import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EnterEmail from "../components/ForgetPassword/EnterEmail";
import SendCode from "../components/ForgetPassword/SendCode";
import ChangePassword from "../components/ForgetPassword/ChangePassword";
import Success from "../components/ForgetPassword/Success";

const ForgotPassword = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigation.navigate("Login");
  };

  const resendCode = () => {
    console.log("OTP Resent to:", email);
  };

  const steps = [
    <EnterEmail onNext={nextStep} setEmail={setEmail} email={email} />,
    <SendCode email={email} onNext={nextStep} onResend={resendCode} />,
    <ChangePassword onNext={nextStep} email={email} />,
    <Success onNext={nextStep} navigation={navigation} />,
  ];

  return (
    <View style={styles.container}>
      {step !== 4 && ( // Hide back button on the Success step
        <TouchableOpacity onPress={prevStep} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      {steps[step - 1]}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 50,
    borderColor: "#605D5D",
    borderWidth: 1,
  },
});
