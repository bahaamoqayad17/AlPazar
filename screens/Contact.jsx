import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Text } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Checked from "../icons/Checked";
import { useNavigation } from "@react-navigation/native";

const Contact = () => {
  const navigation = useNavigation();
  // ✅ Open WhatsApp with a predefined message
  const openWhatsApp = () => {
    const message = encodeURIComponent("مرحبًا، أريد إنشاء إعلان مميز!");
    const url = `whatsapp://send?phone=${+972598623000}&text=${message}`;

    Linking.openURL(url).catch(() => {
      alert("لا يمكن فتح واتساب. تأكد من تثبيت التطبيق.");
    });
  };

  return (
    <View style={styles.container}>
      {/* ✅ Green Header Box */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* ✅ Main Content (White Box) */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>اجعل اعلانك مميز يظهر في بداية الصفحة</Text>

        {/* Feature List */}
        <View style={styles.featureList}>
          {[
            "اجعل إعلانك يظهر في المقدمة وزد عدد المشاهدات!",
            "إعلانك سيظهر في أعلى الصفحة الرئيسية لفترة محددة.",
            "إعلانك سيظهر في أعلى الصفحة الرئيسية لفترة محددة.",
            "يحصل على شارة 'إعلان مميز' ليجذب انتباه المشترين.",
            "يتم الترويج له بشكل أوسع ليصل إلى المزيد من المستخدمين.",
          ].map((item, index) => (
            <View key={index} style={styles.featureItem}>
              <Checked />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Contact Text */}
        <Text style={styles.contactText}>تواصل معنا من أجل المزيد</Text>

        {/* Call to Action Button (Opens WhatsApp) */}
        <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
          {/* Button Text */}
          <Text style={styles.buttonText}>انشأ اعلان مميز</Text>

          {/* Left Circular Icon */}
          <View style={styles.iconContainer}>
            <FontAwesome name="phone" size={20} color="#05595B" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05595B", // Green Background
  },
  header: {
    height: 120, // Enough space for the curved effect
    backgroundColor: "#05595B",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
    marginBottom: 20,
  },
  featureList: {
    width: "100%",
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#605D5D",
    fontFamily: "AvenirArabic-Medium",
  },
  contactText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
    marginVertical: 15,
    marginHorizontal: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#05595B",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
  },
});

export default Contact;
