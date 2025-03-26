import { useMemo, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  Button,
  Searchbar,
  ActivityIndicator,
  Text,
  Icon,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "../components/Post";
import { useQuery } from "urql";
import AutoCarousel from "../components/Carousel";
import { SvgXml } from "react-native-svg";
import Search from "../icons/Search";
import { GET_CATEGORIES, GET_POSTS } from "../graphql/queries";

const HomeGuest = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(null);

  const [result] = useQuery({ query: GET_POSTS });
  const [dataCategory] = useQuery({ query: GET_CATEGORIES });

  const { data, fetching } = result || {};
  const { data: categories } = dataCategory || {};

  // 🔹 Apply Filtering Logic with useMemo for Performance Optimization
  const filteredPosts = useMemo(() => {
    return (data?.posts?.data || []).filter((post) => {
      const matchesCategory = category ? post.category.id == category.id : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) // 🔹 Only filters by title
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [data, searchQuery, category]);

  if (fetching) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                marginVertical: 20,
                gap: 4,
              }}
            >
              <Text style={{ maxWidth: 220, fontFamily: "AvenirArabic-Heavy" }}>
                مرحبا بك ..يرجى تسجل دخولك للاستفادة من جميع الميزات
              </Text>

              <Button
                onPress={() => navigation.navigate("Login")}
                mode="outlined"
                style={{
                  borderRadius: 4,
                  borderColor: "#05595B",
                }}
              >
                <Text
                  style={{
                    fontFamily: "AvenirArabic-Heavy",
                    color: "#05595B",
                  }}
                >
                  تسجيل الدخول
                </Text>
              </Button>
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
                inputStyle={styles.input}
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
                      <Text style={{ color: "#05595B" }}>{item?.name}</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Featured Product */}
            <AutoCarousel />

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

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("More")}
      >
        <Text style={styles.buttonText}>اعرف المزيد</Text>
        <Icon source="arrow-left" size={20} color="#05595B" />
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeGuest;

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
  },
  inputStyle: {
    textAlign: "right",
    fontSize: 14,
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#05595B",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    width: 130,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  buttonText: {
    color: "#05595B",
    fontSize: 16,
    fontFamily: "AvenirArabic-Heavy",
    marginRight: 6,
  },
});
