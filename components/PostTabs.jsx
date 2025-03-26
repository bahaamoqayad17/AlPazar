import { useEffect, useMemo, useState } from "react";
import CommentSection from "./CommentSection";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "urql";
import { GET_COMMENTS } from "../graphql/queries";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const PostTabs = ({ postId, post, posts }) => {
  const [tab, setTab] = useState("comments");
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);

  const [{ data, fetching }] = useQuery({
    query: GET_COMMENTS,
    variables: { postId },
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getComments) {
      setComments(data?.getComments);
    }
  }, [data]);

  const relatedPosts = useMemo(
    () =>
      posts?.filter(
        (p) => p?.category?.id === post?.category?.id && p.id !== postId // Exclude current post
      ),
    [post]
  );

  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
      <View style={styles.tabsHeader}>
        <TouchableOpacity onPress={() => setTab("comments")}>
          <Text
            style={[styles.tabText, tab === "comments" && styles.activeTab]}
          >
            التعليقات ({data?.getComments?.length || 0})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("ads")}>
          <Text style={[styles.tabText, tab === "ads" && styles.activeTab]}>
            إعلانات ذات علاقة
          </Text>
        </TouchableOpacity>
      </View>

      {tab === "comments" ? (
        <>
          {fetching ? (
            <FlatList
              data={[1, 2, 3, 4, 5]}
              keyExtractor={(item) => item.toString()}
              renderItem={() => <MessageSkeleton />}
            />
          ) : (
            <CommentSection
              postId={postId}
              comments={comments}
              setComments={setComments}
            />
          )}
        </>
      ) : (
        <View style={{ paddingVertical: 20 }}>
          <FlatList
            data={relatedPosts}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.relatedAdItem}
                onPress={() =>
                  navigation.navigate("PostDetails", { postId: item?.id })
                }
              >
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}${item.images[0]}`,
                  }}
                  style={styles.relatedAdImage}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  relatedAdImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  relatedAdItem: {
    marginHorizontal: 10,
  },
  tabsHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    paddingTop: 20,
  },
  tabText: { fontSize: 16, fontFamily: "AvenirArabic-Heavy", color: "#777" },
  activeTab: {
    color: "#05595B",
    borderBottomWidth: 2,
    borderBottomColor: "#05595B",
  },
});

export default PostTabs;
