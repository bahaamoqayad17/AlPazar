import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { Avatar, Text } from "react-native-paper";
import SendComment from "../icons/sendComment";
import { useMutation } from "urql";
import { CREATE_COMMENT } from "../graphql/mutations";
import getTime from "../lib/getTime";
import { useNavigation } from "@react-navigation/native";

const CommentSection = ({ postId, comments }) => {
  const [content, setContent] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigation = useNavigation();
  const [, createComment] = useMutation(CREATE_COMMENT);

  const handleSendComment = async () => {
    if (!content.trim()) return;

    const { data } = await createComment({
      postId,
      content,
    });
    if (data?.createComment) {
      setContent("");
    }
  };

  return (
    <View>
      {comments.length === 0 && (
        <Text style={styles.noComments}>لا توجد تعليقات حتى الآن</Text>
      )}

      {comments
        ?.slice(0, showAll ? comments.length : 5) // Show first 5 comments initially
        .map((comment) => (
          <View
            key={comment.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <View style={styles.comment}>
              <Pressable
                onPress={() =>
                  navigation.navigate("Profile", { userId: comment.user.id })
                }
              >
                <Avatar.Image
                  size={35}
                  source={{
                    uri: comment?.user?.image?.startsWith("http")
                      ? comment?.user?.image
                      : `${process.env.EXPO_PUBLIC_API_URL}${comment?.user?.image}`,
                  }}
                />
              </Pressable>
              <View style={styles.commentText}>
                <Text style={styles.commentUser}>{comment.user.name}</Text>
                <Text style={{ fontFamily: "AvenirArabic-Medium" }}>
                  {comment.content}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: "AvenirArabic-Medium" }}>
              {getTime(comment.createdAt)}
            </Text>
          </View>
        ))}

      {/* Show "Show more" button only if there are more than 5 comments */}
      {comments.length > 5 && !showAll && (
        <TouchableOpacity onPress={() => setShowAll(true)}>
          <Text style={styles.showMore}>عرض المزيد من التعليقات</Text>
        </TouchableOpacity>
      )}

      {/* Add Comment Input */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="اكتب تعليق"
          placeholderTextColor="#A0A0A0"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
          <SendComment />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#05595B",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: "white",
    marginTop: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  commentInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
    fontFamily: "AvenirArabic-Medium",
  },
  sendButton: {
    marginLeft: 5,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  commentText: {
    marginLeft: 10,
  },
  commentUser: {
    fontFamily: "AvenirArabic-Heavy",
    color: "#05595B",
  },
  noComments: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginTop: 10,
    fontFamily: "AvenirArabic-Medium",
  },
  showMore: {
    color: "#05595B",
    fontFamily: "AvenirArabic-Heavy",
    textAlign: "center",
    marginTop: 10,
  },
});

export default CommentSection;
