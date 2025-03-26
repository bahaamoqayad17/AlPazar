import { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Favorite from "../icons/Favorite";
import FavoriteOutline from "../icons/Favorite-outline";
import getTime from "../lib/getTime";
import { useMutation, useQuery } from "urql";
import { REMOVE_FAVORATIE, SET_FAVORATIE } from "../graphql/mutations";
import { GET_USER_FAV } from "../graphql/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Post = ({ item }) => {
  const navigation = useNavigation();
  const [marked, setMarked] = useState(false);

  const [{ data }, reexecuteQuery] = useQuery({ query: GET_USER_FAV });

  const favoritePosts = data?.getUserFav || [];

  const [_, setFav] = useMutation(SET_FAVORATIE);
  const [__, removeFav] = useMutation(REMOVE_FAVORATIE);

  useEffect(() => {
    if (favoritePosts?.length > 0) {
      const favoritePostIds = new Set(favoritePosts.map((fav) => fav.id));
      setMarked(favoritePostIds.has(item.id));
    }
  }, [favoritePosts, item.id]);

  const handleFav = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const user = JSON.parse(storedUser);

      const input = {
        user: user?._id,
        post: item?.id,
      };

      if (!marked) {
        const result = await setFav({ input });

        console.log(result.data.setFavorites);

        if (result.data?.setFavorites) {
          setMarked(true);
        }

        return;
      }

      const result = await removeFav({ input });

      if (result.data?.removeFavorites) {
        setMarked(false);
      }
    } catch (error) {
      console.log("Error handling favorite:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostDetails", { postId: item?.id })}
    >
      <Card
        style={[
          styles.card,
          { backgroundColor: item?.paid ? "#E2D784" : "#F5F5F5" },
        ]}
      >
        <View style={styles.container}>
          <Pressable style={styles.icon} onPress={() => handleFav()}>
            {marked ? <Favorite /> : <FavoriteOutline />}
          </Pressable>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={2}>
                {item?.title}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.location}>{item?.country}</Text>
              <Text style={styles.price}>{item?.price}</Text>
            </View>

            <View style={styles.userInfo}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar.Image
                  size={30}
                  source={{
                    uri: item?.user?.image?.startsWith("http")
                      ? item?.user?.image
                      : `${process.env.EXPO_PUBLIC_API_URL}${item?.user?.image}`,
                  }}
                />

                <Text style={styles.userName}>{item?.user?.name}</Text>
              </View>
              <Text style={styles.time}>{getTime(item?.createdAt)}</Text>
            </View>
          </View>

          <Image
            source={{
              uri: item?.images?.[0]
                ? `${process.env.EXPO_PUBLIC_API_URL}${item.images[0]}`
                : "https://via.placeholder.com/150",
            }}
            style={styles.image}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: "#F5F5F5",
    marginBottom: 15,
    height: 130,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "50%",
    height: 130,
    borderBottomLeftRadius: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    padding: 5,
    width: "50%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: "#05595B",
    fontFamily: "AvenirArabic-Heavy",
  },
  price: {
    fontSize: 16,
    color: "#05595B",
    marginRight: 5,
    fontFamily: "AvenirArabic-Heavy",
  },
  location: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
    fontFamily: "AvenirArabic-Medium",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    maxWidth: 150,
  },
  userName: {
    fontSize: 12,
    color: "#05595B",
    marginLeft: 5,
    fontFamily: "AvenirArabic-Heavy",
  },
  time: {
    fontSize: 10,
    color: "#888",
    fontFamily: "AvenirArabic-Medium",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 100,
    width: 25,
    height: 25,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
