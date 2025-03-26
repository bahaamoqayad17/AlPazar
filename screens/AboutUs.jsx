import { View, Text, StyleSheet, ScrollView } from "react-native";
import Title from "../components/Title";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <Title nav={"Main"} title={"عن التطبيق"} />

      {/* Scrollable Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          📌<Text style={styles.highlight}> تطبيق عالبازار</Text>
        </Text>
        <Text style={styles.paragraph}>
          مرحباً بك في عالبازار - منصتك المفضلة لبيع وشراء المنتجات بكل سهولة
          وأمانًا! 🚀
        </Text>

        <Text style={styles.paragraph}>
          عالبازار هو خدمتك المتكاملة للإعلانات المبوبة، حيث يمكنك بيع أي منتج
          تريده سواء كان سيارات، أثاث، عقارات، أجهزة إلكترونية أو حتى ملابس قد
          لا تحتاجها. نوفر لك بيئة مناسبة لنشر إعلاناتك والتواصل المباشر مع
          المشترين المهتمين.
        </Text>

        <Text style={styles.subtitle}> لماذا تختار عالبازار؟</Text>

        <Text style={styles.paragraph}>
          - 🛍️ يتميز بسهولة الاستخدام، حيث يمكنك نشر إعلانك في ثوانٍ فقط مع
          إضافة الصور والتفاصيل بكل بساطة.
        </Text>
        <Text style={styles.paragraph}>
          - 🔍 يتيح لك التواصل المباشر مع البائعين والمشترين عبر الرسائل
          الفورية.
        </Text>
        <Text style={styles.paragraph}>
          - 💬 إمكانية سماع رسائل صوتية بين المستخدمين، كما تتوفر تقنية
          التعليقات التي تتيح ميزات إضافية لمزيد من التفاعل.
        </Text>
        <Text style={styles.paragraph}>
          - 🏡 تغطي جميع المدن، مما يسهل عملية البيع والشراء في منطقتك.
        </Text>

        <Text style={styles.subtitle}> كيف يعمل التطبيق؟</Text>

        <Text style={styles.paragraph}>
          - 📸 قم بإضافة إعلان جديد بسهولة عن طريق التقاط صور وإدخال تفاصيل
          الإعلان.
        </Text>
        <Text style={styles.paragraph}>
          - 📩 تواصل مع المشترين من خلال الرسائل، واتمام الصفقة بكل سهولة.
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "AvenirArabic-Heavy",
    textAlign: "center",
    flex: 1,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: "AvenirArabic-Heavy",
  },
  highlight: {
    color: "#05595B",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "AvenirArabic-Heavy",
    marginTop: 15,
  },
  finalText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    textAlign: "center",
    marginTop: 20,
    color: "#FF5733",
  },
});

export default AboutUs;
