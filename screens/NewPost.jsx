import { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { Text, IconButton, Menu } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery } from "urql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_CATEGORIES, GET_POSTS } from "../graphql/queries";
import { CREATE_POST } from "../graphql/mutations";
import { Ionicons } from "@expo/vector-icons";
import Contact from "../icons/Contact";
import Price from "../icons/Price";
import PickImage from "../icons/PickImage";
import { useNavigation } from "@react-navigation/native";
import handleUpload from "../lib/HandleUpload";
const NewPostScreen = () => {
  const [images, setImages] = useState([]); // Store selected images
  const [item, setItem] = useState({});
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const navigation = useNavigation();

  const [result] = useQuery({ query: GET_CATEGORIES });

  const { data, fetching, error } = result;

  const [_, createPost] = useMutation(CREATE_POST);

  // Function to pick images
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Enable multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const handleSubmit = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user._id) {
        alert("User not found!");
        return;
      }

      // Upload images via REST API
      const uploadedImageURLs = await Promise.all(
        images.map((img) => handleUpload(img))
      );

      if (uploadedImageURLs.includes(null)) {
        alert("Some uploads failed");
        return;
      }

      // Send post data via GraphQL mutation
      const { data, error } = await createPost({
        input: { ...item, images: uploadedImageURLs, user: user._id },
      });

      if (data?.createPost) {
        setTimeout(() => {
          navigation.navigate("Main");
        }, 2000);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("An error occurred while submitting");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <View style={styles.premiumContainer}>
            <Text style={styles.premiumText}>
              اجعل إعلانك مميز ويظهر في أول الإعلانات
            </Text>
            <Pressable
              style={styles.premiumButton}
              onPress={() => navigation.navigate("Contact")}
            >
              {/* Left Arrow Icon */}
              <Text style={styles.buttonText}>نشر اعلان مميز</Text>

              <Ionicons name="arrow-back" size={24} color="#05595B" />

              {/* Button Text */}
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Premium Ad Section */}

        {/* Title Input */}
        <TextInput
          placeholder="اكتب عنوان مختصر ومناسب لإعلانك"
          value={item?.title}
          onChangeText={(title) => setItem({ ...item, title })}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.imageUpload}
          onPress={() => pickImages()}
        >
          <Text
            style={{
              marginRight: 8,
              fontFamily: "AvenirArabic-Heavy",
              color: "#616161",
            }}
          >
            أرفق صور للمنتج
          </Text>
          <PickImage />
        </TouchableOpacity>

        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item }} style={styles.image} />
              <IconButton
                icon="close-circle"
                size={20}
                color="red"
                style={styles.removeIcon}
                onPress={() =>
                  setImages(images.filter((image) => image !== item))
                }
              />
            </View>
          )}
          style={styles.imageList}
        />

        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setCategoryMenuVisible(true)}>
              <TextInput
                placeholder="الفئة"
                value={
                  data?.categories.find((cat) => cat.id === item.category)
                    ?.name || "اختر فئة"
                }
                style={styles.input}
                editable={false}
              />
            </TouchableOpacity>
          }
        >
          {data?.categories.map((cat) => (
            <Menu.Item
              key={cat.id}
              title={cat.name}
              onPress={() => {
                setItem({ ...item, category: cat.id }); // Store the category ID
                setCategoryMenuVisible(false);
              }}
            />
          ))}
        </Menu>

        <TextInput
          placeholder="الدولة"
          value={item?.country}
          onChangeText={(country) => setItem({ ...item, country })}
          style={styles.input}
          keyboardType="default"
        />

        <TextInput
          placeholder="المدينة"
          value={item?.city}
          onChangeText={(city) => setItem({ ...item, city })}
          style={[styles.input]}
          keyboardType="default"
        />

        <View style={styles.row}>
          {/* ✅ Price Input Field */}
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <View style={{ flexDirection: "row" }}>
                <Price />
                <Text style={styles.label}>السعر بالعملة</Text>
              </View>
              <Text style={styles.optional}>اختياري</Text>
            </View>
            <TextInput
              placeholder=""
              value={item?.price || ""}
              onChangeText={(price) => setItem((prev) => ({ ...prev, price }))}
              style={[styles.input, { borderColor: "#D5D3D3" }]}
              textAlign="right"
            />
          </View>

          {/* ✅ Phone Input Field */}
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <View style={{ flexDirection: "row" }}>
                <Contact />
                <Text style={styles.label}>رقم الهاتف</Text>
              </View>
              <Text style={styles.optional}>اختياري</Text>
            </View>
            <TextInput
              placeholder=""
              value={item?.mobile_number || ""}
              onChangeText={(mobile_number) =>
                setItem((prev) => ({ ...prev, mobile_number }))
              }
              style={[styles.input, { borderColor: "#D5D3D3" }]}
              keyboardType="phone-pad"
              textAlign="right"
            />
          </View>
        </View>

        <TextInput
          placeholder="اكتب وصف للمنتج"
          value={item?.content}
          onChangeText={(content) => setItem({ ...item, content })}
          style={styles.textarea}
          multiline
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#05595B",
            flexDirection: "row",
            padding: 14,
            borderRadius: 8,
            marginVertical: 10,
            justifyContent: "center",
          }}
          onPress={() => handleSubmit()}
        >
          {/* Left Arrow Icon */}
          <Text
            style={{
              color: "#fff",
              fontFamily: "AvenirArabic-Heavy",
              marginRight: 8,
              fontSize: 16,
            }}
          >
            {" "}
            نشر الإعلان
          </Text>

          <Ionicons name="arrow-back" size={24} color="#fff" />

          {/* Button Text */}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05595B" },
  header: { padding: 16 },
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

  inputContainer: {
    width: "45%", // Half of the screen width with space in between
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  icon: {
    marginLeft: 5, // Space between icon and text
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  optional: {
    fontSize: 12,
    color: "#888",
    marginRight: 5,
    fontFamily: "AvenirArabic-Medium",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  removeIcon: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "white",
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  premiumContainer: {
    padding: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFD700",
    marginVertical: 16,
    marginTop: 80,
    // shadowColor: "#E2D784",
    // shadowOffset: { width: 0, height: 4 }, // X: 0, Y: 4
    // shadowOpacity: 0.7, // 70%
    // shadowRadius: 10, // Blur: 10
    // elevation: 5, // For Android
  },
  premiumText: {
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
    fontFamily: "AvenirArabic-Medium",
  },
  input: {
    backgroundColor: "transparent", // No background
    borderRadius: 30, // Fully rounded
    borderColor: "#05595B", // Matching the provided design
    borderWidth: 1.5, // Ensure visibility
    height: 45, // Proper height for UI consistency
    paddingHorizontal: 15,
    fontSize: 14,
    textAlign: "right", // Aligns Arabic text correctly
    marginBottom: 16,
    fontFamily: "AvenirArabic-Medium",
  },
  imageUpload: {
    height: 170,
    borderWidth: 3,
    borderColor: "#05595B",
    borderRadius: 10,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  smallInput: { width: "48%", fontFamily: "AvenirArabic-Medium" },
  textarea: {
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#B2AFAF40",
    borderRadius: 8,
    paddingTop: 10,
    paddingLeft: 10,
    textAlign: "right",
    fontFamily: "AvenirArabic-Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  publishButton: { flex: 1, marginRight: 5 },
  premiumPublishButton: { flex: 1 },

  premiumButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2D784", // Yellow background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Slight rounded corners
  },
  icon: {
    marginLeft: 8, // Space between icon and text
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B", // Dark green text
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "AvenirArabic-Heavy",
    color: "#333",
    marginLeft: 4,
  },
});

export default NewPostScreen;
