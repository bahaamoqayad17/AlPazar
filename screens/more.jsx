import { View, StyleSheet, ScrollView } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import About from "../icons/About";
import Privacy from "../icons/Privacy";
import Terms from "../icons/Terms";
import Contact from "../icons/Contact";
import FAQ from "../icons/FAQ";
import Logout from "../icons/Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Title from "../components/Title";

const MoreScreen = () => {
  const navigation = useNavigation();

  // Logout function
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Title title={"صفحة المزيد"} />
      <ScrollView style={styles.listContainer}>
        <List.Item
          titleStyle={styles.font}
          title="عن التطبيق"
          left={() => <About />}
          onPress={() => navigation.navigate("AboutUs")}
        />

        <List.Item
          titleStyle={styles.font}
          title="سياسة الخصوصية"
          left={() => <Privacy />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
        <List.Item
          titleStyle={styles.font}
          title="الشروط والأحكام"
          left={() => <Terms />}
          onPress={() => navigation.navigate("TermsConditions")}
        />
        <List.Item
          titleStyle={styles.font}
          title="إنشاء إعلان مميز"
          left={() => <Contact />}
          onPress={() => navigation.navigate("Contact")}
        />
        <List.Item
          titleStyle={styles.font}
          title="مركز المساعدة (الأسئلة الشائعة)"
          left={() => <FAQ />}
          onPress={() => navigation.navigate("FAQ")}
        />
        <List.Item
          titleStyle={styles.font}
          title="تسجيل الخروج"
          left={() => <Logout />}
          onPress={handleLogout}
        />
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  listContainer: {
    padding: 24,
  },
  font: {
    fontFamily: "AvenirArabic-Medium",
  },
});

export default MoreScreen;
