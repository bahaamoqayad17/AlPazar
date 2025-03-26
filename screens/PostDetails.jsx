import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Share,
} from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useMutation, useQuery } from "urql";
import MessagesIcon from "../icons/messages";
import ImageCarousel from "../components/ImageCarousel";
import { GET_POST, GET_USER_FAV } from "../graphql/queries";
import Location from "../icons/location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Time from "../icons/Time";
import getTime from "../lib/getTime";
import { Ionicons } from "@expo/vector-icons";
import FavoriteOutline from "../icons/Favorite-outline";
import PostTabs from "../components/PostTabs";
import { useNavigation } from "@react-navigation/native";
import { REMOVE_FAVORATIE, SET_FAVORATIE } from "../graphql/mutations";
import Favorite from "../icons/Favorite";
import ShareIcon from "../icons/Share";
import PostDetailsSkeleton from "../components/skeletons/PostDetailsSkeleton";

const PostDetails = ({ route }) => {
  const { postId } = route.params;
  const [user, setUser] = useState(null);
  const [marked, setMarked] = useState(false);
  const navigation = useNavigation();

  const [favResult, reexecuteQuery] = useQuery({ query: GET_USER_FAV });
  const [result] = useQuery({
    query: GET_POST,
    variables: { id: postId },
  });

  const { data, fetching, error } = result;
  const { data: favData } = favResult;

  const [_, setFav] = useMutation(SET_FAVORATIE);
  const [__, removeFav] = useMutation(REMOVE_FAVORATIE);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (favData?.getUserFav?.length > 0) {
      const favoritePostIds = new Set(
        favData?.getUserFav?.map((fav) => fav.id)
      );
      setMarked(favoritePostIds.has(postId));
    }
  }, [favData?.getUserFav, postId]);

  const handleFav = async () => {
    try {
      const input = {
        user: user?._id,
        post: postId,
      };

      if (!marked) {
        await setFav({ input });
        setMarked(true);
        reexecuteQuery();
        return;
      }

      await removeFav({ input });
      setMarked(false);
      reexecuteQuery();
    } catch (error) {
      console.log("Error handling favorite:", error);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `🌟✨ اكتشف هذا المنشور الرائع على تطبيق ALPAZAR! ✨🌟

📌 العنوان: ${data?.post.title}

📝 الوصف: ${data?.post.content}

📲 لا تفوت الفرصة وشارك هذا المحتوى المميز مع أصدقائك! 🔥`,
      });
      // 🔗 شاهد التفاصيل الكاملة هنا: ${process.env.EXPO_PUBLIC_API_URL}/post/${data?.post.id}

      if (result.action === Share.sharedAction) {
        Alert.alert("✅ نجاح", "تمت مشاركة المنشور بنجاح!");
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("❌ إلغاء", "تم إلغاء عملية المشاركة.");
      }
    } catch (error) {
      Alert.alert("⚠️ خطأ", error.message);
    }
  };

  if (fetching) {
    return <PostDetailsSkeleton />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching post data!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={14} color="white" />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            left: 20,
            top: 20,
            zIndex: 200,
          }}
        >
          <Pressable style={styles.heart} onPress={() => handleFav()}>
            {marked ? <Favorite /> : <FavoriteOutline />}
          </Pressable>
          <Pressable
            style={[styles.heart, { marginLeft: 12 }]}
            onPress={() => handleShare()}
          >
            <ShareIcon />
          </Pressable>
        </View>
      </View>

      <ImageCarousel images={data?.post.images} />
      {/* ✅ Post Details */}
      <View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Time />{" "}
              <Text
                style={{ marginLeft: 4, fontFamily: "AvenirArabic-Medium" }}
              >
                {getTime(data?.post?.createdAt)}
              </Text>
            </View>
            <Text style={styles.price}>{data?.post.price}</Text>
          </View>
          <Text style={styles.title}>{data?.post.title}</Text>
          <Text style={styles.description}>{data?.post.content}</Text>

          {/* ✅ User Info */}
          <View style={styles.userInfo}>
            <Pressable
              onPress={() =>
                navigation.navigate("Profile", { userId: data?.post?.user?.id })
              }
            >
              <View style={styles.userInfo}>
                <Avatar.Image
                  size={40}
                  source={{
                    uri: data?.post?.user?.image?.startsWith("http")
                      ? data.post.user.image
                      : `${process.env.EXPO_PUBLIC_API_URL}${data.post.user.image}`,
                  }}
                />

                <View style={styles.userText}>
                  <Text style={styles.userName}>{data?.post.user.name}</Text>
                  <Text style={styles.location}>
                    <Location /> {data?.post.country}، {data?.post.city}
                  </Text>
                </View>
              </View>
            </Pressable>

            {user?._id !== data?.post?.user.id && (
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  user?._id
                    ? navigation.navigate("Chat", {
                        receiver: data?.post?.user,
                        userId: user?._id,
                      })
                    : alert("عليك تسجيل الدخول")
                }
              >
                <View style={styles.content}>
                  <Text style={styles.text}>مراسلة</Text>
                  <MessagesIcon color={"#fff"} />
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* ✅ Contact Button */}
        </View>
      </View>

      {/* ✅ Tabs for Comments & Related Ads */}
      <PostTabs postId={postId} post={data?.post} posts={data?.posts?.data} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontFamily: "AvenirArabic-Medium",
  },
  heart: {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: "#555",
    fontFamily: "AvenirArabic-Medium",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userText: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
  },
  button: {
    backgroundColor: "#05595B",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 48,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    marginRight: 6,
  },
});

export default PostDetails;
