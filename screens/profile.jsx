import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "urql";
import UserProfile from "../components/UserProfile";
import ProfileToOthers from "../components/ProfileToOthers";
import { USER_DATA } from "../graphql/queries";
import Title from "../components/Title";
import Camera from "../icons/Camera";
import handleUpload from "../lib/HandleUpload";
import { UPDATE_AVATAR } from "../graphql/mutations";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";

const ProfileScreen = ({ route }) => {
  const { userId } = route.params;

  const [user, setUser] = useState(null);

  const [item, setItem] = useState({});

  // ✅ Fetch user data from GraphQL
  const [result] = useQuery({
    query: USER_DATA,
    variables: { id: userId },
    pause: !userId,
  });
  const [_, updateAvatar] = useMutation(UPDATE_AVATAR);

  const { data, fetching, error } = result;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (data?.user) {
      setItem(data.user);
    }
  }, [data]);

  // 📷 Function to pick an image from the device
  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const avatarUrl = await handleUpload(result.assets[0].uri);

      await updateAvatar({ avatarUrl });
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);
      user.image = avatarUrl;
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
  };

  if (fetching) return <ProfileSkeleton />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <Title title={"الملف الشخصي"} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={90}
            source={{
              uri: data?.user?.image.startsWith("http")
                ? data.user.image
                : `${process.env.EXPO_PUBLIC_API_URL}${data.user.image}`,
            }}
          />

          {user?._id == data?.user?.id && (
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={() => pickImage()}
            >
              {/* <Image src=""/> */}
              <Camera />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.userName}>{data?.user.name}</Text>
        <Text style={styles.userContact}>
          {data?.user?.email}{" "}
          {data?.user?.mobile_number ? `| ${data?.user?.mobile_number}` : ""}
        </Text>
        <Text style={styles.userLocation}>
          {data?.user?.country ? `${data?.user?.country} , ` : ""}
          {data?.user?.city ? data?.user?.city : ""}
        </Text>
      </View>

      {user?._id == data?.user?.id ? (
        <UserProfile posts={data?.userPosts} item={item} setItem={setItem} />
      ) : (
        <ProfileToOthers posts={data?.userPosts} />
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "AvenirArabic-Heavy",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 2,
  },
  userName: {
    fontSize: 22,
    fontFamily: "AvenirArabic-Heavy",
    marginVertical: 5,
  },
  userContact: {
    fontSize: 14,
    color: "#777",
    fontFamily: "AvenirArabic-Medium",
  },
  userLocation: {
    fontSize: 14,
    color: "#05595B",
    fontFamily: "AvenirArabic-Medium",
  },
});
