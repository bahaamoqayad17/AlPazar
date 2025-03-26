import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import axios from "../lib/axios";
import { useNavigation } from "@react-navigation/native";
import getPushToken from "../lib/getPushToken";

WebBrowser.maybeCompleteAuthSession(); // Ensures browser session completion

const OAuth = () => {
  const navigation = useNavigation();
  /** ✅ Google OAuth Configuration */
  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId:
        "303896902740-7ac974kjgi033j8ueaoe0oj5mapcscgn.apps.googleusercontent.com",
      webClientId:
        "303896902740-7ac974kjgi033j8ueaoe0oj5mapcscgn.apps.googleusercontent.com",
      androidClientId:
        "303896902740-d1a2i1k42c2c77te4thgu2nnm5oopltg.apps.googleusercontent.com",
      iosClientId:
        "303896902740-7euah17pp1mod6g38f2mbaebmk7h3hg0.apps.googleusercontent.com",
    });

  /** ✅ Facebook OAuth Configuration */
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "1151999652745704",
    redirectUri: "https://auth.expo.io/@bahaamoqayad17/alpazar-app",
  });

  useEffect(() => {
    if (googleResponse?.type === "success") {
      handleOAuthLogin("google", googleResponse.authentication.accessToken);
    }
  }, [googleResponse]);

  //

  useEffect(() => {
    if (fbResponse?.type === "success") {
      const accessToken = fbResponse?.authentication?.accessToken;
      WebBrowser.dismissBrowser();
      handleOAuthLogin("facebook", accessToken);
    }
  }, [fbResponse]);

  const handleOAuthLogin = async (provider, access_token) => {
    const expo_token = await getPushToken();

    try {
      const res = await axios.post(`auth/${provider}`, {
        access_token,
        expo_token,
      });
      console.log(res);
      navigation.navigate("Main");
    } catch (error) {
      console.error(`${provider} Login Error:`, error);
    }
  };
  return (
    <View style={styles.socialButtons}>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => fbPromptAsync()}
      >
        <Text style={styles.socialText}>Facebook</Text>
        <Image
          source={require("../assets/facebook.jpg")}
          style={styles.socialIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => googlePromptAsync()}
      >
        <Text style={styles.socialText}>Google</Text>
        <Image
          source={require("../assets/google.jpg")}
          style={styles.socialIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;

const styles = StyleSheet.create({
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#05595B",
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "transparent",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    resizeMode: "contain",
  },
  socialText: {
    fontSize: 16,
    color: "#05595B",
    fontFamily: "AvenirArabic-Heavy",
  },
});
