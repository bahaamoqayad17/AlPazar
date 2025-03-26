import { View, FlatList, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "urql";
import { GET_USER_FAV } from "../graphql/queries";
import Post from "../components/Post";
import Title from "../components/Title";

const Favorite = () => {
  const [{ data, fetching, error }] = useQuery({ query: GET_USER_FAV });

  if (fetching) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (error) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>
        {console.log(error)}
        حدث خطأ أثناء تحميل المنشورات المفضلة
      </Text>
    );
  }

  const favoritePosts = data?.getUserFav || [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10,
        marginBottom: 70,
      }}
    >
      <Title title={"المفضلة"} />

      {favoritePosts.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          لا توجد منشورات مفضلة
        </Text>
      ) : (
        <FlatList
          data={favoritePosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Favorite;
