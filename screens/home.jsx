import { useEffect, useMemo, useState } from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Avatar, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "../components/Post";
import { useQuery } from "urql";
import AutoCarousel from "../components/Carousel";
import { SvgXml } from "react-native-svg";
import Notifications from "../icons/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../icons/Search";
import { GET_CATEGORIES, GET_POSTS } from "../graphql/queries";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import CarouselSkeleton from "../components/skeletons/CarouselSkeleton";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(null);
  const [result] = useQuery({ query: GET_POSTS });
  const [dataCategory] = useQuery({ query: GET_CATEGORIES });

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

  const { data, fetching } = result || {};
  const { data: categories } = dataCategory || {};

  const filteredPosts = useMemo(() => {
    return (data?.posts?.data || []).filter((post) => {
      const matchesCategory = category ? post.category.id == category.id : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const isActive = post.status === "active"; // ✅ Check if the post is active

      return matchesCategory && matchesSearch && isActive;
    });
  }, [data, searchQuery, category]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <FlatList
        data={fetching ? [1, 2, 3] : filteredPosts}
        keyExtractor={(item) => (fetching ? item.toString() : item.id)}
        renderItem={({ item }) =>
          fetching ? <PostSkeleton /> : <Post item={item} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notifications")}
                >
                  <Notifications />
                </TouchableOpacity>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Profile", { userId: user?._id })
                  }
                  style={{
                    borderWidth: 2,
                    borderColor: "#05595B",
                    borderRadius: 50,
                  }}
                >
                  <Avatar.Image
                    size={45}
                    source={{
                      uri: user?.image?.startsWith("http")
                        ? user?.image
                        : `${process.env.EXPO_PUBLIC_API_URL}${user?.image}`,
                    }}
                  />
                </Pressable>
              </View>
            </View>

            {/* Search Bar */}
            <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
              <Searchbar
                placeholder="ابحث عن منتج او فئة"
                placeholderTextColor="#A0A0A0"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchBar}
                icon={() => <Search />}
                iconColor="#05595B"
                inputStyle={{ fontFamily: "AvenirArabic-Medium" }}
              />
            </View>

            {/* Category Filters */}
            <TouchableOpacity onPress={() => setCategory(null)}>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 14,
                  color: "#05595B",
                  fontFamily: "AvenirArabic-Heavy",
                }}
              >
                عرض الجميع
              </Text>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {categories?.categories.map((item) => {
                const isSelected = category?.id === item?.id;

                return (
                  <TouchableOpacity
                    key={item?.id}
                    onPress={() => setCategory(item)}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isSelected ? 1 : 0.4,
                    }}
                  >
                    <View style={styles.category}>
                      {item?.icon && <SvgXml xml={item?.icon} />}
                    </View>

                    {typeof item?.name === "string" ? (
                      <Text
                        style={{
                          color: "#05595B",
                          fontFamily: "AvenirArabic-Medium",
                        }}
                      >
                        {item?.name}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            {fetching ? (
              <CarouselSkeleton />
            ) : (
              <AutoCarousel sliders={data?.sliders} />
            )}

            {category && (
              <>
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#05595B",
                      fontFamily: "AvenirArabic-Heavy",
                    }}
                  >
                    إعلانات فئة {category.name}
                  </Text>
                </View>
              </>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: "#EAF1F1",
    borderRadius: 25,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#05595B",
    fontFamily: "AvenirArabic-Medium",
  },
  category: {
    backgroundColor: "#fff",
    width: 48,
    height: 48,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#05595B",
  },
});
