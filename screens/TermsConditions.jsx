import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Title from "../components/Title";

const TermsConditions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title title={"الشروط والأحكام"} />

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1- التعريفات</Text>
        <Text style={styles.paragraph}>
          📌 <Text style={styles.bold}>التطبيق:</Text> يشير إلى تطبيق عالبازار
          المتاح على الأجهزة الذكية.
        </Text>
        <Text style={styles.paragraph}>
          📌 <Text style={styles.bold}>المستخدم:</Text> أي شخص يقوم بالتسجيل
          واستخدام خدمات التطبيق.
        </Text>
        <Text style={styles.paragraph}>
          📌 <Text style={styles.bold}>الإعلانات:</Text> المحتوى الذي يتم نشره
          بواسطة المستخدمين لعرض منتجاتهم للبيع.
        </Text>
        <Text style={styles.paragraph}>
          📌 <Text style={styles.bold}>البائع:</Text> الشخص الذي يقوم بنشر
          الإعلانات بهدف تشغيل التطبيق وتحقيق الربح.
        </Text>

        <Text style={styles.sectionTitle}>2- استخدام التطبيق</Text>
        <Text style={styles.paragraph}>
          🔹 يجب على المستخدمين نشر إعلاناتهم بشرط أن تكون قانونية ولا تتعارض مع
          حقوق الآخرين.
        </Text>
        <Text style={styles.paragraph}>
          🔹 يمنع نشر أي محتوى غير أخلاقي أو مسيء لأي جهة قانونية أو شخصية.
        </Text>
        <Text style={styles.paragraph}>
          🔹 يجب أن تكون معلومات المستخدم صحيحة ومحدثة لضمان صحة المعاملات.
        </Text>
        <Text style={styles.paragraph}>
          🔹 يحق للإدارة إزالة أي إعلانات تخالف شروط التطبيق دون إشعار مسبق.
        </Text>

        <Text style={styles.sectionTitle}>3- المسؤوليات</Text>
        <Text style={styles.paragraph}>
          🔹 المستخدم مسؤول عن أي إعلان يتم نشره وعن صحة المعلومات الواردة فيه.
        </Text>
        <Text style={styles.paragraph}>
          🔹 التطبيق لا يتحمل أي مسؤولية قانونية تجاه المعاملات التي تتم بين
          المستخدمين.
        </Text>
        <Text style={styles.paragraph}>
          🔹 يجب على المستخدمين توخي الحذر أثناء التعامل مع المشترين، حيث أن
          التطبيق غير مسؤول عن عمليات الاحتيال.
        </Text>

        <Text style={styles.sectionTitle}>4- الدعم والاشتراكات المدفوعة</Text>
        <Text style={styles.paragraph}>
          💳 يتيح التطبيق خيارات دعم الإعلانات والاشتراكات المدفوعة.
        </Text>
        <Text style={styles.paragraph}>
          💳 يتم الدفع عبر وسائل إلكترونية أو عبر البنوك المعتمدة.
        </Text>
        <Text style={styles.paragraph}>
          💳 لا يتم استرداد قيمة الاشتراكات أو الخدمات المدفوعة إلا في الحالات
          الخاصة التي تحددها الإدارة.
        </Text>

        <Text style={styles.sectionTitle}>5- التعديلات على الشروط</Text>
        <Text style={styles.paragraph}>
          🔄 يحق للتطبيق تعديل هذه الشروط في أي وقت لضمان أفضل تجربة للمستخدمين،
          التعديلات تصبح سارية بمجرد نشرها.
        </Text>
        <Text style={styles.paragraph}>🔄 آخر تحديث: 30/3/2025</Text>

        <Text style={styles.finalText}>
          📧 للاستفسارات حول الشروط، تواصل معنا عبر: 3lbazaar@gmail.com
        </Text>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "AvenirArabic-Heavy",
    marginTop: 15,
    color: "#05595B",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  bold: {
    fontFamily: "AvenirArabic-Heavy",
  },
  finalText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    textAlign: "center",
    marginVertical: 20,
    color: "#0056b3",
  },
});

export default TermsConditions;
