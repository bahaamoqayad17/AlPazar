import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IconButton, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Title from "../components/Title";

const FAQ = () => {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  // FAQ Data
  const faqs = [
    {
      question: "كيف أنشر إعلانًا جديدًا؟",
      answer:
        "انتقل إلى الصفحة الرئيسية واضغط على 'نشر إعلان'. ثم قم بتحميل الصور وإدخال التفاصيل مثل العنوان والسعر والوصف. بعد الضغط على 'نشر' سيتم عرض إعلانك فورًا بعد الموافقة.",
    },
    {
      question: "كيف يمكنني تعديل أو حذف إعلاني؟",
      answer:
        "انتقل إلى 'إعلاناتي' في القائمة الجانبية، ثم اضغط على الإعلان الذي ترغب في تعديله أو حذفه. اختر 'تعديل' أو 'حذف'.",
    },
    {
      question: "كيف أتواصل مع البائع أو المشتري؟",
      answer:
        "يمكنك إرسال رسالة مباشرة عبر التطبيق أو كتابة تعليق على الإعلان.",
    },
    {
      question: "كيف تحمي بياناتك؟",
      answer:
        "نحرص على تأمين بياناتك بأعلى مستويات الحماية. يُرجى تجنب مشاركة معلوماتك الشخصية مع الغرباء.",
    },
    {
      question: "هل يمكنني تمييز إعلاني ليظهر في المقدمة؟",
      answer:
        "نعم، يمكنك اختيار خيار مميز ليظهر في أعلى نتائج البحث ويصل لعدد مستخدمين أكثر.",
    },
    {
      question: "كيف أبلغ عن إعلان مخالف؟",
      answer:
        "اضغط على الإعلان ثم اختر 'إبلاغ' وحدد سبب الشكوى. سيتم مراجعة البلاغ واتخاذ الإجراءات المناسبة.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <Title title={"الأسئلة الشائعة"} />

      {/* FAQ Section */}
      <ScrollView style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <List.Accordion
            key={index}
            title={`${index + 1}. ${faq.question}`}
            titleStyle={styles.questionText}
            expanded={expandedIndex === index}
            onPress={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{faq.answer}</Text>
            </View>
          </List.Accordion>
        ))}
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
  faqContainer: {
    padding: 15,
  },
  questionText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
  },
  answerContainer: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  answerText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "AvenirArabic-Medium",
  },
});

export default FAQ;
